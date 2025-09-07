"""
FastAPI application for Tourist Safety AI/ML Service
Provides REST API endpoints for anomaly detection, incident classification, and speech processing
"""

from fastapi import FastAPI, HTTPException, UploadFile, File, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uvicorn
import logging
from datetime import datetime
import asyncio
import os
import torch

# Import our models and utilities
from models.anomaly_detection import GPSAnomalyDetector, LocationPoint, AnomalyResult
from models.incident_classification import IncidentClassifier, IncidentReport, ClassificationResult
from models.speech_processing import SpeechProcessor, TranscriptionResult
from config.settings import settings


# Configure logging
logging.basicConfig(level=getattr(logging, settings.log_level))
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="AI/ML service for real-time tourist safety monitoring and incident response",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model instances (initialized on startup)
anomaly_detector: Optional[GPSAnomalyDetector] = None
incident_classifier: Optional[IncidentClassifier] = None
speech_processor: Optional[SpeechProcessor] = None


# Pydantic models for API requests/responses
class LocationPointRequest(BaseModel):
    lat: float = Field(..., ge=-90, le=90, description="Latitude")
    lng: float = Field(..., ge=-180, le=180, description="Longitude")
    timestamp: datetime = Field(..., description="Timestamp in ISO format")
    tourist_id: str = Field(..., description="Unique tourist identifier")


class AnomalyDetectionRequest(BaseModel):
    locations: List[LocationPointRequest] = Field(..., min_items=10, description="GPS location sequence")
    threshold: Optional[float] = Field(0.7, ge=0.0, le=1.0, description="Anomaly detection threshold")


class AnomalyDetectionResponse(BaseModel):
    is_anomaly: bool
    confidence: float
    anomaly_type: str
    details: Dict[str, Any]
    processing_time_ms: float


class IncidentReportRequest(BaseModel):
    tourist_id: str = Field(..., description="Unique tourist identifier")
    description: str = Field(..., min_length=5, description="Incident description")
    timestamp: Optional[datetime] = Field(None, description="Timestamp (defaults to now)")
    language: Optional[str] = Field("en", description="Language code (en, es, fr, de)")
    location: Optional[List[float]] = Field(None, description="[lat, lng] coordinates")


class ClassificationResponse(BaseModel):
    category: str
    confidence: float
    severity_score: float
    multilingual_detected: bool
    processing_details: Dict[str, Any]
    processing_time_ms: float


class SpeechTranscriptionResponse(BaseModel):
    text: str
    language: str
    confidence: float
    processing_time: float
    audio_duration: float
    method: str


class HealthResponse(BaseModel):
    status: str
    timestamp: datetime
    models_loaded: Dict[str, bool]
    version: str


# Dependency to get model instances
async def get_models():
    """Dependency to ensure models are loaded"""
    if not all([anomaly_detector, incident_classifier, speech_processor]):
        raise HTTPException(status_code=503, detail="Models not initialized")
    return {
        "anomaly_detector": anomaly_detector,
        "incident_classifier": incident_classifier,
        "speech_processor": speech_processor
    }


@app.on_event("startup")
async def startup_event():
    """Initialize models on startup"""
    global anomaly_detector, incident_classifier, speech_processor
    
    logger.info("Starting Tourist Safety AI/ML Service...")
    
    try:
        # Initialize Anomaly Detector
        logger.info("Loading anomaly detection model...")
        anomaly_detector = GPSAnomalyDetector(
            model_path=settings.anomaly_model_path if os.path.exists(settings.anomaly_model_path) else None,
            device='cuda' if torch.cuda.is_available() else 'cpu'
        )
        
        # Initialize Incident Classifier
        logger.info("Loading incident classification model...")
        incident_classifier = IncidentClassifier(
            model_name=settings.classification_model_name,
            device='cuda' if torch.cuda.is_available() else 'cpu'
        )
        
        # Initialize Speech Processor
        logger.info("Loading speech processing model...")
        speech_processor = SpeechProcessor(
            whisper_model_size=settings.whisper_model_size
        )
        
        logger.info("All models loaded successfully!")
        
    except Exception as e:
        logger.error(f"Failed to initialize models: {e}")
        raise


@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("Shutting down Tourist Safety AI/ML Service...")


# Health check endpoint
@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Service health check"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now(),
        models_loaded={
            "anomaly_detector": anomaly_detector is not None,
            "incident_classifier": incident_classifier is not None,
            "speech_processor": speech_processor is not None
        },
        version=settings.app_version
    )


# Anomaly Detection Endpoints
@app.post("/predict/anomaly", response_model=AnomalyDetectionResponse)
async def detect_anomaly(
    request: AnomalyDetectionRequest,
    models: Dict = Depends(get_models)
):
    """Detect anomalies in GPS location sequence"""
    import time
    start_time = time.time()
    
    try:
        # Convert request to LocationPoint objects
        locations = [
            LocationPoint(
                lat=loc.lat,
                lng=loc.lng,
                timestamp=loc.timestamp,
                tourist_id=loc.tourist_id
            )
            for loc in request.locations
        ]
        
        # Perform anomaly detection
        result = models["anomaly_detector"].detect_anomaly(
            locations=locations,
            threshold=request.threshold
        )
        
        processing_time = (time.time() - start_time) * 1000  # milliseconds
        
        return AnomalyDetectionResponse(
            is_anomaly=result.is_anomaly,
            confidence=result.confidence,
            anomaly_type=result.anomaly_type,
            details=result.details,
            processing_time_ms=processing_time
        )
        
    except Exception as e:
        logger.error(f"Anomaly detection error: {e}")
        raise HTTPException(status_code=500, detail=f"Anomaly detection failed: {str(e)}")


