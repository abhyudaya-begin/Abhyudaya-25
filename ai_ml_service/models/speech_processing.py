"""
Speech-to-text processing for emergency SOS reports
Supports multiple audio formats and languages using Whisper
"""

import whisper
import speech_recognition as sr
from pydub import AudioSegment
import tempfile
import os
from typing import Optional, Dict, List, Union
from dataclasses import dataclass
import io
import wave


@dataclass
class TranscriptionResult:
    """Result from speech-to-text conversion"""
    text: str
    language: str
    confidence: float
    processing_time: float
    audio_duration: float
    method: str  # 'whisper' or 'speech_recognition'


class SpeechProcessor:
    """Speech-to-text processor with multiple backend support"""
    
    def __init__(self, whisper_model_size: str = "base"):
        self.whisper_model_size = whisper_model_size
        self.whisper_model = None
        self.sr_recognizer = sr.Recognizer()
        
        # Supported audio formats
        self.supported_formats = ['wav', 'mp3', 'm4a', 'ogg', 'flac', 'aac']
        
        # Language codes mapping
        self.language_codes = {
            'en': 'english',
            'es': 'spanish', 
            'fr': 'french',
            'de': 'german',
            'it': 'italian',
            'pt': 'portuguese',
            'ru': 'russian',
            'ja': 'japanese',
            'ko': 'korean',
            'zh': 'chinese'
        }
        
        self._initialize_whisper()
    
    def _initialize_whisper(self):
        """Initialize Whisper model"""
        try:
            self.whisper_model = whisper.load_model(self.whisper_model_size)
            print(f"Whisper model '{self.whisper_model_size}' loaded successfully")
        except Exception as e:
            print(f"Failed to load Whisper model: {e}")
            self.whisper_model = None
    
    def convert_audio_format(self, audio_data: bytes, input_format: str, output_format: str = 'wav') -> bytes:
        """Convert audio between different formats"""
        try:
            # Load audio data
            audio = AudioSegment.from_file(io.BytesIO(audio_data), format=input_format)
            
            # Convert to target format
            output_buffer = io.BytesIO()
            audio.export(output_buffer, format=output_format)
            output_buffer.seek(0)
            
            return output_buffer.read()
        except Exception as e:
            raise ValueError(f"Audio conversion failed: {e}")
    
    def preprocess_audio(self, audio_data: bytes, input_format: str) -> tuple:
        """Preprocess audio for better recognition"""
        try:
            # Load audio
            audio = AudioSegment.from_file(io.BytesIO(audio_data), format=input_format)
            
            # Audio enhancement
            # Normalize volume
            audio = audio.normalize()
            
            # Remove silence from beginning and end
            audio = audio.strip_silence(silence_thresh=-40)  # dBFS
            
            # Convert to mono if stereo
            if audio.channels > 1:
                audio = audio.set_channels(1)
            
            # Set sample rate to 16kHz (optimal for speech recognition)
            audio = audio.set_frame_rate(16000)
            
            # Get duration
            duration = len(audio) / 1000.0  # seconds
            
            # Export as WAV bytes
            output_buffer = io.BytesIO()
            audio.export(output_buffer, format='wav')
            output_buffer.seek(0)
            
            return output_buffer.read(), duration
            
        except Exception as e:
            raise ValueError(f"Audio preprocessing failed: {e}")
    
    def transcribe_with_whisper(self, audio_data: bytes, language: Optional[str] = None) -> TranscriptionResult:
        """Transcribe audio using Whisper"""
        if not self.whisper_model:
            raise RuntimeError("Whisper model not available")
        
        import time
        start_time = time.time()
        
        try:
            # Save audio to temporary file (Whisper requires file path)
            with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as temp_file:
                temp_file.write(audio_data)
                temp_file_path = temp_file.name
            
            try:
                # Transcribe
                result = self.whisper_model.transcribe(
                    temp_file_path,
                    language=language,
                    task='transcribe'
                )
                
                processing_time = time.time() - start_time
                
                # Get audio duration
                audio_segment = AudioSegment.from_wav(temp_file_path)
                audio_duration = len(audio_segment) / 1000.0
                
                return TranscriptionResult(
                    text=result['text'].strip(),
                    language=result.get('language', 'unknown'),
                    confidence=0.9,  # Whisper doesn't provide confidence scores
                    processing_time=processing_time,
                    audio_duration=audio_duration,
                    method='whisper'
                )
                
            finally:
                # Clean up temporary file
                os.unlink(temp_file_path)
                
        except Exception as e:
            raise RuntimeError(f"Whisper transcription failed: {e}")
    
    def transcribe_with_speech_recognition(self, audio_data: bytes) -> TranscriptionResult:
        """Transcribe audio using SpeechRecognition library"""
        import time
        start_time = time.time()
        
        try:
            # Convert audio data to AudioData object
            with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as temp_file:
                temp_file.write(audio_data)
                temp_file_path = temp_file.name
            
            try:
                with sr.AudioFile(temp_file_path) as source:
                    audio = self.sr_recognizer.record(source)
                
                # Get audio duration
                audio_segment = AudioSegment.from_wav(temp_file_path)
                audio_duration = len(audio_segment) / 1000.0
                
                # Try different recognition services
                text = ""
                confidence = 0.0
                
                try:
                    # Try Google Web Speech API (free tier)
                    result = self.sr_recognizer.recognize_google(audio, show_all=True)
                    if result and 'alternative' in result:
                        best_result = result['alternative'][0]
                        text = best_result.get('transcript', '')
                        confidence = best_result.get('confidence', 0.8)
                except:
                    try:
                        # Fallback to Google without confidence
                        text = self.sr_recognizer.recognize_google(audio)
                        confidence = 0.7
                    except:
                        raise RuntimeError("All speech recognition services failed")
                
                processing_time = time.time() - start_time
                
                return TranscriptionResult(
                    text=text.strip(),
                    language='en',  # SpeechRecognition defaults to English
                    confidence=confidence,
                    processing_time=processing_time,
                    audio_duration=audio_duration,
                    method='speech_recognition'
                )
                
            finally:
                os.unlink(temp_file_path)
                
        except Exception as e:
            raise RuntimeError(f"SpeechRecognition transcription failed: {e}")
    
    def transcribe_audio(self, audio_data: bytes, input_format: str = 'wav', 
                        language: Optional[str] = None, prefer_whisper: bool = True) -> TranscriptionResult:
        """
        Main transcription method with fallback support
        
        Args:
            audio_data: Raw audio bytes
            input_format: Input audio format
            language: Target language (ISO code)
            prefer_whisper: Whether to try Whisper first
        """
        try:
            # Validate format
            if input_format.lower() not in self.supported_formats:
                raise ValueError(f"Unsupported audio format: {input_format}")
            
            # Preprocess audio
            processed_audio, duration = self.preprocess_audio(audio_data, input_format)
            
            # Try transcription methods
            if prefer_whisper and self.whisper_model:
                try:
                    return self.transcribe_with_whisper(processed_audio, language)
                except Exception as e:
                    print(f"Whisper failed, falling back to SpeechRecognition: {e}")
            
            # Fallback to SpeechRecognition
            return self.transcribe_with_speech_recognition(processed_audio)
            
        except Exception as e:
            # Return empty result with error info
            return TranscriptionResult(
                text="",
                language="unknown",
                confidence=0.0,
                processing_time=0.0,
                audio_duration=0.0,
                method=f"error: {str(e)}"
            )
    
    def transcribe_file(self, file_path: str, language: Optional[str] = None) -> TranscriptionResult:
        """Transcribe audio from file path"""
        try:
            # Determine format from file extension
            file_format = os.path.splitext(file_path)[1][1:].lower()
            
            # Read file
            with open(file_path, 'rb') as f:
                audio_data = f.read()
            
            return self.transcribe_audio(audio_data, file_format, language)
            
        except Exception as e:
            return TranscriptionResult(
                text="",
                language="unknown", 
                confidence=0.0,
                processing_time=0.0,
                audio_duration=0.0,
                method=f"file_error: {str(e)}"
            )
    
    def batch_transcribe(self, audio_files: List[str], language: Optional[str] = None) -> List[TranscriptionResult]:
        """Transcribe multiple audio files"""
        results = []
        for file_path in audio_files:
            result = self.transcribe_file(file_path, language)
            results.append(result)
        return results
    
    def get_supported_languages(self) -> List[str]:
        """Get list of supported language codes"""
        return list(self.language_codes.keys())
    
    def validate_audio(self, audio_data: bytes, input_format: str) -> Dict[str, Union[bool, str, float]]:
        """Validate audio data and return metadata"""
        try:
            audio = AudioSegment.from_file(io.BytesIO(audio_data), format=input_format)
            
            duration = len(audio) / 1000.0  # seconds
            sample_rate = audio.frame_rate
            channels = audio.channels
            
            # Basic validation
            is_valid = True
            issues = []
            
            if duration < 0.5:
                issues.append("Audio too short (< 0.5 seconds)")
            elif duration > 300:  # 5 minutes
                issues.append("Audio too long (> 5 minutes)")
            
            if sample_rate < 8000:
                issues.append("Sample rate too low (< 8kHz)")
            
            if duration < 1.0:
                is_valid = False
            
            return {
                "is_valid": is_valid,
                "duration": duration,
                "sample_rate": sample_rate,
                "channels": channels,
                "issues": issues,
                "format": input_format
            }
            
        except Exception as e:
            return {
                "is_valid": False,
                "error": str(e),
                "duration": 0.0,
                "sample_rate": 0,
                "channels": 0,
                "issues": [f"Invalid audio format: {e}"],
                "format": input_format
            }