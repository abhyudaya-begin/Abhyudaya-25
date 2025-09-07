"""
Training utilities for anomaly detection and incident classification models
"""

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import numpy as np
import pandas as pd
from typing import List, Tuple, Dict, Optional
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import os

from models.anomaly_detection import LSTMAnomalyDetector, LocationPoint
from models.incident_classification import IncidentClassifier, IncidentReport


class GPSDataset(Dataset):
    """Dataset class for GPS anomaly detection training"""
    
    def __init__(self, sequences: List[np.ndarray], labels: List[int], sequence_length: int = 50):
        self.sequences = sequences
        self.labels = labels
        self.sequence_length = sequence_length
    
    def __len__(self):
        return len(self.sequences)
    
    def __getitem__(self, idx):
        sequence = self.sequences[idx]
        label = self.labels[idx]
        
        # Pad or truncate sequence to fixed length
        if len(sequence) > self.sequence_length:
            sequence = sequence[-self.sequence_length:]
        else:
            padding = np.zeros((self.sequence_length - len(sequence), sequence.shape[1]))
            sequence = np.vstack([padding, sequence])
        
        return torch.FloatTensor(sequence), torch.FloatTensor([label])


class AnomalyDetectionTrainer:
    """Trainer for GPS anomaly detection model"""
    
    def __init__(self, model: LSTMAnomalyDetector, device: str = 'cpu'):
        self.model = model
        self.device = torch.device(device)
        self.model.to(self.device)
        
        # Training history
        self.train_losses = []
        self.val_losses = []
        self.train_accuracies = []
        self.val_accuracies = []
    
    def prepare_data(self, df: pd.DataFrame, sequence_length: int = 50) -> Tuple[List, List]:
        """Prepare training data from DataFrame"""
        sequences = []
        labels = []
        
        # Group by tourist_id
        for tourist_id in df['tourist_id'].unique():
            tourist_data = df[df['tourist_id'] == tourist_id].sort_values('timestamp')
            
            if len(tourist_data) < 10:  # Skip short sequences
                continue
            
            # Extract features [lat, lng, speed, time_diff]
            features = []
            for i, row in tourist_data.iterrows():
                if i == tourist_data.index[0]:
                    features.append([row['lat'], row['lng'], 0.0, 0.0])
                else:
                    prev_row = tourist_data.loc[tourist_data.index[tourist_data.index.get_loc(i)-1]]
                    
                    # Calculate speed and time difference
                    time_diff = (pd.to_datetime(row['timestamp']) - pd.to_datetime(prev_row['timestamp'])).total_seconds()
                    distance = self._haversine_distance(
                        prev_row['lat'], prev_row['lng'], row['lat'], row['lng']
                    )
                    speed = (distance / time_diff) * 3.6 if time_diff > 0 else 0.0
                    
                    features.append([row['lat'], row['lng'], speed, time_diff])
            
            features = np.array(features)
            label = tourist_data['is_anomaly'].iloc[0]  # Assuming same label for entire sequence
            
            sequences.append(features)
            labels.append(int(label))
        
        return sequences, labels
    
    def _haversine_distance(self, lat1: float, lng1: float, lat2: float, lng2: float) -> float:
        """Calculate distance between two GPS points in meters"""
        from math import radians, cos, sin, asin, sqrt
        
        lat1, lng1, lat2, lng2 = map(radians, [lat1, lng1, lat2, lng2])
        dlat = lat2 - lat1
        dlng = lng2 - lng1
        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlng/2)**2
        c = 2 * asin(sqrt(a))
        r = 6371000
        return c * r
    
    def train(self, train_data: pd.DataFrame, val_data: pd.DataFrame, 
              epochs: int = 50, batch_size: int = 32, learning_rate: float = 0.001):
        """Train the anomaly detection model"""
        
        # Prepare datasets
        train_sequences, train_labels = self.prepare_data(train_data)
        val_sequences, val_labels = self.prepare_data(val_data)
        
        train_dataset = GPSDataset(train_sequences, train_labels)
        val_dataset = GPSDataset(val_sequences, val_labels)
        
        train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
        val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
        
        # Loss and optimizer
        criterion = nn.BCELoss()
        optimizer = optim.Adam(self.model.parameters(), lr=learning_rate)
        scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=10, gamma=0.8)
        
        print(f"Starting training for {epochs} epochs...")
        
        for epoch in range(epochs):
            # Training phase
            self.model.train()
            train_loss = 0.0
            train_correct = 0
            train_total = 0
            
            for batch_sequences, batch_labels in train_loader:
                batch_sequences = batch_sequences.to(self.device)
                batch_labels = batch_labels.to(self.device)
                
                optimizer.zero_grad()
                
                # Forward pass
                predictions, anomaly_scores = self.model(batch_sequences)
                loss = criterion(anomaly_scores, batch_labels)
                
                # Backward pass
                loss.backward()
                optimizer.step()
                
                train_loss += loss.item()
                
                # Calculate accuracy
                predicted = (anomaly_scores > 0.5).float()
                train_total += batch_labels.size(0)
                train_correct += (predicted == batch_labels).sum().item()
            
            # Validation phase
            self.model.eval()
            val_loss = 0.0
            val_correct = 0
            val_total = 0
            
            with torch.no_grad():
                for batch_sequences, batch_labels in val_loader:
                    batch_sequences = batch_sequences.to(self.device)
                    batch_labels = batch_labels.to(self.device)
                    
                    predictions, anomaly_scores = self.model(batch_sequences)
                    loss = criterion(anomaly_scores, batch_labels)
                    
                    val_loss += loss.item()
                    
                    predicted = (anomaly_scores > 0.5).float()
                    val_total += batch_labels.size(0)
                    val_correct += (predicted == batch_labels).sum().item()
            
            # Calculate metrics
            train_loss_avg = train_loss / len(train_loader)
            val_loss_avg = val_loss / len(val_loader)
            train_acc = train_correct / train_total
            val_acc = val_correct / val_total
            
            # Store history
            self.train_losses.append(train_loss_avg)
            self.val_losses.append(val_loss_avg)
            self.train_accuracies.append(train_acc)
            self.val_accuracies.append(val_acc)
            
            # Update learning rate
            scheduler.step()
            
            if epoch % 5 == 0:
                print(f"Epoch {epoch+1}/{epochs}:")
                print(f"  Train Loss: {train_loss_avg:.4f}, Train Acc: {train_acc:.4f}")
                print(f"  Val Loss: {val_loss_avg:.4f}, Val Acc: {val_acc:.4f}")
                print(f"  Learning Rate: {scheduler.get_last_lr()[0]:.6f}")
    
    def evaluate(self, test_data: pd.DataFrame) -> Dict:
        """Evaluate the model on test data"""
        test_sequences, test_labels = self.prepare_data(test_data)
        test_dataset = GPSDataset(test_sequences, test_labels)
        test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)
        
        self.model.eval()
        all_predictions = []
        all_labels = []
        
        with torch.no_grad():
            for batch_sequences, batch_labels in test_loader:
                batch_sequences = batch_sequences.to(self.device)
                
                predictions, anomaly_scores = self.model(batch_sequences)
                predicted = (anomaly_scores > 0.5).float()
                
                all_predictions.extend(predicted.cpu().numpy())
                all_labels.extend(batch_labels.cpu().numpy())
        
        # Calculate metrics
        from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
        
        accuracy = accuracy_score(all_labels, all_predictions)
        precision = precision_score(all_labels, all_predictions)
        recall = recall_score(all_labels, all_predictions)
        f1 = f1_score(all_labels, all_predictions)
        
        return {
            'accuracy': accuracy,
            'precision': precision,
            'recall': recall,
            'f1_score': f1,
            'confusion_matrix': confusion_matrix(all_labels, all_predictions)
        }
    
    def plot_training_history(self, save_path: Optional[str] = None):
        """Plot training history"""
        fig, ((ax1, ax2)) = plt.subplots(1, 2, figsize=(12, 4))
        
        # Loss plot
        ax1.plot(self.train_losses, label='Train Loss')
        ax1.plot(self.val_losses, label='Validation Loss')
        ax1.set_title('Model Loss')
        ax1.set_xlabel('Epoch')
        ax1.set_ylabel('Loss')
        ax1.legend()
        
        # Accuracy plot
        ax2.plot(self.train_accuracies, label='Train Accuracy')
        ax2.plot(self.val_accuracies, label='Validation Accuracy')
        ax2.set_title('Model Accuracy')
        ax2.set_xlabel('Epoch')
        ax2.set_ylabel('Accuracy')
        ax2.legend()
        
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path)
        plt.show()


