"""
Time-series anomaly detection model for GPS location data
Detects unusual patterns in tourist movement using LSTM
"""

import torch
import torch.nn as nn
import numpy as np
import os
from typing import List, Tuple, Dict, Optional
from dataclasses import dataclass
import pandas as pd
from datetime import datetime, timedelta


@dataclass
class LocationPoint:
    """Single GPS location point"""
    lat: float
    lng: float
    timestamp: datetime
    tourist_id: str
    
    
@dataclass
class AnomalyResult:
    """Result from anomaly detection"""
    is_anomaly: bool
    confidence: float
    anomaly_type: str
    details: Dict


class LSTMAnomalyDetector(nn.Module):
    """LSTM-based anomaly detector for GPS coordinates"""
    
    def __init__(self, input_size: int = 4, hidden_size: int = 64, num_layers: int = 2, dropout: float = 0.2):
        super(LSTMAnomalyDetector, self).__init__()
        
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        
        # LSTM layers
        self.lstm = nn.LSTM(
            input_size=input_size,  # lat, lng, speed, time_diff
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=dropout if num_layers > 1 else 0
        )
        
        # Prediction layers
        self.fc = nn.Sequential(
            nn.Linear(hidden_size, hidden_size // 2),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(hidden_size // 2, input_size)
        )
        
        # Anomaly scoring layer
        self.anomaly_score = nn.Sequential(
            nn.Linear(hidden_size, hidden_size // 2),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(hidden_size // 2, 1),
            nn.Sigmoid()
        )
    
    def forward(self, x: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor]:
        """
        Forward pass
        Args:
            x: Input tensor of shape (batch_size, sequence_length, input_size)
        Returns:
            predictions: Predicted next points
            anomaly_scores: Anomaly probability scores
        """
        batch_size = x.size(0)
        
        # Initialize hidden state
        h0 = torch.zeros(self.num_layers, batch_size, self.hidden_size).to(x.device)
        c0 = torch.zeros(self.num_layers, batch_size, self.hidden_size).to(x.device)
        
        # LSTM forward pass
        lstm_out, (hn, cn) = self.lstm(x, (h0, c0))
        
        # Use the last hidden state for predictions
        last_hidden = lstm_out[:, -1, :]
        
        # Generate predictions and anomaly scores
        predictions = self.fc(last_hidden)
        anomaly_scores = self.anomaly_score(last_hidden)
        
        return predictions, anomaly_scores


class GPSAnomalyDetector:
    """High-level GPS anomaly detection system"""
    
    def __init__(self, model_path: Optional[str] = None, device: str = 'cpu'):
        self.device = torch.device(device)
        self.model = LSTMAnomalyDetector()
        self.model.to(self.device)
        
        if model_path and os.path.exists(model_path):
            self.load_model(model_path)
        
        # Preprocessing parameters
        self.lat_mean, self.lat_std = 0.0, 1.0
        self.lng_mean, self.lng_std = 0.0, 1.0
        self.speed_mean, self.speed_std = 0.0, 1.0
        self.time_mean, self.time_std = 0.0, 1.0
    
    def preprocess_locations(self, locations: List[LocationPoint]) -> np.ndarray:
        """
        Preprocess GPS locations into model input format
        Returns: array of shape (sequence_length, 4) with [lat, lng, speed, time_diff]
        """
        if len(locations) < 2:
            raise ValueError("Need at least 2 location points for preprocessing")
        
        # Sort by timestamp
        locations = sorted(locations, key=lambda x: x.timestamp)
        
        features = []
        for i in range(len(locations)):
            lat = locations[i].lat
            lng = locations[i].lng
            
            if i == 0:
                speed = 0.0
                time_diff = 0.0
            else:
                # Calculate speed and time difference
                prev_point = locations[i-1]
                distance = self._haversine_distance(
                    prev_point.lat, prev_point.lng, lat, lng
                )
                time_diff = (locations[i].timestamp - prev_point.timestamp).total_seconds()
                speed = (distance / time_diff) * 3.6 if time_diff > 0 else 0.0  # km/h
            
            features.append([lat, lng, speed, time_diff])
        
        return np.array(features, dtype=np.float32)
    
    def _haversine_distance(self, lat1: float, lng1: float, lat2: float, lng2: float) -> float:
        """Calculate distance between two GPS points in meters"""
        from math import radians, cos, sin, asin, sqrt
        
        # Convert decimal degrees to radians
        lat1, lng1, lat2, lng2 = map(radians, [lat1, lng1, lat2, lng2])
        
        # Haversine formula
        dlat = lat2 - lat1
        dlng = lng2 - lng1
        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlng/2)**2
        c = 2 * asin(sqrt(a))
        r = 6371000  # Radius of earth in meters
        
        return c * r
    
    def normalize_features(self, features: np.ndarray) -> np.ndarray:
        """Normalize features for model input"""
        normalized = features.copy()
        
        # Normalize each feature
        normalized[:, 0] = (features[:, 0] - self.lat_mean) / self.lat_std  # lat
        normalized[:, 1] = (features[:, 1] - self.lng_mean) / self.lng_std  # lng
        normalized[:, 2] = (features[:, 2] - self.speed_mean) / self.speed_std  # speed
        normalized[:, 3] = (features[:, 3] - self.time_mean) / self.time_std  # time_diff
        
        return normalized
    
    def detect_anomaly(self, locations: List[LocationPoint], threshold: float = 0.7) -> AnomalyResult:
        """
        Detect anomalies in GPS location sequence
        """
        try:
            if len(locations) < 10:  # Minimum sequence length
                return AnomalyResult(
                    is_anomaly=False,
                    confidence=0.0,
                    anomaly_type="insufficient_data",
                    details={"message": "Need at least 10 location points for analysis"}
                )
            
            # Preprocess locations
            features = self.preprocess_locations(locations)
            normalized_features = self.normalize_features(features)
            
            # Convert to tensor
            input_tensor = torch.FloatTensor(normalized_features).unsqueeze(0).to(self.device)
            
            # Model inference
            self.model.eval()
            with torch.no_grad():
                predictions, anomaly_scores = self.model(input_tensor)
                anomaly_score = anomaly_scores.item()
            
            # Analyze for specific anomaly types
            anomaly_details = self._analyze_anomaly_types(features)
            
            is_anomaly = anomaly_score > threshold
            anomaly_type = "normal"
            
            if is_anomaly:
                if anomaly_details["high_speed"]:
                    anomaly_type = "excessive_speed"
                elif anomaly_details["sudden_stop"]:
                    anomaly_type = "sudden_inactivity"
                elif anomaly_details["route_deviation"]:
                    anomaly_type = "route_deviation"
                else:
                    anomaly_type = "general_anomaly"
            
            return AnomalyResult(
                is_anomaly=is_anomaly,
                confidence=anomaly_score,
                anomaly_type=anomaly_type,
                details=anomaly_details
            )
            
        except Exception as e:
            return AnomalyResult(
                is_anomaly=False,
                confidence=0.0,
                anomaly_type="error",
                details={"error": str(e)}
            )
    
    def _analyze_anomaly_types(self, features: np.ndarray) -> Dict:
        """Analyze specific types of anomalies"""
        speeds = features[:, 2]  # Speed column
        
        # Check for excessive speed (> 100 km/h)
        high_speed = np.any(speeds > 100)
        
        # Check for sudden stops (speed drops to near 0 after high speed)
        sudden_stop = False
        for i in range(1, len(speeds)):
            if speeds[i-1] > 30 and speeds[i] < 5:  # Sudden stop
                sudden_stop = True
                break
        
        # Check for route deviation (significant direction changes)
        route_deviation = False
        if len(features) > 5:
            # Simple heuristic: large changes in direction
            lat_diff = np.diff(features[:, 0])
            lng_diff = np.diff(features[:, 1])
            direction_changes = np.abs(np.diff(np.arctan2(lat_diff, lng_diff)))
            route_deviation = np.any(direction_changes > np.pi/2)  # 90-degree changes
        
        return {
            "high_speed": high_speed,
            "sudden_stop": sudden_stop,
            "route_deviation": route_deviation,
            "max_speed": float(np.max(speeds)),
            "avg_speed": float(np.mean(speeds)),
            "speed_variance": float(np.var(speeds))
        }
    
    def save_model(self, path: str):
        """Save the trained model"""
        torch.save({
            'model_state_dict': self.model.state_dict(),
            'normalization_params': {
                'lat_mean': self.lat_mean, 'lat_std': self.lat_std,
                'lng_mean': self.lng_mean, 'lng_std': self.lng_std,
                'speed_mean': self.speed_mean, 'speed_std': self.speed_std,
                'time_mean': self.time_mean, 'time_std': self.time_std
            }
        }, path)
    
    def load_model(self, path: str):
        """Load a trained model"""
        checkpoint = torch.load(path, map_location=self.device)
        self.model.load_state_dict(checkpoint['model_state_dict'])
        
        # Load normalization parameters
        norm_params = checkpoint['normalization_params']
        self.lat_mean = norm_params['lat_mean']
        self.lat_std = norm_params['lat_std']
        self.lng_mean = norm_params['lng_mean']
        self.lng_std = norm_params['lng_std']
        self.speed_mean = norm_params['speed_mean']
        self.speed_std = norm_params['speed_std']
        self.time_mean = norm_params['time_mean']
        self.time_std = norm_params['time_std']