# Incident Classification Endpoints
@app.post("/predict/incident", response_model=ClassificationResponse)
async def classify_incident(
    request: IncidentReportRequest,
    models: Dict = Depends(get_models)
):
    """Classify incident report"""
    import time
    start_time = time.time()
    
    try:
        # Create IncidentReport object
        report = IncidentReport(
            tourist_id=request.tourist_id,
            description=request.description,
            timestamp=request.timestamp or datetime.now(),
            language=request.language or "en",
            location=tuple(request.location) if request.location else None
        )
        
        # Perform classification
        result = models["incident_classifier"].classify_incident(report)
        
        processing_time = (time.time() - start_time) * 1000  # milliseconds
        
        return ClassificationResponse(
            category=result.category,
            confidence=result.confidence,
            severity_score=result.severity_score,
            multilingual_detected=result.multilingual_detected,
            processing_details=result.processing_details,
            processing_time_ms=processing_time
        )
        
    except Exception as e:
        logger.error(f"Incident classification error: {e}")
        raise HTTPException(status_code=500, detail=f"Incident classification failed: {str(e)}")


# Speech Processing Endpoints
@app.post("/speech/transcribe", response_model=SpeechTranscriptionResponse)
async def transcribe_speech(
    audio_file: UploadFile = File(..., description="Audio file (wav, mp3, m4a, ogg)"),
    language: Optional[str] = None,
    models: Dict = Depends(get_models)
):
    """Transcribe speech to text"""
    try:
        # Validate file format
        file_extension = audio_file.filename.split('.')[-1].lower()
        if file_extension not in settings.supported_audio_formats:
            raise HTTPException(
                status_code=400, 
                detail=f"Unsupported audio format. Supported: {settings.supported_audio_formats}"
            )
        
        # Read audio data
        audio_data = await audio_file.read()
        
        # Validate audio
        validation_result = models["speech_processor"].validate_audio(audio_data, file_extension)
        if not validation_result["is_valid"]:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid audio: {validation_result.get('issues', ['Unknown error'])}"
            )
        
        # Transcribe
        result = models["speech_processor"].transcribe_audio(
            audio_data=audio_data,
            input_format=file_extension,
            language=language,
            prefer_whisper=True
        )
        
        return SpeechTranscriptionResponse(
            text=result.text,
            language=result.language,
            confidence=result.confidence,
            processing_time=result.processing_time,
            audio_duration=result.audio_duration,
            method=result.method
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Speech transcription error: {e}")
        raise HTTPException(status_code=500, detail=f"Speech transcription failed: {str(e)}")


# Batch processing endpoints
@app.post("/predict/batch/incidents")
async def batch_classify_incidents(
    requests: List[IncidentReportRequest],
    background_tasks: BackgroundTasks,
    models: Dict = Depends(get_models)
):
    """Batch classify multiple incident reports"""
    if len(requests) > 100:  # Limit batch size
        raise HTTPException(status_code=400, detail="Batch size too large (max 100)")
    
    try:
        reports = [
            IncidentReport(
                tourist_id=req.tourist_id,
                description=req.description,
                timestamp=req.timestamp or datetime.now(),
                language=req.language or "en",
                location=tuple(req.location) if req.location else None
            )
            for req in requests
        ]
        
        results = models["incident_classifier"].batch_classify(reports)
        
        return {
            "results": [
                {
                    "tourist_id": reports[i].tourist_id,
                    "category": result.category,
                    "confidence": result.confidence,
                    "severity_score": result.severity_score,
                    "multilingual_detected": result.multilingual_detected
                }
                for i, result in enumerate(results)
            ],
            "statistics": models["incident_classifier"].get_category_statistics(results)
        }
        
    except Exception as e:
        logger.error(f"Batch incident classification error: {e}")
        raise HTTPException(status_code=500, detail=f"Batch classification failed: {str(e)}")


# Utility endpoints
@app.get("/models/info")
async def get_model_info():
    """Get information about loaded models"""
    return {
        "anomaly_detector": {
            "model_type": "LSTM",
            "input_features": 4,
            "sequence_length": settings.sequence_length,
            "threshold": settings.anomaly_threshold
        },
        "incident_classifier": {
            "model_name": settings.classification_model_name,
            "categories": settings.incident_categories,
            "max_sequence_length": settings.max_sequence_length
        },
        "speech_processor": {
            "whisper_model": settings.whisper_model_size,
            "supported_formats": settings.supported_audio_formats
        }
    }


@app.get("/categories")
async def get_incident_categories():
    """Get list of supported incident categories"""
    return {
        "categories": settings.incident_categories,
        "severity_weights": settings.severity_weights
    }


# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"detail": "Endpoint not found"}
    )


@app.exception_handler(500)
async def internal_error_handler(request, exc):
    logger.error(f"Internal server error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )


# Development server
if __name__ == "__main__":
    uvicorn.run(
        "api.main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=settings.debug,
        log_level=settings.log_level.lower()
    )