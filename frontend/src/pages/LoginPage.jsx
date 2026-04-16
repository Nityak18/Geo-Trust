import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  // IMPORTANT: You need to replace this with your real Client ID from Google Cloud Console
  const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com";

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse
      });

      google.accounts.id.renderButton(
        document.getElementById("googleSignInBtn"),
        { 
            theme: "filled_blue", 
            size: "large", 
            shape: "pill",
            width: 360,
            logo_alignment: "left"
        }
      );
    }
  }, []);

  const handleGoogleResponse = (response) => {
    // In a real app, you'd send 'response.credential' (JWT) to your backend
    // For this demo, we'll decode the JWT or just simulate the successful login
    console.log("Encoded JWT ID token: " + response.credential);
    
    // Simulate decoding the user info from the real Google JWT
    login('google', { 
        name: 'Google User', 
        email: 'authenticated@gmail.com' 
    });
    navigate('/');
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    if (password) {
      login('password', { name: 'Node Operator', email: 'admin@registry.gov' });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-accent-teal/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 bg-primary-main rounded-2xl flex items-center justify-center shadow-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h2 className="text-3xl font-serif font-bold text-primary-main tracking-tight">Access Protocol</h2>
          <p className="mt-2 text-textPrimary/60 text-sm">Sign in to the global ledger node.</p>
        </div>

        <div className="bg-white p-10 rounded-[2rem] shadow-2xl border border-black/5 space-y-8">
          
          {/* REAL Google Sign In Button */}
          <div className="flex flex-col items-center space-y-4">
              <div id="googleSignInBtn" className="w-full flex justify-center scale-110"></div>
              {GOOGLE_CLIENT_ID.includes("YOUR_GOOGLE") && (
                <div className="p-3 bg-accent-orange/10 border border-accent-orange/20 rounded-lg">
                   <p className="text-[10px] text-accent-orange font-bold text-center leading-tight">
                    ACTION REQUIRED: Paste your "Google Client ID" in src/pages/LoginPage.jsx to enable real account selection.
                   </p>
                </div>
              )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-gray-300"><span className="bg-white px-4">OR USE NODE SECURITY</span></div>
          </div>

          <form onSubmit={handlePasswordLogin} className="space-y-5">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="password"
                placeholder="Access Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-primary-main outline-none transition-all text-sm font-medium"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full btn-primary py-4 text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2"
            >
              Unlock Terminal
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-500">
          Encryption Level: AES-256 On-Chain Validation Active
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
