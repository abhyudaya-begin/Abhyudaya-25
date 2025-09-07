"""
Utility functions for geospatial processing and safe zone management
"""

import numpy as np
from typing import List, Tuple, Dict, Optional
from dataclasses import dataclass
import json
from shapely.geometry import Point, Polygon
import geopandas as gpd


@dataclass
class SafeZone:
    """Safe zone definition"""
    name: str
    bounds: List[Tuple[float, float]]  # List of (lat, lng) coordinates
    zone_type: str  # 'safe' or 'unsafe'
    description: Optional[str] = None


class GeoFenceManager:
    """Manage safe and unsafe zones for tourist areas"""
    
    def __init__(self):
        self.safe_zones: List[SafeZone] = []
        self.unsafe_zones: List[SafeZone] = []
    
    def add_safe_zone(self, name: str, bounds: List[Tuple[float, float]], description: str = None):
        """Add a safe zone"""
        zone = SafeZone(
            name=name,
            bounds=bounds,
            zone_type='safe',
            description=description
        )
        self.safe_zones.append(zone)
    
    def add_unsafe_zone(self, name: str, bounds: List[Tuple[float, float]], description: str = None):
        """Add an unsafe zone"""
        zone = SafeZone(
            name=name,
            bounds=bounds,
            zone_type='unsafe',
            description=description
        )
        self.unsafe_zones.append(zone)
    
    def load_zones_from_json(self, file_path: str):
        """Load zones from JSON configuration"""
        with open(file_path, 'r') as f:
            data = json.load(f)
        
        for city_name, city_data in data.items():
            # Load safe zones
            for zone in city_data.get('safe_zones', []):
                self.add_safe_zone(
                    name=f"{city_name}_{zone['name']}",
                    bounds=zone['bounds'],
                    description=f"Safe zone in {city_name}"
                )
            
            # Load unsafe zones
            for zone in city_data.get('unsafe_zones', []):
                self.add_unsafe_zone(
                    name=f"{city_name}_{zone['name']}",
                    bounds=zone['bounds'],
                    description=f"Unsafe zone in {city_name}"
                )
    
    def check_point_safety(self, lat: float, lng: float) -> Dict[str, any]:
        """Check if a point is in safe or unsafe zones"""
        point = Point(lng, lat)  # Note: Shapely uses (lng, lat) order
        
        result = {
            'is_safe': None,  # True/False/None (unknown)
            'zone_name': None,
            'zone_type': None,
            'in_safe_zone': False,
            'in_unsafe_zone': False
        }
        
        # Check safe zones
        for zone in self.safe_zones:
            if len(zone.bounds) >= 3:  # Need at least 3 points for polygon
                try:
                    polygon = Polygon([(lng, lat) for lat, lng in zone.bounds])
                    if polygon.contains(point):
                        result['is_safe'] = True
                        result['zone_name'] = zone.name
                        result['zone_type'] = 'safe'
                        result['in_safe_zone'] = True
                        return result
                except:
                    continue
        
        # Check unsafe zones
        for zone in self.unsafe_zones:
            if len(zone.bounds) >= 3:
                try:
                    polygon = Polygon([(lng, lat) for lat, lng in zone.bounds])
                    if polygon.contains(point):
                        result['is_safe'] = False
                        result['zone_name'] = zone.name
                        result['zone_type'] = 'unsafe'
                        result['in_unsafe_zone'] = True
                        return result
                except:
                    continue
        
        # Point not in any defined zone
        result['is_safe'] = None  # Unknown
        return result
    
    def get_nearest_safe_zone(self, lat: float, lng: float, max_distance_km: float = 5.0) -> Optional[Dict]:
        """Find the nearest safe zone to a given point"""
        point = Point(lng, lat)
        nearest_zone = None
        min_distance = float('inf')
        
        for zone in self.safe_zones:
            if len(zone.bounds) >= 3:
                try:
                    polygon = Polygon([(lng, lat) for lat, lng in zone.bounds])
                    distance = point.distance(polygon) * 111.0  # Approximate km conversion
                    
                    if distance < min_distance and distance <= max_distance_km:
                        min_distance = distance
                        nearest_zone = {
                            'name': zone.name,
                            'distance_km': distance,
                            'bounds': zone.bounds,
                            'description': zone.description
                        }
                except:
                    continue
        
        return nearest_zone


