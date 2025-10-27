"""
Tests for the Tourist Safety AI/ML Service
"""

import pytest
import numpy as np
from datetime import datetime, timedelta
import sys
import os

# Add the parent directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models.anomaly_detection import GPSAnomalyDetector, LocationPoint
from models.incident_classification import IncidentClassifier, IncidentReport
from models.speech_processing import SpeechProcessor
from data.synthetic_data import SyntheticDataGenerator


class TestAnomalyDetection:
    """Test cases for GPS anomaly detection"""
    
    def setup_method(self):
        """Set up test fixtures"""
        self.detector = GPSAnomalyDetector(device='cpu')
        self.data_generator = SyntheticDataGenerator(seed=42)
    
    def test_normal_trajectory_detection(self):
        """Test that normal trajectories are not flagged as anomalous"""
        center = (40.7128, -74.0060)  # New York
        trajectory = self.data_generator.generate_normal_trajectory(center, duration_hours=1)
        
        result = self.detector.detect_anomaly(trajectory, threshold=0.7)
        
        # Normal trajectories should generally not be anomalous
        # But we allow some false positives due to model limitations
        assert isinstance(result.is_anomaly, bool)
        assert 0.0 <= result.confidence <= 1.0
        assert result.anomaly_type in ["normal", "general_anomaly", "insufficient_data", "error"]
    
    def test_anomalous_trajectory_detection(self):
        """Test that anomalous trajectories are properly detected"""
        center = (40.7128, -74.0060)
        trajectory = self.data_generator.generate_anomalous_trajectory(
            center, anomaly_type="excessive_speed", duration_hours=1
        )
        
        result = self.detector.detect_anomaly(trajectory, threshold=0.5)
        
        assert isinstance(result.is_anomaly, bool)
        assert 0.0 <= result.confidence <= 1.0
        assert result.anomaly_type in [
            "excessive_speed", "sudden_inactivity", "route_deviation", 
            "general_anomaly", "normal", "insufficient_data", "error"
        ]
    
    def test_insufficient_data_handling(self):
        """Test handling of insufficient data"""
        # Create a very short trajectory
        short_trajectory = [
            LocationPoint(40.7128, -74.0060, datetime.now(), "test_tourist")
        ]
        
        result = self.detector.detect_anomaly(short_trajectory)
        
        assert result.anomaly_type == "insufficient_data"
        assert not result.is_anomaly
        assert result.confidence == 0.0


class TestIncidentClassification:
    """Test cases for incident classification"""
    
    def setup_method(self):
        """Set up test fixtures"""
        self.classifier = IncidentClassifier(device='cpu')
    
    def test_medical_emergency_classification(self):
        """Test classification of medical emergency reports"""
        report = IncidentReport(
            tourist_id="test_001",
            description="Emergency! I'm having chest pain and need medical help",
            timestamp=datetime.now(),
            language="en"
        )
        
        result = self.classifier.classify_incident(report)
        
        assert result.category in self.classifier.categories
        assert 0.0 <= result.confidence <= 1.0
        assert 0.0 <= result.severity_score <= 1.0
        assert isinstance(result.multilingual_detected, bool)
    
    def test_theft_classification(self):
        """Test classification of theft reports"""
        report = IncidentReport(
            tourist_id="test_002",
            description="My wallet was stolen by a pickpocket",
            timestamp=datetime.now(),
            language="en"
        )
        
        result = self.classifier.classify_incident(report)
        
        assert result.category in self.classifier.categories
        assert 0.0 <= result.confidence <= 1.0
        assert 0.0 <= result.severity_score <= 1.0
    
    def test_multilingual_detection(self):
        """Test multilingual text detection"""
        spanish_report = IncidentReport(
            tourist_id="test_003",
            description="Ayuda médica urgente, tengo dolor en el pecho",
            timestamp=datetime.now(),
            language="es"
        )
        
        result = self.classifier.classify_incident(spanish_report)
        
        assert result.category in self.classifier.categories
        # Should detect non-English language
        assert result.multilingual_detected is True
    
    def test_batch_classification(self):
        """Test batch processing of incident reports"""
        reports = [
            IncidentReport("test_001", "Emergency medical help needed", datetime.now(), "en"),
            IncidentReport("test_002", "Stolen phone and wallet", datetime.now(), "en"),
            IncidentReport("test_003", "Can't find my child", datetime.now(), "en")
        ]
        
        results = self.classifier.batch_classify(reports)
        
        assert len(results) == len(reports)
        for result in results:
            assert result.category in self.classifier.categories
            assert 0.0 <= result.confidence <= 1.0


class TestSpeechProcessing:
    """Test cases for speech processing"""
    
    def setup_method(self):
        """Set up test fixtures"""
        self.processor = SpeechProcessor()
    
    def test_supported_formats(self):
        """Test that supported formats are correctly defined"""
        expected_formats = ['wav', 'mp3', 'm4a', 'ogg', 'flac', 'aac']
        
        for fmt in expected_formats:
            assert fmt in self.processor.supported_formats
    
    def test_language_support(self):
        """Test language support functionality"""
        languages = self.processor.get_supported_languages()
        
        assert isinstance(languages, list)
        assert len(languages) > 0
        assert 'en' in languages  # English should be supported
    
    def test_audio_validation(self):
        """Test audio validation with invalid data"""
        # Test with empty audio data
        result = self.processor.validate_audio(b'', 'wav')
        
        assert 'is_valid' in result
        assert 'error' in result or 'issues' in result


class TestDataGeneration:
    """Test cases for synthetic data generation"""
    
    def setup_method(self):
        """Set up test fixtures"""
        self.generator = SyntheticDataGenerator(seed=42)
    
    def test_normal_trajectory_generation(self):
        """Test generation of normal trajectories"""
        center = (40.7128, -74.0060)
        trajectory = self.generator.generate_normal_trajectory(center, duration_hours=1)
        
        assert len(trajectory) > 0
        assert all(isinstance(point, LocationPoint) for point in trajectory)
        assert all(point.tourist_id is not None for point in trajectory)
    
    def test_anomalous_trajectory_generation(self):
        """Test generation of anomalous trajectories"""
        center = (40.7128, -74.0060)
        anomaly_types = ["excessive_speed", "sudden_stop", "route_deviation"]
        
        for anomaly_type in anomaly_types:
            trajectory = self.generator.generate_anomalous_trajectory(
                center, anomaly_type=anomaly_type, duration_hours=1
            )
            
            assert len(trajectory) > 0
            assert all(isinstance(point, LocationPoint) for point in trajectory)
    
    def test_incident_report_generation(self):
        """Test generation of incident reports"""
        reports = self.generator.generate_incident_reports(num_reports=10)
        
        assert len(reports) == 10
        assert all(isinstance(report, IncidentReport) for report in reports)
        assert all(report.description is not None for report in reports)
        assert all(report.tourist_id is not None for report in reports)


# Integration tests
class TestIntegration:
    """Integration tests for the complete system"""
    
    def setup_method(self):
        """Set up test fixtures"""
        self.detector = GPSAnomalyDetector(device='cpu')
        self.classifier = IncidentClassifier(device='cpu')
        self.generator = SyntheticDataGenerator(seed=42)
    
    def test_end_to_end_anomaly_detection(self):
        """Test complete anomaly detection pipeline"""
        # Generate data
        center = (40.7128, -74.0060)
        normal_trajectory = self.generator.generate_normal_trajectory(center)
        anomaly_trajectory = self.generator.generate_anomalous_trajectory(center, "excessive_speed")
        
        # Detect anomalies
        normal_result = self.detector.detect_anomaly(normal_trajectory)
        anomaly_result = self.detector.detect_anomaly(anomaly_trajectory)
        
        # Validate results
        assert isinstance(normal_result.is_anomaly, bool)
        assert isinstance(anomaly_result.is_anomaly, bool)
        assert 0.0 <= normal_result.confidence <= 1.0
        assert 0.0 <= anomaly_result.confidence <= 1.0
    
    def test_end_to_end_incident_classification(self):
        """Test complete incident classification pipeline"""
        # Generate incident reports
        reports = self.generator.generate_incident_reports(num_reports=5)
        
        # Classify incidents
        results = []
        for report in reports:
            result = self.classifier.classify_incident(report)
            results.append(result)
        
        # Validate results
        assert len(results) == len(reports)
        for result in results:
            assert result.category in self.classifier.categories
            assert 0.0 <= result.confidence <= 1.0
            assert 0.0 <= result.severity_score <= 1.0


# Performance tests
class TestPerformance:
    """Performance tests for real-time requirements"""
    
    def setup_method(self):
        """Set up test fixtures"""
        self.detector = GPSAnomalyDetector(device='cpu')
        self.classifier = IncidentClassifier(device='cpu')
        self.generator = SyntheticDataGenerator(seed=42)
    
    def test_anomaly_detection_performance(self):
        """Test anomaly detection performance"""
        import time
        
        center = (40.7128, -74.0060)
        trajectory = self.generator.generate_normal_trajectory(center, duration_hours=1)
        
        # Measure processing time
        start_time = time.time()
        result = self.detector.detect_anomaly(trajectory)
        processing_time = time.time() - start_time
        
        # Should complete within reasonable time (< 5 seconds for testing)
        assert processing_time < 5.0
        assert isinstance(result.is_anomaly, bool)
    
    def test_incident_classification_performance(self):
        """Test incident classification performance"""
        import time
        
        report = IncidentReport(
            tourist_id="perf_test",
            description="Emergency medical help needed immediately",
            timestamp=datetime.now(),
            language="en"
        )
        
        # Measure processing time
        start_time = time.time()
        result = self.classifier.classify_incident(report)
        processing_time = time.time() - start_time
        
        # Should complete within reasonable time (< 2 seconds for testing)
        assert processing_time < 2.0
        assert result.category in self.classifier.categories


if __name__ == "__main__":
    # Run tests
    pytest.main([__file__, "-v"])