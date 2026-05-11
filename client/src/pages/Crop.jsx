import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cropAPI } from '../services/api';

const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Silt', 'Black'];
const seasons = ['Summer', 'Winter', 'Monsoon', 'Spring'];

const yieldColor = { 'Very High': 'text-green-400', High: 'text-emerald-400', Moderate: 'text-yellow-400' };

const Crop = () => {
  const [soil, setSoil] = useState('');
  const [season, setSeason] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRecommend = async () => {
    if (!soil || !season) return setError('Please select both soil type and season');
    setError('');
    setLoading(true);
    try {
      const { data } = await cropAPI.recommend({ soilType: soil, season });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get recommendation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 pb-6 space-y-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">Crop</span>
        </div>
        <h2 className="text-white text-xl font-bold">Crop Recommendation</h2>
        <p className="text-gray-400 text-sm">Select your soil and season for AI-powered advice</p>
      </motion.div>

      {/* Soil Type */}
      <div className="glass-card rounded-2xl p-4">
        <p className="text-gray-400 text-xs font-semibold mb-3 uppercase tracking-wider">Soil Type</p>
        <div className="flex flex-wrap gap-2">
          {soilTypes.map((s) => (
            <motion.button
              key={s}
              whileTap={{ scale: 0.93 }}
              onClick={() => setSoil(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                soil === s
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                  : 'glass text-gray-400'
              }`}
            >
              {s}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Season */}
      <div className="glass-card rounded-2xl p-4">
        <p className="text-gray-400 text-xs font-semibold mb-3 uppercase tracking-wider">Season</p>
        <div className="grid grid-cols-2 gap-2">
          {seasons.map((s) => {
            const icons = { Summer: '☀️', Winter: '❄️', Monsoon: '🌧️', Spring: '🌸' };
            return (
              <motion.button
                key={s}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSeason(s)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                  season === s
                    ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                    : 'glass text-gray-400'
                }`}
              >
                <span>{icons[s]}</span> {s}
              </motion.button>
            );
          })}
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleRecommend}
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-green-500/20 disabled:opacity-60"
      >
        {loading ? '🔍 Analyzing...' : '🌱 Get Recommendation'}
      </motion.button>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card rounded-3xl p-5 space-y-4"
          >
            {/* Crop Name */}
            <div className="text-center py-3"
              style={{ background: 'linear-gradient(135deg, #14532d20, #16a34a20)', borderRadius: 16 }}>
              <p className="text-gray-400 text-xs mb-1">Recommended Crop</p>
              <p className="text-white text-3xl font-bold">{result.recommendedCrop}</p>
              <p className={`text-sm font-semibold mt-1 ${yieldColor[result.expectedYield] || 'text-green-400'}`}>
                {result.expectedYield} Yield Expected
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-2xl p-3 text-center">
                <p className="text-gray-500 text-xs">Soil</p>
                <p className="text-white text-sm font-semibold capitalize">{result.soilType}</p>
              </div>
              <div className="glass rounded-2xl p-3 text-center">
                <p className="text-gray-500 text-xs">Water Need</p>
                <p className="text-white text-sm font-semibold">{result.waterRequirement}</p>
              </div>
            </div>

            {/* Reason */}
            <div className="glass rounded-2xl p-3">
              <p className="text-gray-400 text-xs font-semibold mb-1">Why this crop?</p>
              <p className="text-gray-300 text-sm leading-relaxed">{result.reason}</p>
            </div>

            {/* Tips */}
            <div>
              <p className="text-gray-400 text-xs font-semibold mb-2">Farming Tips</p>
              <div className="space-y-2">
                {result.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-green-400 text-xs mt-0.5">✓</span>
                    <p className="text-gray-300 text-xs leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Crop;
