import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between px-5 pt-12 pb-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="text-white font-bold text-lg tracking-tight">Smart Farming</span>
        </div>
        {user && (
          <p className="text-green-400 text-xs mt-0.5 ml-8">
            Welcome, {user.name?.split(' ')[0]} 👋
          </p>
        )}
      </div>
      {user && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout}
          className="glass rounded-xl px-3 py-2 text-xs text-red-400 font-medium"
        >
          Logout
        </motion.button>
      )}
    </div>
  );
};

export default Navbar;
