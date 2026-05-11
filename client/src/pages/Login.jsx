import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await authAPI.login(form);
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'radial-gradient(ellipse at top, #0d2818 0%, #0a1628 60%)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🌾</div>
          <h1 className="text-white text-2xl font-bold">Smart Farming</h1>
          <p className="text-gray-400 text-sm mt-1">Your AI-powered agriculture companion</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-3xl p-6">
          <h2 className="text-white font-semibold text-lg mb-5">Welcome back</h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-2xl mb-4"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="farmer@example.com"
                required
                className="w-full glass rounded-2xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-green-500/50 transition-all"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
                className="w-full glass rounded-2xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-green-500/50 transition-all"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3.5 rounded-2xl mt-2 disabled:opacity-60 transition-all shadow-lg shadow-green-500/20"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-5">
            New to Smart Farming?{' '}
            <Link to="/register" className="text-green-400 font-medium">Create account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
