import os
import tensorflow as tf
import numpy as np

def train_model():
    try:
        # Print TensorFlow version
        print(f"Using TensorFlow version: {tf.__version__}")

        # Dummy training data
        x_train = np.array([[1], [2], [3], [4]], dtype=float)
        y_train = np.array([[1], [3], [5], [7]], dtype=float)

        # Define the model
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(units=1, input_shape=[1])
        ])

        # Compile the model
        model.compile(optimizer='sgd', loss='mean_squared_error')

        print("Training the model...")
        # Train the model
        model.fit(x_train, y_train, epochs=500, verbose=1)

        # Ensure the 'models' directory exists
        output_dir = 'models'
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        # Save the model
        model_path = os.path.join(output_dir, 'task_priority_model.h5')
        model.save(model_path)
        print(f"Model saved at: {model_path}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    train_model()