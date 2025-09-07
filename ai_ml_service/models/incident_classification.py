"""
Incident classification model using Hugging Face Transformers
Classifies incident reports into categories with severity scoring
"""

import torch
from transformers import (
    AutoTokenizer, AutoModelForSequenceClassification,
    TrainingArguments, Trainer, pipeline
)
import numpy as np
from typing import List, Dict, Tuple, Optional
from dataclasses import dataclass
import re
from datetime import datetime


@dataclass
class IncidentReport:
    """Incident report data structure"""
    tourist_id: str
    description: str
    timestamp: datetime
    language: str = "en"
    location: Optional[Tuple[float, float]] = None  # (lat, lng)


@dataclass
class ClassificationResult:
    """Result from incident classification"""
    category: str
    confidence: float
    severity_score: float
    multilingual_detected: bool
    processing_details: Dict


class IncidentClassifier:
    """Hugging Face-based incident report classifier"""
    
    def __init__(self, model_name: str = "distilbert-base-multilingual-cased", device: str = 'cpu'):
        self.device = torch.device(device)
        self.model_name = model_name
        self.tokenizer = None
        self.model = None
        self.classifier_pipeline = None
        
        # Incident categories
        self.categories = [
            "Medical Emergency",
            "Theft", 
            "Missing Person",
            "Harassment",
            "Other"
        ]
        
        # Severity weights for each category
        self.severity_weights = {
            "Medical Emergency": 0.9,
            "Theft": 0.6,
            "Missing Person": 0.8,
            "Harassment": 0.7,
            "Other": 0.4
        }
        
        # Keywords for enhanced classification
        self.category_keywords = {
            "Medical Emergency": [
                "emergency", "urgent", "ambulance", "hospital", "injured", "hurt", "pain",
                "heart attack", "accident", "bleeding", "unconscious", "sick", "medical",
                "doctor", "help", "emergency", "urgente", "médico", "hospital", "doktor"
            ],
            "Theft": [
                "stolen", "robbed", "theft", "pickpocket", "burglar", "stolen", "money",
                "wallet", "purse", "phone", "camera", "bag", "robado", "robo", "gestohlen"
            ],
            "Missing Person": [
                "missing", "lost", "disappeared", "can't find", "looking for", "search",
                "gone", "vanished", "perdido", "desaparecido", "vermisst", "disparu"
            ],
            "Harassment": [
                "harassment", "bothering", "following", "stalking", "inappropriate",
                "uncomfortable", "scared", "threatened", "acoso", "molestia", "belästigung"
            ],
            "Other": [
                "general", "other", "misc", "help", "assistance", "otro", "autre", "andere"
            ]
        }
        
        self._initialize_model()
    
    def _initialize_model(self):
        """Initialize the model and tokenizer"""
        try:
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
            self.model = AutoModelForSequenceClassification.from_pretrained(
                self.model_name,
                num_labels=len(self.categories)
            )
            self.model.to(self.device)
            
            # Create classification pipeline
            self.classifier_pipeline = pipeline(
                "text-classification",
                model=self.model,
                tokenizer=self.tokenizer,
                device=0 if self.device.type == 'cuda' else -1,
                return_all_scores=True
            )
            
        except Exception as e:
            print(f"Error initializing model: {e}")
            # Fallback to a simpler approach
            self._initialize_fallback()
    
    def _initialize_fallback(self):
        """Initialize with a pre-trained sentiment model as fallback"""
        try:
            self.classifier_pipeline = pipeline(
                "text-classification",
                model="cardiffnlp/twitter-roberta-base-sentiment-latest",
                return_all_scores=True
            )
        except Exception as e:
            print(f"Fallback initialization failed: {e}")
            self.classifier_pipeline = None
    
    def preprocess_text(self, text: str) -> str:
        """Preprocess incident report text"""
        # Convert to lowercase
        text = text.lower().strip()
        
        # Remove excessive whitespace
        text = re.sub(r'\s+', ' ', text)
        
        # Remove special characters but keep basic punctuation
        text = re.sub(r'[^\w\s.,!?-]', '', text)
        
        return text
    
    def detect_language(self, text: str) -> str:
        """Simple language detection based on keywords"""
        text_lower = text.lower()
        
        # Spanish keywords
        spanish_keywords = ["ayuda", "urgente", "médico", "hospital", "robado", "perdido", "acoso"]
        spanish_count = sum(1 for word in spanish_keywords if word in text_lower)
        
        # French keywords  
        french_keywords = ["aide", "urgent", "médecin", "hôpital", "volé", "perdu", "harcèlement"]
        french_count = sum(1 for word in french_keywords if word in text_lower)
        
        # German keywords
        german_keywords = ["hilfe", "notfall", "arzt", "krankenhaus", "gestohlen", "vermisst"]
        german_count = sum(1 for word in german_keywords if word in text_lower)
        
        if spanish_count > 0:
            return "es"
        elif french_count > 0:
            return "fr"
        elif german_count > 0:
            return "de"
        else:
            return "en"
    
    def keyword_based_classification(self, text: str) -> Dict[str, float]:
        """Fallback classification using keyword matching"""
        text_lower = text.lower()
        scores = {}
        
        for category, keywords in self.category_keywords.items():
            score = 0.0
            for keyword in keywords:
                if keyword in text_lower:
                    score += 1.0
            
            # Normalize by number of keywords
            scores[category] = score / len(keywords)
        
        # Ensure we have some classification
        if all(score == 0 for score in scores.values()):
            scores["Other"] = 1.0
        
        return scores
    
    def classify_incident(self, report: IncidentReport) -> ClassificationResult:
        """
        Classify an incident report
        """
        try:
            # Preprocess text
            processed_text = self.preprocess_text(report.description)
            
            # Detect language
            detected_language = self.detect_language(processed_text)
            multilingual_detected = detected_language != "en"
            
            # Classification
            if self.classifier_pipeline:
                try:
                    # Use transformer model
                    predictions = self.classifier_pipeline(processed_text)
                    
                    # If using a general model, map to our categories
                    category_scores = self._map_predictions_to_categories(predictions, processed_text)
                    
                except Exception as e:
                    print(f"Pipeline classification failed: {e}")
                    # Fall back to keyword-based
                    category_scores = self.keyword_based_classification(processed_text)
            else:
                # Use keyword-based classification
                category_scores = self.keyword_based_classification(processed_text)
            
            # Get best category
            best_category = max(category_scores.keys(), key=lambda k: category_scores[k])
            confidence = category_scores[best_category]
            
            # Calculate severity score
            severity_score = self._calculate_severity(
                category=best_category,
                confidence=confidence,
                text=processed_text,
                report=report
            )
            
            processing_details = {
                "detected_language": detected_language,
                "original_text": report.description,
                "processed_text": processed_text,
                "category_scores": category_scores,
                "classification_method": "transformer" if self.classifier_pipeline else "keyword"
            }
            
            return ClassificationResult(
                category=best_category,
                confidence=confidence,
                severity_score=severity_score,
                multilingual_detected=multilingual_detected,
                processing_details=processing_details
            )
            
        except Exception as e:
            # Error handling
            return ClassificationResult(
                category="Other",
                confidence=0.1,
                severity_score=0.5,
                multilingual_detected=False,
                processing_details={"error": str(e)}
            )
    
    def _map_predictions_to_categories(self, predictions: List[Dict], text: str) -> Dict[str, float]:
        """Map general model predictions to our specific categories"""
        # If predictions are from a sentiment model, use keyword-based as primary
        keyword_scores = self.keyword_based_classification(text)
        
        # Boost scores based on sentiment if available
        if predictions and len(predictions) > 0:
            # Assuming predictions is a list of {label, score} dicts
            sentiment_boost = 0.0
            for pred in predictions:
                if 'NEGATIVE' in pred.get('label', '').upper():
                    sentiment_boost = pred.get('score', 0) * 0.3
                    break
            
            # Apply sentiment boost to emergency categories
            emergency_categories = ["Medical Emergency", "Theft", "Missing Person", "Harassment"]
            for category in emergency_categories:
                if category in keyword_scores:
                    keyword_scores[category] += sentiment_boost
        
        return keyword_scores
    
    def _calculate_severity(self, category: str, confidence: float, text: str, report: IncidentReport) -> float:
        """Calculate severity score based on multiple factors"""
        # Base severity from category
        base_severity = self.severity_weights.get(category, 0.5)
        
        # Adjust based on confidence
        confidence_factor = min(confidence * 1.2, 1.0)
        
        # Urgency keywords boost
        urgency_keywords = ["emergency", "urgent", "immediate", "help", "sos", "now", "quickly"]
        urgency_boost = 0.0
        text_lower = text.lower()
        for keyword in urgency_keywords:
            if keyword in text_lower:
                urgency_boost += 0.1
        urgency_boost = min(urgency_boost, 0.3)
        
        # Time factor (recent reports might be more urgent)
        time_factor = 0.0
        if report.timestamp:
            hours_ago = (datetime.now() - report.timestamp).total_seconds() / 3600
            if hours_ago < 1:
                time_factor = 0.2
            elif hours_ago < 6:
                time_factor = 0.1
        
        # Combine factors
        final_severity = min(
            base_severity * confidence_factor + urgency_boost + time_factor,
            1.0
        )
        
        return final_severity
    
    def batch_classify(self, reports: List[IncidentReport]) -> List[ClassificationResult]:
        """Classify multiple incident reports"""
        return [self.classify_incident(report) for report in reports]
    
    def get_category_statistics(self, results: List[ClassificationResult]) -> Dict:
        """Get statistics from classification results"""
        if not results:
            return {}
        
        category_counts = {}
        severity_by_category = {}
        
        for result in results:
            category = result.category
            category_counts[category] = category_counts.get(category, 0) + 1
            
            if category not in severity_by_category:
                severity_by_category[category] = []
            severity_by_category[category].append(result.severity_score)
        
        # Calculate averages
        avg_severity = {}
        for category, severities in severity_by_category.items():
            avg_severity[category] = sum(severities) / len(severities)
        
        return {
            "total_reports": len(results),
            "category_counts": category_counts,
            "average_severity_by_category": avg_severity,
            "overall_average_severity": sum(r.severity_score for r in results) / len(results)
        }
    
    def save_model(self, path: str):
        """Save the fine-tuned model"""
        if self.model and self.tokenizer:
            self.model.save_pretrained(path)
            self.tokenizer.save_pretrained(path)
    
    def load_model(self, path: str):
        """Load a fine-tuned model"""
        try:
            self.tokenizer = AutoTokenizer.from_pretrained(path)
            self.model = AutoModelForSequenceClassification.from_pretrained(path)
            self.model.to(self.device)
            
            # Recreate pipeline
            self.classifier_pipeline = pipeline(
                "text-classification",
                model=self.model,
                tokenizer=self.tokenizer,
                device=0 if self.device.type == 'cuda' else -1,
                return_all_scores=True
            )
        except Exception as e:
            print(f"Error loading model: {e}")
            self._initialize_fallback()