class IncidentClassificationTrainer:
    """Trainer for incident classification model"""
    
    def __init__(self, classifier: IncidentClassifier):
        self.classifier = classifier
        self.training_history = []
    
    def prepare_training_data(self, df: pd.DataFrame) -> Tuple[List[IncidentReport], List[str]]:
        """Prepare training data from DataFrame"""
        reports = []
        true_categories = []
        
        for _, row in df.iterrows():
            report = IncidentReport(
                tourist_id=row['tourist_id'],
                description=row['description'],
                timestamp=pd.to_datetime(row['timestamp']),
                language=row.get('language', 'en')
            )
            reports.append(report)
            
            # Extract true category (you'll need to add this to your dataset)
            true_category = row.get('true_category', 'Other')
            true_categories.append(true_category)
        
        return reports, true_categories
    
    def evaluate_classification(self, test_df: pd.DataFrame) -> Dict:
        """Evaluate classification performance"""
        test_reports, true_categories = self.prepare_training_data(test_df)
        
        # Get predictions
        predictions = []
        confidences = []
        severity_scores = []
        
        for report in test_reports:
            result = self.classifier.classify_incident(report)
            predictions.append(result.category)
            confidences.append(result.confidence)
            severity_scores.append(result.severity_score)
        
        # Calculate metrics
        from sklearn.metrics import classification_report, accuracy_score
        
        accuracy = accuracy_score(true_categories, predictions)
        report = classification_report(true_categories, predictions, output_dict=True)
        
        return {
            'accuracy': accuracy,
            'classification_report': report,
            'predictions': predictions,
            'confidences': confidences,
            'severity_scores': severity_scores,
            'true_categories': true_categories
        }
    
    def plot_confusion_matrix(self, true_categories: List[str], predictions: List[str], 
                            save_path: Optional[str] = None):
        """Plot confusion matrix"""
        from sklearn.metrics import confusion_matrix
        
        cm = confusion_matrix(true_categories, predictions)
        
        plt.figure(figsize=(10, 8))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                   xticklabels=self.classifier.categories,
                   yticklabels=self.classifier.categories)
        plt.title('Incident Classification Confusion Matrix')
        plt.xlabel('Predicted Category')
        plt.ylabel('True Category')
        
        if save_path:
            plt.savefig(save_path)
        plt.show()
    
    def analyze_category_performance(self, evaluation_results: Dict) -> pd.DataFrame:
        """Analyze performance by category"""
        report = evaluation_results['classification_report']
        
        category_stats = []
        for category in self.classifier.categories:
            if category in report:
                stats = report[category]
                category_stats.append({
                    'category': category,
                    'precision': stats['precision'],
                    'recall': stats['recall'],
                    'f1_score': stats['f1-score'],
                    'support': stats['support']
                })
        
        return pd.DataFrame(category_stats)


