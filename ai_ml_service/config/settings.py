"""
Configuration settings for the Tourist Safety AI/ML Service
"""
import os
from typing import List, Dict
from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    # API Configuration
    app_name: str = "Tourist Safety AI/ML Service"
    app_version: str = "1.0.0"
    api_host: str = "0.0.0.0"
    api_port: int = 8001
    debug: bool = False
    
    # Model Configuration
    anomaly_model_path: str = "models/anomaly_detector.pth"
    classification_model_name: str = "distilbert-base-multilingual-cased"
    classification_model_path: str = "models/incident_classifier"
    max_sequence_length: int = 512
    
    # Anomaly Detection Parameters
    anomaly_threshold: float = 0.7
    sequence_length: int = 50  # Number of GPS points to analyze
    min_points_for_analysis: int = 10
    
    # Incident Classification Categories
    incident_categories: List[str] = [
        "Medical Emergency",
        "Theft", 
        "Missing Person",
        "Harassment",
        "Other"
    ]
    
    # Severity Scoring
    severity_weights: Dict[str, float] = {
        "Medical Emergency": 0.9,
        "Theft": 0.6,
        "Missing Person": 0.8,
        "Harassment": 0.7,
        "Other": 0.4
    }
    
    # Geographic Configuration
    default_safe_radius: float = 1000.0  # meters
    speed_threshold_kmh: float = 100.0  # km/h for anomaly detection
    
    # Speech Processing
    whisper_model_size: str = "base"
    supported_audio_formats: List[str] = ["wav", "mp3", "m4a", "ogg"]
    
    # Security
    secret_key: str = Field(default="your-secret-key", env="SECRET_KEY")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # External Services
    redis_url: str = Field(default="redis://localhost:6379", env="REDIS_URL")
    
    # Logging
    log_level: str = "INFO"
    log_format: str = "<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()