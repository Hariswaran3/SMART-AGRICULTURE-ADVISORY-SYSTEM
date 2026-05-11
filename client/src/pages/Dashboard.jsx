import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const yieldData = [
  { month: 'Jan', yield: 40 }, { month: 'Feb', yield: 55 },
  { month: 'Mar', yield: 48 }, { month: 'Apr', yield: 70 },
  { month: 'May', yield: 65 }, { month: 'Jun', yield: 85 },
];

const StatCard = ({ icon, label, value, sub, color }) => (
  <motion.div
    whileTap={{ scale: 0.97 }}
    className="glass-card rounded-2xl p-4 flex items-center gap-3"
  >
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="text-white font-bold text-base">{value}</p>
      {sub && <p className="text-green-400 text-xs">{sub}</p>}
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="px-5 pb-6 space-y-5">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-5 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #166534 0%, #15803d 50%, #16a34a 100%)' }}
      >
        <div className="absolute top-0 right-0 text-8xl opacity-20 -mt-2 -mr-2">🌾</div>
        <p className="text-green-200 text-xs font-medium mb-1">Good morning 🌅</p>
        <h2 className="text-white text-xl font-bold">{user?.name?.split(' ')[0]}'s Farm</h2>
        <p className="text-green-200 text-sm mt-1">Season: Kharif 2024 • Active</p>
        <div className="flex gap-2 mt-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/crop')}
            className="bg-white/20 backdrop-blur text-white text-xs font-semibold px-4 py-2 rounded-full"
          >
            🌱 Get Crop Advice
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/weather')}
            className="bg-white/20 backdrop-blur text-white text-xs font-semibold px-4 py-2 rounded-full"
          >
            🌤️ Check Weather
          </motion.button>
        </div>
      </motion.div>

      {/* Section Label */}
      <div className="flex items-center gap-2">
        <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
          General
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon="🌡️" label="Temperature" value="28°C" sub="Optimal for crops" color="bg-orange-500/20" />
        <StatCard icon="💧" label="Soil Moisture" value="65%" sub="Good level" color="bg-blue-500/20" />
        <StatCard icon="🌱" label="Active Crops" value="3" sub="Wheat, Rice, Corn" color="bg-green-500/20" />
        <StatCard icon="☀️" label="Sunlight" value="8.5 hrs" sub="Today" color="bg-yellow-500/20" />
      </div>

      {/* Section Label */}
      <div className="flex items-center gap-2">
        <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
          Yield
        </span>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-4"
      >
        <p className="text-white font-semibold text-sm mb-3">Yield Overview (tons/acre)</p>
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={yieldData}>
            <defs>
              <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: '#1a2e1a', border: '1px solid #22c55e30', borderRadius: 12, color: '#fff', fontSize: 12 }}
            />
            <Area type="monotone" dataKey="yield" stroke="#22c55e" strokeWidth={2} fill="url(#yieldGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Section Label */}
      <div className="flex items-center gap-2">
        <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full">
          Crop
        </span>
      </div>

      {/* Quick Tips */}
      <div className="space-y-2">
        {[
          { icon: '💡', tip: 'Apply nitrogen fertilizer before the next rain for best absorption', tag: 'Tip' },
          { icon: '⚠️', tip: 'Aphid activity detected in nearby farms — inspect your crops', tag: 'Alert' },
          { icon: '✅', tip: 'Wheat crop is on track for harvest in 3 weeks', tag: 'Update' },
        ].map(({ icon, tip, tag }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl px-4 py-3 flex items-start gap-3"
          >
            <span className="text-lg mt-0.5">{icon}</span>
            <div>
              <span className="text-green-400 text-xs font-semibold">{tag}</span>
              <p className="text-gray-300 text-xs mt-0.5 leading-relaxed">{tip}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
