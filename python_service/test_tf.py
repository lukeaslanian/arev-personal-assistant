import tensorflow as tf

def test_tensorflow_version():
    assert tf.__version__ is not None

def test_list_physical_devices():
    devices = tf.config.list_physical_devices()
    assert len(devices) > 0

def test_tensorflow_operation():
    a = tf.constant(2)
    b = tf.constant(3)
    c = a + b
    assert c.numpy() == 5