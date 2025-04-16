import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Initialize chat when first opened
  const initializeChat = async () => {
    if (sessionId === null) {
      try {
        setIsLoading(true);
        const res = await axios.get('https://pawcare-zgpy.onrender.com/start_chat');
        setSessionId(res.data.session_id);
        setMessages([{ text: res.data.reply, sender: 'bot' }]);
      } catch (err) {
        setMessages([{ 
          text: "Sorry, I'm having trouble connecting. Please try again later.", 
          sender: 'bot' 
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Toggle chat window
  const toggleChat = () => {
    setOpen(!open);
    if (!open && messages.length === 0) {
      initializeChat();
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Send message to backend and get response
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await axios.post('https://pawcare-zgpy.onrender.com/chat', { 
        message: input,
        session_id: sessionId
      });
      
      const botReply = { text: res.data.reply, sender: 'bot' };
      setMessages(prev => [...prev, botReply]);
      
      // Update session id if returned
      if (res.data.session_id) {
        setSessionId(res.data.session_id);
      }
    } catch (err) {
      setMessages(prev => [...prev, { 
        text: "Sorry, I couldn't process your request. Please try again.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="pawcare-chatbot-widget fixed bottom-5 right-5 z-50">
      {/* Chat toggle button */}
      <button 
        onClick={toggleChat} 
        className="pawcare-chatbot-toggle w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 focus:outline-none"
      >
        {open ? '×' : '💬'}
      </button>

      {/* Chat window */}
      {open && (
        <div className="pawcare-chatbot-window absolute bottom-20 right-0 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
          <div className="pawcare-chatbot-header p-3 bg-blue-500 text-white font-medium">
            <div className="flex items-center">
              <span role="img" aria-label="paw" className="mr-2">🐾</span>
              PawCare Assistant
            </div>
          </div>
          
          <div className="pawcare-chatbot-messages flex-1 p-3 overflow-y-auto">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`mb-3 ${msg.sender === 'user' ? 'text-right' : ''}`}
              >
                <div 
                  className={`inline-block px-4 py-2 rounded-lg max-w-3/4 break-words ${
                    msg.sender === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center text-gray-500 mb-3">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="ml-2 text-xs">PawCare is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="pawcare-chatbot-input p-3 border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                disabled={isLoading}
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
              />
              <button 
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className={`p-2 px-4 rounded-r-lg text-white focus:outline-none ${
                  isLoading || !input.trim() ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                Send
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1 text-center">
              Ask about adoption, donations, volunteering, and more!
            </div>
          </div>
        </div>
      )}

      {/* CSS for the typing indicator */}
      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          margin: 0 1px;
          background-color: #6b7280;
          border-radius: 50%;
          display: inline-block;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0);
          } 40% { 
            transform: scale(1.0);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingChatbot;