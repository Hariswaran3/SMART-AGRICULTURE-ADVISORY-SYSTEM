import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const tabs = [
  { to: '/', icon: '🏠', label: 'Home' },
  { to: '/crop', icon: '🌱', label: 'Crop' },
  { to: '/weather', icon: '🌤️', label: 'Weather' },
  { to: '/chatbot', icon: '🤖', label: 'AI Chat' },
];

const BottomNav = () => (
  <div className="glass border-t border-white/10 px-2 py-3 flex justify-around items-center">
    {tabs.map(({ to, icon, label }) => (
      <NavLink key={to} to={to} end={to === '/'}>
        {({ isActive }) => (
          <motion.div
            whileTap={{ scale: 0.85 }}
            className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-2xl transition-all ${
              isActive ? 'bg-green-500/20' : ''
            }`}
          >
            <span className="text-xl">{icon}</span>
            <span className={`text-[10px] font-semibold ${isActive ? 'text-green-400' : 'text-gray-500'}`}>
              {label}
            </span>
          </motion.div>
        )}
      </NavLink>
    ))}
  </div>
);

export default BottomNav;
