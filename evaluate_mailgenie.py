import os
print("Current working directory:", os.getcwd())

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_recall_fscore_support, confusion_matrix, ConfusionMatrixDisplay
from sklearn.pipeline import Pipeline

df = pd.read_json("data/prompts.json")

X = df['prompt']      
y = df['category']     

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = Pipeline([
    ('tfidf', TfidfVectorizer(stop_words='english')),
    ('clf', LogisticRegression(max_iter=1000))
])

model.fit(X_train, y_train)
y_pred = model.predict(X_test)

acc = accuracy_score(y_test, y_pred)
prec, rec, f1, _ = precision_recall_fscore_support(y_test, y_pred, average='weighted')

print("\n📊 Evaluation Results:")
print(f"Accuracy  : {acc:.2f}")
print(f"Precision : {prec:.2f}")
print(f"Recall    : {rec:.2f}")
print(f"F1-score  : {f1:.2f}")

cm = confusion_matrix(y_test, y_pred, labels=model.classes_)
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=model.classes_)
disp.plot(cmap='Blues', xticks_rotation=45)
plt.title("Confusion Matrix - MailGenie Intent Classifier")
plt.tight_layout()
plt.savefig("confusion_matrix.png", dpi=300)
plt.show()

metrics = pd.DataFrame({
    'Metric': ['Accuracy', 'Precision', 'Recall', 'F1-score'],
    'Score': [acc, prec, rec, f1]
})

sns.barplot(x='Metric', y='Score', data=metrics)
plt.title("Model Performance Metrics")
plt.ylim(0, 1)
plt.tight_layout()
plt.savefig("performance_metrics.png", dpi=300)
plt.show()

print("\n✅ Confusion matrix and performance graphs saved as:")
print("  - confusion_matrix.png")
print("  - performance_metrics.png")