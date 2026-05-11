import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Chatbot from './components/Chatbot';
import Dashboard from './pages/Dashboard';
import Crop from './pages/Crop';
import Weather from './pages/Weather';
import ChatbotPage from './pages/Chatbot';
import Login from './pages/Login';
import Register from './pages/Register';

const AppLayout = ({ children }) => {
  const { user } = useAuth();
  if (!user) return children;

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at top, #0d2818 0%, #0a1628 60%)' }}>
      {/* Mobile App Container */}
      <div className="w-full max-w-sm h-screen max-h-[900px] flex flex-col relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0d1f0d 0%, #0a1628 100%)' }}>
        <Navbar />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {children}
        </div>
        <BottomNav />
        <Chatbot />
      </div>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/crop" element={<ProtectedRoute><Crop /></ProtectedRoute>} />
          <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
          <Route path="/chatbot" element={<ProtectedRoute><ChatbotPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
