// frontend/src/components/Chat.tsx
import React, { useState } from 'react';
import axios from 'axios';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const sendMessage = async () => {
    const response = await axios.post<{ response: string }>('http://python-service:5000/chat', { message });
    setChatHistory([...chatHistory, `You: ${message}`, `Arev: ${response.data.response}`]);
    setMessage('');
  };

  return (
    <div>
      <h2>Chat with Arev</h2>
      <div>
        {chatHistory.map((chat, index) => (
          <p key={index}>{chat}</p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
