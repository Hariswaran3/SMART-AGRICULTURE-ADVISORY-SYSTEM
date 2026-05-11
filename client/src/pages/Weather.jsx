import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weatherAPI } from '../services/api';

const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad', 'Jaipur'];

const conditionIcon = {
  Sunny: '☀️', Rainy: '🌧️', Cloudy: '☁️', 'Partly Cloudy': '⛅',
  Humid: '🌫️', Hot: '🔥', 'Very Hot': '🌡️', Pleasant: '🌤️', Moderate: '🌤️',
};

const Weather = () => {
  const [location, setLocation] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (loc) => {
    const target = loc || location;
    if (!target) return setError('Enter a location');
    setError('');
    setLoading(true);
    try {
      const { data: res } = await weatherAPI.get(target);
      setData(res);
    } catch {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 pb-6 space-y-5">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">Weather</span>
        </div>
        <h2 className="text-white text-xl font-bold">Weather Insights</h2>
        <p className="text-gray-400 text-sm">Get farming-specific weather guidance</p>
      </motion.div>

      {/* Search */}
      <div className="flex gap-2">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
          placeholder="Enter city name..."
          className="flex-1 glass rounded-2xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none"
        />
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => fetchWeather()}
          disabled={loading}
          className="bg-blue-500 text-white px-5 py-3 rounded-2xl font-semibold text-sm disabled:opacity-60"
        >
          {loading ? '...' : '🔍'}
        </motion.button>
      </div>

      {/* Quick Cities */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {cities.map((city) => (
          <motion.button
            key={city}
            whileTap={{ scale: 0.93 }}
            onClick={() => { setLocation(city); fetchWeather(city); }}
            className="glass text-gray-300 text-xs px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0"
          >
            {city}
          </motion.button>
        ))}
      </div>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      <AnimatePresence>
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Main Card */}
            <div className="rounded-3xl p-5 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1a4a7a 100%)' }}>
              <div className="absolute top-3 right-4 text-6xl opacity-30">
                {conditionIcon[data.condition] || '🌤️'}
              </div>
              <p className="text-blue-300 text-sm font-medium capitalize">{data.location}</p>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-white text-5xl font-bold">{data.temperature}°</span>
                <span className="text-blue-300 text-lg mb-2">C</span>
              </div>
              <p className="text-blue-200 text-sm">{data.condition}</p>

              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: 'Humidity', value: `${data.humidity}%`, icon: '💧' },
                  { label: 'Rain', value: `${data.rainChance}%`, icon: '🌧️' },
                  { label: 'Wind', value: `${data.windSpeed} km/h`, icon: '💨' },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="bg-white/10 rounded-2xl p-2.5 text-center">
                    <p className="text-lg">{icon}</p>
                    <p className="text-white text-sm font-bold">{value}</p>
                    <p className="text-blue-300 text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Farming Advice */}
            <div className="glass-card rounded-2xl p-4">
              <p className="text-gray-400 text-xs font-semibold mb-2">🌾 Farming Advice</p>
              <p className="text-gray-200 text-sm leading-relaxed">{data.farmingAdvice}</p>
            </div>

            {/* 5-Day Forecast */}
            <div className="glass-card rounded-2xl p-4">
              <p className="text-gray-400 text-xs font-semibold mb-3">5-Day Forecast</p>
              <div className="flex justify-between">
                {data.forecast?.map((f, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <p className="text-gray-500 text-xs">{f.day}</p>
                    <span className="text-lg">{conditionIcon[f.condition] || '🌤️'}</span>
                    <p className="text-white text-xs font-semibold">{f.high}°</p>
                    <p className="text-gray-500 text-xs">{f.low}°</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!data && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-3">🌍</div>
          <p className="text-gray-500 text-sm">Search a city or tap a quick location above</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
