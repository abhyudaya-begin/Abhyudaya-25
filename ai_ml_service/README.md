# Tourist Safety Monitoring AI/ML Service

This service provides AI/ML capabilities for real-time tourist safety monitoring and incident response.

## Features

- **Anomaly Detection**: Time-series analysis of GPS location data to detect unusual movement patterns
- **Incident Classification**: NLP-based classification of incident reports into categories (Medical Emergency, Theft, Missing Person, Harassment, Other)
- **Severity Scoring**: Automated severity assessment based on behavior patterns and report content
- **Multilingual Support**: Support for multiple languages in incident report classification
- **Real-time Inference**: Low-latency predictions suitable for real-time applications
- **Speech-to-Text**: Integration with speech processing for SOS voice reports

## Architecture

### Models
- **Anomaly Detection**: LSTM-based time-series model for GPS coordinate analysis
- **Text Classification**: Fine-tuned BERT/DistilBERT for incident categorization
- **Speech Processing**: Whisper integration for voice-to-text conversion

### API Endpoints
- `/predict/anomaly` - Detect location anomalies
- `/predict/incident` - Classify incident reports
- `/predict/severity` - Calculate severity scores
- `/speech/transcribe` - Convert speech to text
- `/health` - Service health check

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Start the service:
```bash
uvicorn api.main:app --host 0.0.0.0 --port 8001
```

## Data Format

### Location Data
```json
{
  "tourist_id": "string",
  "coordinates": [
    {"lat": 40.7128, "lng": -74.0060, "timestamp": "2024-01-01T12:00:00Z"}
  ],
  "safe_zones": [{"bounds": [...], "type": "safe"}]
}
```

### Incident Reports
```json
{
  "tourist_id": "string",
  "description": "Help, I've been robbed!",
  "timestamp": "2024-01-01T12:00:00Z",
  "language": "en"
}
```