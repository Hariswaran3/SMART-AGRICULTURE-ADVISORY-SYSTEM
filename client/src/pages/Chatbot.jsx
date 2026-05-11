import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { chatAPI } from '../services/api';

const suggestions = [
  'Best crop for clay soil?',
  'How often should I irrigate wheat?',
  'Organic pest control tips',
  'Signs of nitrogen deficiency',
];

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your AI farming assistant 🌾\n\nI can help you with crop selection, irrigation schedules, pest control, soil health, and weather-based farming tips. What would you like to know?" },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = async (msg) => {
    const text = (msg || input).trim();
    if (!text) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setTyping(true);
    try {
      const { data } = await chatAPI.send(text);
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [...prev, { role: 'bot', text: data.response }]);
      }, 700);
    } catch {
      setTyping(false);
      setMessages((prev) => [...prev, { role: 'bot', text: 'Connection error. Please try again.' }]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full">AI Chat</span>
        </div>
        <h2 className="text-white text-xl font-bold">Agri Assistant</h2>
        <p className="text-gray-400 text-sm">Powered by smart farming AI</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 space-y-3 scrollbar-hide pb-3">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
          >
            {m.role === 'bot' && (
              <div className="w-7 h-7 bg-green-500/20 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                🤖
              </div>
            )}
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
              m.role === 'user'
                ? 'bg-green-500 text-white rounded-br-sm'
                : 'glass-card text-gray-200 rounded-bl-sm'
            }`}>
              {m.text}
            </div>
          </motion.div>
        ))}

        {typing && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 bg-green-500/20 rounded-full flex items-center justify-center text-sm">🤖</div>
            <div className="glass-card px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                    className="w-1.5 h-1.5 bg-green-400 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-5 pb-2">
          <p className="text-gray-500 text-xs mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <motion.button
                key={s}
                whileTap={{ scale: 0.95 }}
                onClick={() => send(s)}
                className="glass text-gray-300 text-xs px-3 py-1.5 rounded-full"
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-5 pb-4 pt-2 border-t border-white/10 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask about farming..."
          className="flex-1 glass rounded-2xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => send()}
          className="w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/20"
        >
          ↑
        </motion.button>
      </div>
    </div>
  );
};

export default ChatbotPage;
