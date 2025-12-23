import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Maximize2, X } from 'lucide-react';
import './ChatbotUI.css';

const ChatbotUI = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant powered by Groq. How can I help?", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Map messages to the format Groq expects (role and content)
      const apiMessages = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));
      apiMessages.push({ role: 'user', content: input });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: data.text || "Sorry, I encountered an error.", sender: 'bot' },
      ]);
    } catch (error) {
      console.error("Error calling Groq:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container-wrapper">
      <div className="chat-card">
        <div className="chat-header">
          <div className="bot-info">
            <div className="bot-avatar"><Bot size={22} /></div>
            <div>
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Groq AI</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="status-dot"></span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Online</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', color: '#9ca3af' }}>
            <Maximize2 size={18} style={{ cursor: 'pointer' }} />
            <X size={18} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        <div ref={scrollRef} className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-row ${msg.sender}`}>
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}
          {isLoading && (
            <div className="message-row bot">
              <div className="message-bubble" style={{ fontStyle: 'italic', opacity: 0.7 }}>
                Thinking...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="chat-input-form">
          <div className="input-wrapper">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isLoading ? "Waiting for response..." : "Type your message..."}
              disabled={isLoading}
              style={{ paddingLeft: '16px' }}
            />
            <button type="submit" className="send-button" disabled={isLoading}>
              <Send size={18} />
            </button>
          </div>
          <div style={{ textAlign: 'center', fontSize: '10px', color: '#9ca3af', marginTop: '8px' }}>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatbotUI;