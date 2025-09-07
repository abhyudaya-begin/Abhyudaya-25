#!/usr/bin/env python3
"""
Setup and demonstration script for the Tourist Safety AI/ML Service
"""

import os
import sys
import argparse
import subprocess
from pathlib import Path

def install_dependencies():
    """Install required dependencies"""
    print("📦 Installing dependencies...")
    
    try:
        # Install core dependencies
        subprocess.check_call([
            sys.executable, "-m", "pip", "install", "-r", "requirements.txt"
        ])
        print("✅ Dependencies installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False

def generate_sample_data():
    """Generate sample datasets for demonstration"""
    print("🎲 Generating sample data...")
    
    try:
        from data.synthetic_data import SyntheticDataGenerator
        
        # Create data directory
        os.makedirs("data/synthetic", exist_ok=True)
        
        # Generate synthetic dataset
        generator = SyntheticDataGenerator(seed=42)
        dataset = generator.save_synthetic_dataset(
            output_dir="data/synthetic",
            num_trajectories=50,
            num_incidents=200
        )
        
        print("✅ Sample data generated successfully!")
        print(f"   - Location data: {len(dataset['trajectories'])} points")
        print(f"   - Incident reports: {len(dataset['incidents'])} reports")
        return True
        
    except Exception as e:
        print(f"❌ Failed to generate sample data: {e}")
        return False

def test_models():
    """Test that all models can be loaded and work correctly"""
    print("🧪 Testing models...")
    
    try:
        from models.anomaly_detection import GPSAnomalyDetector, LocationPoint
        from models.incident_classification import IncidentClassifier, IncidentReport
        from models.speech_processing import SpeechProcessor
        from datetime import datetime
        
        # Test anomaly detection
        print("   Testing anomaly detection...")
        detector = GPSAnomalyDetector(device='cpu')
        
        test_locations = [
            LocationPoint(40.7128 + i*0.001, -74.0060 + i*0.001, 
                         datetime.now(), "test_tourist")
            for i in range(15)
        ]
        
        result = detector.detect_anomaly(test_locations)
        assert hasattr(result, 'is_anomaly')
        print("   ✅ Anomaly detection working")
        
        # Test incident classification
        print("   Testing incident classification...")
        classifier = IncidentClassifier(device='cpu')
        
        test_report = IncidentReport(
            tourist_id="test_001",
            description="Emergency! Need medical help",
            timestamp=datetime.now(),
            language="en"
        )
        
        result = classifier.classify_incident(test_report)
        assert hasattr(result, 'category')
        print("   ✅ Incident classification working")
        
        # Test speech processing
        print("   Testing speech processing...")
        speech_processor = SpeechProcessor()
        languages = speech_processor.get_supported_languages()
        assert len(languages) > 0
        print("   ✅ Speech processing working")
        
        print("✅ All models tested successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Model testing failed: {e}")
        return False

def start_api_server():
    """Start the FastAPI server"""
    print("🚀 Starting API server...")
    
    try:
        # Start uvicorn server
        import uvicorn
        from api.main import app
        
        print("   Server starting at http://localhost:8001")
        print("   API documentation available at http://localhost:8001/docs")
        
        uvicorn.run(
            "api.main:app",
            host="0.0.0.0",
            port=8001,
            reload=True,
            log_level="info"
        )
        
    except Exception as e:
        print(f"❌ Failed to start server: {e}")
        return False

def run_tests():
    """Run the test suite"""
    print("🧪 Running test suite...")
    
    try:
        import pytest
        
        # Run tests
        exit_code = pytest.main([
            "tests/test_tourist_safety.py", 
            "-v", 
            "--tb=short"
        ])
        
        if exit_code == 0:
            print("✅ All tests passed!")
            return True
        else:
            print("❌ Some tests failed")
            return False
            
    except Exception as e:
        print(f"❌ Test execution failed: {e}")
        return False

def demo_notebook():
    """Launch the demo notebook"""
    print("📓 Launching demo notebook...")
    
    try:
        import subprocess
        
        # Launch Jupyter notebook
        subprocess.Popen([
            "jupyter", "notebook", 
            "notebooks/tourist_safety_demo.ipynb",
            "--port=8888"
        ])
        
        print("   Notebook server starting at http://localhost:8888")
        print("   Open the tourist_safety_demo.ipynb file")
        return True
        
    except Exception as e:
        print(f"❌ Failed to launch notebook: {e}")
        return False

def main():
    """Main setup function"""
    parser = argparse.ArgumentParser(description="Tourist Safety AI/ML Service Setup")
    parser.add_argument("command", choices=[
        "install", "data", "test", "models", "server", "notebook", "all"
    ], help="Command to execute")
    
    args = parser.parse_args()
    
    print("🏖️  Tourist Safety AI/ML Service Setup")
    print("=" * 50)
    
    success = True
    
    if args.command in ["install", "all"]:
        success &= install_dependencies()
    
    if args.command in ["data", "all"]:
        success &= generate_sample_data()
    
    if args.command in ["models", "all"]:
        success &= test_models()
    
    if args.command in ["test", "all"]:
        success &= run_tests()
    
    if args.command == "server":
        if success:
            start_api_server()
        else:
            print("❌ Cannot start server due to previous errors")
    
    if args.command == "notebook":
        demo_notebook()
    
    if args.command == "all":
        if success:
            print("\n🎉 Setup completed successfully!")
            print("\nNext steps:")
            print("1. Run 'python setup.py server' to start the API")
            print("2. Run 'python setup.py notebook' for interactive demo")
            print("3. Visit http://localhost:8001/docs for API documentation")
        else:
            print("\n❌ Setup completed with errors")
    
    return success

if __name__ == "__main__":
    main()