def create_training_pipeline(data_dir: str, model_save_dir: str):
    """Complete training pipeline for both models"""
    os.makedirs(model_save_dir, exist_ok=True)
    
    print("Loading datasets...")
    
    # Load location data
    location_df = pd.read_csv(os.path.join(data_dir, 'location_data.csv'))
    
    # Load incident data
    incident_df = pd.read_csv(os.path.join(data_dir, 'incident_reports.csv'))
    
    # Split data
    train_loc, test_loc = train_test_split(location_df, test_size=0.2, random_state=42)
    train_loc, val_loc = train_test_split(train_loc, test_size=0.2, random_state=42)
    
    train_inc, test_inc = train_test_split(incident_df, test_size=0.2, random_state=42)
    
    print("Training anomaly detection model...")
    
    # Train anomaly detection model
    anomaly_model = LSTMAnomalyDetector()
    anomaly_trainer = AnomalyDetectionTrainer(anomaly_model)
    
    anomaly_trainer.train(train_loc, val_loc, epochs=30)
    anomaly_results = anomaly_trainer.evaluate(test_loc)
    
    print("Anomaly Detection Results:")
    print(f"Accuracy: {anomaly_results['accuracy']:.4f}")
    print(f"Precision: {anomaly_results['precision']:.4f}")
    print(f"Recall: {anomaly_results['recall']:.4f}")
    print(f"F1-Score: {anomaly_results['f1_score']:.4f}")
    
    # Save anomaly model
    anomaly_model_path = os.path.join(model_save_dir, 'anomaly_detector.pth')
    torch.save(anomaly_model.state_dict(), anomaly_model_path)
    
    # Plot training history
    anomaly_trainer.plot_training_history(
        os.path.join(model_save_dir, 'anomaly_training_history.png')
    )
    
    print("Training incident classification model...")
    
    # Train incident classification model
    incident_classifier = IncidentClassifier()
    incident_trainer = IncidentClassificationTrainer(incident_classifier)
    
    # Evaluate incident classification
    incident_results = incident_trainer.evaluate_classification(test_inc)
    
    print("Incident Classification Results:")
    print(f"Accuracy: {incident_results['accuracy']:.4f}")
    
    # Plot confusion matrix
    incident_trainer.plot_confusion_matrix(
        incident_results['true_categories'],
        incident_results['predictions'],
        os.path.join(model_save_dir, 'incident_confusion_matrix.png')
    )
    
    # Analyze performance by category
    category_performance = incident_trainer.analyze_category_performance(incident_results)
    print("\nCategory Performance:")
    print(category_performance)
    
    # Save incident classification model
    incident_model_path = os.path.join(model_save_dir, 'incident_classifier')
    incident_classifier.save_model(incident_model_path)
    
    print(f"Models saved to {model_save_dir}")
    
    return {
        'anomaly_results': anomaly_results,
        'incident_results': incident_results,
        'category_performance': category_performance
    }