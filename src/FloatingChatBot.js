import React, { useState } from 'react';
import axios from 'axios';

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [hasOpened, setHasOpened] = useState(false); // For the initial welcome message

  // Toggle chat window
  const toggleChat = () => {
    setOpen(!open);

    // Show a default welcome message when opened for the first time
    if (!hasOpened) {
      setMessages(prev => [
        ...prev,
        { text: "Hi there! I'm here to help with adoption, donations, volunteering, and more. Ask me anything!", sender: 'bot' }
      ]);
      setHasOpened(true);
    }
  };

  // Send message to backend and get response
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await axios.post('https://pawcare-zgpy.onrender.com/chat', { message: input });
      const botReply = { text: res.data.reply, sender: 'bot' };
      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      setMessages(prev => [...prev, { text: "Error reaching the server.", sender: 'bot' }]);
    }

    setInput('');
  };

  return (
    <div className={`pawcare-chatbot-widget ${open ? 'open' : ''}`}>
      {/* Chat toggle button */}
      <button onClick={toggleChat} className="pawcare-chatbot-toggle">
        {open ? '×' : '💬'}
      </button>

      {/* Chat window */}
      {open && (
        <div className="pawcare-chatbot-window">
          <div className="pawcare-chatbot-header">PawCare Chatbot</div>
          <div className="pawcare-chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`pawcare-chatbot-message ${msg.sender}`}>
                <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <div className="pawcare-chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatbot;