class MovementAnalyzer:
    """Analyze movement patterns for anomaly detection"""
    
    @staticmethod
    def calculate_bearing(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
        """Calculate bearing between two points in degrees"""
        import math
        
        lat1, lng1, lat2, lng2 = map(math.radians, [lat1, lng1, lat2, lng2])
        
        dlng = lng2 - lng1
        
        y = math.sin(dlng) * math.cos(lat2)
        x = math.cos(lat1) * math.sin(lat2) - math.sin(lat1) * math.cos(lat2) * math.cos(dlng)
        
        bearing = math.atan2(y, x)
        bearing = math.degrees(bearing)
        bearing = (bearing + 360) % 360
        
        return bearing
    
    @staticmethod
    def detect_direction_changes(coordinates: List[Tuple[float, float]], threshold_degrees: float = 45) -> List[int]:
        """Detect significant direction changes in a path"""
        if len(coordinates) < 3:
            return []
        
        direction_changes = []
        
        for i in range(1, len(coordinates) - 1):
            lat1, lng1 = coordinates[i-1]
            lat2, lng2 = coordinates[i]
            lat3, lng3 = coordinates[i+1]
            
            # Calculate bearings
            bearing1 = MovementAnalyzer.calculate_bearing(lat1, lng1, lat2, lng2)
            bearing2 = MovementAnalyzer.calculate_bearing(lat2, lng2, lat3, lng3)
            
            # Calculate angle difference
            angle_diff = abs(bearing2 - bearing1)
            if angle_diff > 180:
                angle_diff = 360 - angle_diff
            
            if angle_diff > threshold_degrees:
                direction_changes.append(i)
        
        return direction_changes
    
    @staticmethod
    def calculate_movement_statistics(coordinates: List[Tuple[float, float]], 
                                   timestamps: List[any]) -> Dict[str, float]:
        """Calculate movement statistics for a trajectory"""
        if len(coordinates) < 2:
            return {}
        
        from datetime import datetime
        import pandas as pd
        
        # Convert timestamps if needed
        if isinstance(timestamps[0], str):
            timestamps = [pd.to_datetime(ts) for ts in timestamps]
        
        distances = []
        speeds = []
        time_intervals = []
        
        for i in range(1, len(coordinates)):
            # Calculate distance
            lat1, lng1 = coordinates[i-1]
            lat2, lng2 = coordinates[i]
            distance = MovementAnalyzer.haversine_distance(lat1, lng1, lat2, lng2)
            distances.append(distance)
            
            # Calculate time interval and speed
            time_diff = (timestamps[i] - timestamps[i-1]).total_seconds()
            time_intervals.append(time_diff)
            
            if time_diff > 0:
                speed = (distance / time_diff) * 3.6  # km/h
                speeds.append(speed)
        
        # Calculate statistics
        total_distance = sum(distances) / 1000  # km
        total_time = sum(time_intervals) / 3600  # hours
        avg_speed = np.mean(speeds) if speeds else 0
        max_speed = max(speeds) if speeds else 0
        speed_variance = np.var(speeds) if speeds else 0
        
        direction_changes = MovementAnalyzer.detect_direction_changes(coordinates)
        
        return {
            'total_distance_km': total_distance,
            'total_time_hours': total_time,
            'average_speed_kmh': avg_speed,
            'max_speed_kmh': max_speed,
            'speed_variance': speed_variance,
            'num_direction_changes': len(direction_changes),
            'direction_change_frequency': len(direction_changes) / len(coordinates) if coordinates else 0
        }
    
    @staticmethod
    def haversine_distance(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
        """Calculate distance between two GPS points in meters"""
        from math import radians, cos, sin, asin, sqrt
        
        lat1, lng1, lat2, lng2 = map(radians, [lat1, lng1, lat2, lng2])
        
        dlat = lat2 - lat1
        dlng = lng2 - lng1
        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlng/2)**2
        c = 2 * asin(sqrt(a))
        r = 6371000  # Radius of earth in meters
        
        return c * r


class SafetyScorer:
    """Calculate comprehensive safety scores based on multiple factors"""
    
    def __init__(self, geofence_manager: GeoFenceManager):
        self.geofence_manager = geofence_manager
        
        # Scoring weights
        self.weights = {
            'location_safety': 0.3,
            'movement_pattern': 0.25,
            'time_of_day': 0.15,
            'speed_pattern': 0.15,
            'zone_transitions': 0.15
        }
    
    def calculate_location_safety_score(self, lat: float, lng: float) -> float:
        """Score based on current location safety"""
        zone_info = self.geofence_manager.check_point_safety(lat, lng)
        
        if zone_info['is_safe'] is True:
            return 0.9  # High safety in safe zone
        elif zone_info['is_safe'] is False:
            return 0.1  # Low safety in unsafe zone
        else:
            # Unknown zone - check for nearby safe zones
            nearest_safe = self.geofence_manager.get_nearest_safe_zone(lat, lng)
            if nearest_safe and nearest_safe['distance_km'] < 1.0:
                return 0.7  # Moderately safe near safe zone
            else:
                return 0.5  # Neutral safety score
    
    def calculate_movement_safety_score(self, coordinates: List[Tuple[float, float]], 
                                      timestamps: List[any]) -> float:
        """Score based on movement patterns"""
        if len(coordinates) < 3:
            return 0.5  # Neutral for insufficient data
        
        stats = MovementAnalyzer.calculate_movement_statistics(coordinates, timestamps)
        
        score = 0.5  # Base score
        
        # Penalize for excessive speed
        if stats.get('max_speed_kmh', 0) > 100:
            score -= 0.3
        elif stats.get('max_speed_kmh', 0) > 50:
            score -= 0.1
        
        # Penalize for erratic movement (many direction changes)
        direction_change_freq = stats.get('direction_change_frequency', 0)
        if direction_change_freq > 0.3:  # More than 30% of points have direction changes
            score -= 0.2
        
        # Penalize for high speed variance (inconsistent movement)
        speed_variance = stats.get('speed_variance', 0)
        if speed_variance > 100:  # High variance in speed
            score -= 0.1
        
        return max(0.0, min(1.0, score))
    
    def calculate_time_safety_score(self, timestamp: any) -> float:
        """Score based on time of day"""
        from datetime import datetime
        import pandas as pd
        
        if isinstance(timestamp, str):
            timestamp = pd.to_datetime(timestamp)
        
        hour = timestamp.hour
        
        # Generally safer during daytime
        if 6 <= hour <= 22:  # 6 AM to 10 PM
            return 0.8
        elif 22 <= hour <= 24 or 0 <= hour <= 2:  # 10 PM to 2 AM
            return 0.4  # Moderately unsafe
        else:  # 2 AM to 6 AM
            return 0.2  # Less safe during very late hours
    
    def calculate_comprehensive_safety_score(self, coordinates: List[Tuple[float, float]],
                                           timestamps: List[any]) -> Dict[str, float]:
        """Calculate comprehensive safety score"""
        if not coordinates or not timestamps:
            return {'overall_score': 0.5, 'component_scores': {}}
        
        # Current location (most recent point)
        current_lat, current_lng = coordinates[-1]
        current_time = timestamps[-1]
        
        # Calculate component scores
        location_score = self.calculate_location_safety_score(current_lat, current_lng)
        movement_score = self.calculate_movement_safety_score(coordinates, timestamps)
        time_score = self.calculate_time_safety_score(current_time)
        
        # Zone transition analysis
        zone_transition_score = self._calculate_zone_transition_score(coordinates)
        
        # Speed pattern analysis
        speed_pattern_score = self._calculate_speed_pattern_score(coordinates, timestamps)
        
        # Weighted overall score
        overall_score = (
            self.weights['location_safety'] * location_score +
            self.weights['movement_pattern'] * movement_score +
            self.weights['time_of_day'] * time_score +
            self.weights['zone_transitions'] * zone_transition_score +
            self.weights['speed_pattern'] * speed_pattern_score
        )
        
        component_scores = {
            'location_safety': location_score,
            'movement_pattern': movement_score,
            'time_of_day': time_score,
            'zone_transitions': zone_transition_score,
            'speed_pattern': speed_pattern_score
        }
        
        return {
            'overall_score': overall_score,
            'component_scores': component_scores
        }
    
    def _calculate_zone_transition_score(self, coordinates: List[Tuple[float, float]]) -> float:
        """Score based on transitions between safe/unsafe zones"""
        if len(coordinates) < 2:
            return 0.5
        
        transitions = []
        for lat, lng in coordinates:
            zone_info = self.geofence_manager.check_point_safety(lat, lng)
            transitions.append(zone_info['is_safe'])
        
        # Count transitions from safe to unsafe zones
        unsafe_transitions = 0
        for i in range(1, len(transitions)):
            if transitions[i-1] is True and transitions[i] is False:
                unsafe_transitions += 1
        
        # Penalize for entering unsafe zones
        if unsafe_transitions > 0:
            return max(0.1, 0.8 - (unsafe_transitions * 0.2))
        else:
            return 0.8
    
    def _calculate_speed_pattern_score(self, coordinates: List[Tuple[float, float]], 
                                     timestamps: List[any]) -> float:
        """Score based on speed patterns"""
        if len(coordinates) < 2:
            return 0.5
        
        stats = MovementAnalyzer.calculate_movement_statistics(coordinates, timestamps)
        avg_speed = stats.get('average_speed_kmh', 0)
        
        # Ideal speeds for tourists (walking, cycling, public transport)
        if 2 <= avg_speed <= 30:  # Normal tourist speeds
            return 0.8
        elif avg_speed < 2:  # Very slow or stationary
            return 0.6
        elif 30 < avg_speed <= 60:  # Fast transport
            return 0.7
        else:  # Very high speed
            return 0.3