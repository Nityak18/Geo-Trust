import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import RegistryPage from './pages/RegistryPage';
import TransferPage from './pages/TransferPage';
import VerifyPage from './pages/VerifyPage';
import ExplorerPage from './pages/ExplorerPage';
import ReportsPage from './pages/ReportsPage';
import LoginPage from './pages/LoginPage';
import { RegistryProvider } from './context/RegistryContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ToastContainer from './components/ToastContainer';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background relative overflow-hidden selection:bg-accent-teal selection:text-white">
        
        {/* Persistent Glass Background Ornaments */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="glass-bg-ornament bg-accent-teal w-[600px] h-[600px] -top-20 -left-20 opacity-[0.08] animate-float"></div>
          <div className="glass-bg-ornament bg-accent-orange w-[500px] h-[500px] bottom-40 -right-20 opacity-[0.05] [animation-delay:2s]"></div>
          <div className="glass-bg-ornament bg-primary-main w-[800px] h-[800px] -bottom-20 -left-40 opacity-[0.03] [animation-duration:30s]"></div>
          <div className="fixed inset-0 backdrop-blur-[100px] bg-white/40"></div>
        </div>

        {isAuthenticated && <Navbar />}
        <main className="flex-grow relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={isAuthenticated ? <LandingPage /> : <LoginPage />} />
              <Route path="/registry" element={isAuthenticated ? <RegistryPage /> : <LoginPage />} />
              <Route path="/verify" element={isAuthenticated ? <VerifyPage /> : <LoginPage />} />
              <Route path="/transfer" element={isAuthenticated ? <TransferPage /> : <LoginPage />} />
              <Route path="/explorer" element={isAuthenticated ? <ExplorerPage /> : <LoginPage />} />
              <Route path="/reports" element={isAuthenticated ? <ReportsPage /> : <LoginPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        {isAuthenticated && <Footer />}
        <ToastContainer />
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <RegistryProvider>
        <AppContent />
      </RegistryProvider>
    </AuthProvider>
  );
}

export default App;
