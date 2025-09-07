"""
Utilities for generating synthetic datasets and data preprocessing
"""

import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import random
from typing import List, Tuple, Dict, Optional
import json
import os
from dataclasses import asdict

from models.anomaly_detection import LocationPoint
from models.incident_classification import IncidentReport


class SyntheticDataGenerator:
    """Generate synthetic data for training and testing"""
    
    def __init__(self, seed: int = 42):
        np.random.seed(seed)
        random.seed(seed)
        
        # Sample cities and their safe/unsafe zones
        self.cities = {
            "New York": {
                "center": (40.7128, -74.0060),
                "safe_zones": [
                    {"bounds": [(40.7000, -74.0200), (40.7300, -73.9800)], "name": "Manhattan_Safe"},
                    {"bounds": [(40.6900, -74.0100), (40.7100, -73.9900)], "name": "Downtown_Safe"}
                ],
                "unsafe_zones": [
                    {"bounds": [(40.7050, -74.0150), (40.7080, -74.0100)], "name": "High_Crime_Area"}
                ]
            },
            "Paris": {
                "center": (48.8566, 2.3522),
                "safe_zones": [
                    {"bounds": [(48.8400, 2.3300), (48.8700, 2.3700)], "name": "Central_Paris_Safe"}
                ],
                "unsafe_zones": [
                    {"bounds": [(48.8500, 2.3400), (48.8550, 2.3450)], "name": "Tourist_Trap_Area"}
                ]
            },
            "Tokyo": {
                "center": (35.6762, 139.6503),
                "safe_zones": [
                    {"bounds": [(35.6500, 139.6300), (35.7000, 139.6700)], "name": "Shibuya_Safe"}
                ],
                "unsafe_zones": []
            }
        }
        
        # Sample incident templates
        self.incident_templates = {
            "Medical Emergency": [
                "I need medical help, having chest pain",
                "Emergency! Tourist injured in accident",
                "Help! Heart attack, need ambulance",
                "Medical emergency, person unconscious",
                "Urgent: severe allergic reaction",
                "Ayuda médica urgente, dolor en el pecho",
                "Aide médicale urgente, accident grave",
                "Medizinischer Notfall, Herzinfarkt"
            ],
            "Theft": [
                "My wallet was stolen by pickpocket",
                "Camera stolen from hotel room", 
                "Robbed at gunpoint, lost everything",
                "Phone and passport stolen from bag",
                "Credit cards stolen, need help",
                "Me robaron la cartera en el metro",
                "Vol de sac à main dans le métro",
                "Geldbörse gestohlen, brauche Hilfe"
            ],
            "Missing Person": [
                "Can't find my child in the crowd",
                "Tourist missing since yesterday",
                "Lost contact with family member",
                "Friend disappeared from hotel",
                "Elderly tourist missing from group",
                "No puedo encontrar a mi hijo",
                "Personne disparue depuis hier",
                "Kind seit gestern vermisst"
            ],
            "Harassment": [
                "Being followed by stranger",
                "Inappropriate behavior from local",
                "Feeling unsafe, stalker following",
                "Verbal harassment at tourist site",
                "Unwanted attention, need help",
                "Acoso sexual en la calle",
                "Harcèlement dans la rue",
                "Belästigung durch Fremden"
            ],
            "Other": [
                "Lost passport at airport",
                "Need general assistance",
                "Language barrier problem",
                "Hotel booking issue",
                "Transportation problem",
                "Problemas con el hotel",
                "Problème de transport",
                "Sprachbarriere Problem"
            ]
        }
    
    def generate_normal_trajectory(self, center: Tuple[float, float], 
                                 duration_hours: float = 4, 
                                 points_per_hour: int = 12) -> List[LocationPoint]:
        """Generate a normal tourist trajectory"""
        lat_center, lng_center = center
        total_points = int(duration_hours * points_per_hour)
        
        locations = []
        current_time = datetime.now()
        
        # Tourist movement parameters
        max_speed_kmh = 15  # Walking/slow transport
        speed_variance = 0.3
        direction_change_prob = 0.1
        
        current_lat, current_lng = lat_center, lng_center
        current_direction = np.random.uniform(0, 2 * np.pi)
        
        for i in range(total_points):
            # Time increment
            time_delta = timedelta(minutes=60/points_per_hour)
            current_time += time_delta
            
            # Speed variation (km/h)
            speed = np.random.normal(max_speed_kmh * 0.7, max_speed_kmh * speed_variance)
            speed = max(0.5, min(speed, max_speed_kmh))
            
            # Direction changes
            if np.random.random() < direction_change_prob:
                current_direction += np.random.normal(0, np.pi/4)
            
            # Calculate movement
            distance_km = speed * (time_delta.total_seconds() / 3600)
            
            # Convert to lat/lng offset (approximate)
            lat_offset = (distance_km / 111.0) * np.cos(current_direction)
            lng_offset = (distance_km / (111.0 * np.cos(np.radians(current_lat)))) * np.sin(current_direction)
            
            current_lat += lat_offset
            current_lng += lng_offset
            
            locations.append(LocationPoint(
                lat=current_lat,
                lng=current_lng,
                timestamp=current_time,
                tourist_id=f"tourist_{i//100}"
            ))
        
        return locations
    
    def generate_anomalous_trajectory(self, center: Tuple[float, float],
                                    anomaly_type: str = "excessive_speed",
                                    duration_hours: float = 2) -> List[LocationPoint]:
        """Generate trajectory with specific anomaly"""
        lat_center, lng_center = center
        locations = []
        current_time = datetime.now()
        
        points_per_hour = 12
        total_points = int(duration_hours * points_per_hour)
        
        current_lat, current_lng = lat_center, lng_center
        
        for i in range(total_points):
            time_delta = timedelta(minutes=60/points_per_hour)
            current_time += time_delta
            
            if anomaly_type == "excessive_speed":
                # Simulate high-speed movement (vehicle)
                if i > total_points // 3:  # Start anomaly after 1/3 of trajectory
                    speed_kmh = np.random.uniform(80, 120)  # Highway speed
                else:
                    speed_kmh = np.random.uniform(5, 15)  # Normal walking
                    
            elif anomaly_type == "sudden_stop":
                # Normal movement then sudden stop
                if i < total_points * 0.7:
                    speed_kmh = np.random.uniform(20, 40)  # Cycling/bus
                else:
                    speed_kmh = 0.1  # Sudden stop
                    
            elif anomaly_type == "route_deviation":
                # Erratic movement pattern
                speed_kmh = np.random.uniform(5, 25)
                if i % 3 == 0:  # Frequent direction changes
                    direction_change = np.random.uniform(-np.pi/2, np.pi/2)
                else:
                    direction_change = np.random.uniform(-np.pi/6, np.pi/6)
            else:
                speed_kmh = np.random.uniform(5, 15)
            
            # Calculate movement
            distance_km = speed_kmh * (time_delta.total_seconds() / 3600)
            direction = np.random.uniform(0, 2 * np.pi)
            
            # Apply movement
            lat_offset = (distance_km / 111.0) * np.cos(direction)
            lng_offset = (distance_km / (111.0 * np.cos(np.radians(current_lat)))) * np.sin(direction)
            
            current_lat += lat_offset
            current_lng += lng_offset
            
            locations.append(LocationPoint(
                lat=current_lat,
                lng=current_lng,
                timestamp=current_time,
                tourist_id=f"anomaly_tourist_{i//50}"
            ))
        
        return locations
    
    def generate_incident_reports(self, num_reports: int = 100) -> List[IncidentReport]:
        """Generate synthetic incident reports"""
        reports = []
        
        categories = list(self.incident_templates.keys())
        
        for i in range(num_reports):
            # Select random category
            category = np.random.choice(categories)
            
            # Select random template
            template = np.random.choice(self.incident_templates[category])
            
            # Add some variation
            if np.random.random() < 0.3:  # 30% chance to add urgency
                urgency_words = ["URGENT:", "HELP!", "EMERGENCY:", "SOS:"]
                template = f"{np.random.choice(urgency_words)} {template}"
            
            # Random timestamp (last 30 days)
            days_ago = np.random.uniform(0, 30)
            timestamp = datetime.now() - timedelta(days=days_ago)
            
            # Random language detection based on template
            if any(spanish in template.lower() for spanish in ["ayuda", "médico", "robaron"]):
                language = "es"
            elif any(french in template.lower() for french in ["aide", "vol", "disparue"]):
                language = "fr"
            elif any(german in template.lower() for german in ["hilfe", "gestohlen", "vermisst"]):
                language = "de"
            else:
                language = "en"
            
            report = IncidentReport(
                tourist_id=f"tourist_{i}",
                description=template,
                timestamp=timestamp,
                language=language
            )
            
            reports.append(report)
        
        return reports
    
    def save_synthetic_dataset(self, output_dir: str, num_trajectories: int = 50, 
                             num_incidents: int = 200):
        """Generate and save complete synthetic dataset"""
        os.makedirs(output_dir, exist_ok=True)
        
        # Generate location data
        all_trajectories = []
        all_anomalies = []
        
        cities = list(self.cities.keys())
        anomaly_types = ["excessive_speed", "sudden_stop", "route_deviation"]
        
        # Normal trajectories
        for i in range(num_trajectories):
            city = np.random.choice(cities)
            center = self.cities[city]["center"]
            
            trajectory = self.generate_normal_trajectory(center)
            all_trajectories.extend(trajectory)
        
        # Anomalous trajectories  
        for i in range(num_trajectories // 3):  # 1/3 anomalous
            city = np.random.choice(cities)
            center = self.cities[city]["center"]
            anomaly_type = np.random.choice(anomaly_types)
            
            trajectory = self.generate_anomalous_trajectory(center, anomaly_type)
            all_anomalies.extend(trajectory)
        
        # Convert to DataFrames
        trajectory_data = []
        for loc in all_trajectories:
            trajectory_data.append({
                'tourist_id': loc.tourist_id,
                'lat': loc.lat,
                'lng': loc.lng,
                'timestamp': loc.timestamp.isoformat(),
                'is_anomaly': False
            })
        
        for loc in all_anomalies:
            trajectory_data.append({
                'tourist_id': loc.tourist_id,
                'lat': loc.lat,
                'lng': loc.lng,
                'timestamp': loc.timestamp.isoformat(),
                'is_anomaly': True
            })
        
        trajectory_df = pd.DataFrame(trajectory_data)
        trajectory_df.to_csv(os.path.join(output_dir, 'location_data.csv'), index=False)
        
        # Generate and save incident reports
        incidents = self.generate_incident_reports(num_incidents)
        incident_data = []
        
        for incident in incidents:
            incident_data.append({
                'tourist_id': incident.tourist_id,
                'description': incident.description,
                'timestamp': incident.timestamp.isoformat(),
                'language': incident.language
            })
        
        incident_df = pd.DataFrame(incident_data)
        incident_df.to_csv(os.path.join(output_dir, 'incident_reports.csv'), index=False)
        
        # Save city configuration
        with open(os.path.join(output_dir, 'cities_config.json'), 'w') as f:
            json.dump(self.cities, f, indent=2)
        
        print(f"Dataset saved to {output_dir}")
        print(f"- {len(trajectory_data)} location points")
        print(f"- {len(incident_data)} incident reports")
        print(f"- City configurations saved")
        
        return {
            "trajectories": trajectory_df,
            "incidents": incident_df,
            "cities": self.cities
        }


class DataPreprocessor:
    """Preprocessing utilities for GPS and text data"""
    
    @staticmethod
    def clean_gps_data(df: pd.DataFrame) -> pd.DataFrame:
        """Clean and validate GPS data"""
        # Remove invalid coordinates
        df = df[(df['lat'].between(-90, 90)) & (df['lng'].between(-180, 180))]
        
        # Remove duplicate consecutive points
        df = df.sort_values(['tourist_id', 'timestamp'])
        df = df.drop_duplicates(subset=['tourist_id', 'lat', 'lng'], keep='first')
        
        # Handle missing timestamps
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        df = df.dropna(subset=['timestamp'])
        
        return df
    
    @staticmethod
    def interpolate_missing_points(df: pd.DataFrame, max_gap_minutes: int = 30) -> pd.DataFrame:
        """Interpolate missing GPS points"""
        result_dfs = []
        
        for tourist_id in df['tourist_id'].unique():
            tourist_df = df[df['tourist_id'] == tourist_id].sort_values('timestamp')
            
            # Calculate time gaps
            time_diffs = tourist_df['timestamp'].diff()
            
            interpolated_rows = []
            for i, row in tourist_df.iterrows():
                interpolated_rows.append(row)
                
                # Check if we need to interpolate
                if i < len(tourist_df) - 1:
                    time_gap = (tourist_df.iloc[i+1]['timestamp'] - row['timestamp']).total_seconds() / 60
                    
                    if time_gap > 5 and time_gap <= max_gap_minutes:  # Gap between 5-30 minutes
                        # Linear interpolation
                        num_points = int(time_gap // 5)  # One point every 5 minutes
                        
                        next_row = tourist_df.iloc[i+1]
                        for j in range(1, num_points + 1):
                            alpha = j / (num_points + 1)
                            
                            interp_time = row['timestamp'] + timedelta(minutes=5*j)
                            interp_lat = row['lat'] + alpha * (next_row['lat'] - row['lat'])
                            interp_lng = row['lng'] + alpha * (next_row['lng'] - row['lng'])
                            
                            interp_row = row.copy()
                            interp_row['timestamp'] = interp_time
                            interp_row['lat'] = interp_lat
                            interp_row['lng'] = interp_lng
                            
                            interpolated_rows.append(interp_row)
            
            result_dfs.append(pd.DataFrame(interpolated_rows))
        
        return pd.concat(result_dfs, ignore_index=True)
    
    @staticmethod
    def normalize_coordinates(df: pd.DataFrame, center: Tuple[float, float]) -> pd.DataFrame:
        """Normalize coordinates relative to city center"""
        lat_center, lng_center = center
        
        df = df.copy()
        df['lat_norm'] = df['lat'] - lat_center
        df['lng_norm'] = df['lng'] - lng_center
        
        return df
    
    @staticmethod
    def add_speed_features(df: pd.DataFrame) -> pd.DataFrame:
        """Add speed and movement features"""
        df = df.copy().sort_values(['tourist_id', 'timestamp'])
        
        df['speed_kmh'] = 0.0
        df['distance_km'] = 0.0
        df['time_diff_seconds'] = 0.0
        
        for tourist_id in df['tourist_id'].unique():
            mask = df['tourist_id'] == tourist_id
            tourist_data = df[mask].copy()
            
            for i in range(1, len(tourist_data)):
                prev_idx = tourist_data.index[i-1]
                curr_idx = tourist_data.index[i]
                
                # Calculate distance using Haversine formula
                lat1, lng1 = df.loc[prev_idx, 'lat'], df.loc[prev_idx, 'lng']
                lat2, lng2 = df.loc[curr_idx, 'lat'], df.loc[curr_idx, 'lng']
                
                distance = DataPreprocessor._haversine_distance(lat1, lng1, lat2, lng2)
                time_diff = (df.loc[curr_idx, 'timestamp'] - df.loc[prev_idx, 'timestamp']).total_seconds()
                
                speed = (distance / time_diff) * 3.6 if time_diff > 0 else 0  # km/h
                
                df.loc[curr_idx, 'speed_kmh'] = speed
                df.loc[curr_idx, 'distance_km'] = distance / 1000  # Convert to km
                df.loc[curr_idx, 'time_diff_seconds'] = time_diff
        
        return df
    
    @staticmethod
    def _haversine_distance(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
        """Calculate distance between two GPS points in meters"""
        from math import radians, cos, sin, asin, sqrt
        
        lat1, lng1, lat2, lng2 = map(radians, [lat1, lng1, lat2, lng2])
        
        dlat = lat2 - lat1
        dlng = lng2 - lng1
        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlng/2)**2
        c = 2 * asin(sqrt(a))
        r = 6371000  # Radius of earth in meters
        
        return c * r