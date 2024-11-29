# test_chat.py
from chat import chat

def test_chat():
    user_input = "Hello, how are you?"
    response, chat_history_ids = chat(user_input)
    assert isinstance(response, str)
    assert response != ""
    assert chat_history_ids is not None

if __name__ == "__main__":
    test_chat()
    print("Test passed!")