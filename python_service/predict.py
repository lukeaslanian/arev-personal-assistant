from tensorflow.keras.models import load_model
import numpy as np

model = load_model('models/task_priority_model.h5')

def predict_priority(features):
    prediction = model.predict(np.array([features]))
    return float(prediction[0][0])
