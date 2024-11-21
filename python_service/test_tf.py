import tensorflow as tf

print('TensorFlow version:', tf.__version__)
print('Devices:', tf.config.list_physical_devices())

# Simple TensorFlow operation
a = tf.constant(2)
b = tf.constant(3)
c = a + b
print('Result of computation:', c.numpy())
