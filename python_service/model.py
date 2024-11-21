import tensorflow as tf
import numpy as np

def train_model():
    # Dummy training data
    x_train = np.array([[1], [2], [3], [4]], dtype=float)
    y_train = np.array([[1], [3], [5], [7]], dtype=float)

    model = tf.keras.Sequential([
        tf.keras.layers.Dense(units=1, input_shape=[1])
    ])

    model.compile(optimizer='sgd', loss='mean_squared_error')
    model.fit(x_train, y_train, epochs=500)

    model.save('models/task_priority_model.h5')

if __name__ == '__main__':
    train_model()
