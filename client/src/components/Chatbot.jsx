import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatAPI } from '../services/api';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm your AI farming assistant 🌾 Ask me about crops, irrigation, pests, or weather tips!" },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = async () => {
    const msg = input.trim();
    if (!msg) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: msg }]);
    setTyping(true);
    try {
      const { data } = await chatAPI.send(msg);
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [...prev, { role: 'bot', text: data.response }]);
      }, 600);
    } catch {
      setTyping(false);
      setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry, I had trouble connecting. Please try again.' }]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center text-2xl z-40"
      >
        🤖
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-x-0 bottom-0 z-50 flex justify-center"
          >
            <div className="w-full max-w-sm mx-auto">
              <div className="glass-card rounded-t-3xl overflow-hidden flex flex-col"
                style={{ height: '70vh' }}>
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-green-500/20 rounded-full flex items-center justify-center text-lg">🤖</div>
                    <div>
                      <p className="text-white font-semibold text-sm">Agri Assistant</p>
                      <p className="text-green-400 text-xs">Always online</p>
                    </div>
                  </div>
                  <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
                  {messages.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-green-500 text-white rounded-br-sm'
                          : 'glass text-gray-200 rounded-bl-sm'
                      }`}>
                        {m.text}
                      </div>
                    </motion.div>
                  ))}
                  {typing && (
                    <div className="flex justify-start">
                      <div className="glass px-4 py-3 rounded-2xl rounded-bl-sm">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -4, 0] }}
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

                {/* Input */}
                <div className="px-4 py-3 border-t border-white/10 flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && send()}
                    placeholder="Ask about farming..."
                    className="flex-1 glass rounded-2xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none"
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={send}
                    className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold"
                  >
                    ↑
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
