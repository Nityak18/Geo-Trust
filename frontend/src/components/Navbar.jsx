import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Menu, X, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Registry', path: '/registry' },
    { name: 'Verify', path: '/verify' },
    { name: 'Transfer', path: '/transfer' },
    { name: 'Explorer', path: '/explorer' },
    { name: 'Reports', path: '/reports' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-primary-main/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 focus:outline-none group">
            <span className="font-serif text-2xl font-bold text-primary-main tracking-tight group-hover:scale-105 transition-transform">Chain</span>
            <span className="font-serif text-2xl font-bold text-accent-orange tracking-tight group-hover:scale-105 transition-transform">Deed</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-textPrimary hover:text-accent-teal font-medium transition-colors"
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-teal rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Authenticated User Status */}
          <div className="flex items-center gap-4">
            <div className={`hidden sm:flex items-center gap-3 px-4 py-2 rounded-full border ${user?.role === 'Seller' ? 'border-accent-orange/30 bg-accent-orange/5' : 'border-accent-teal/30 bg-accent-teal/5'}`}>
              <div className="flex flex-col items-end">
                <span className={`text-[10px] uppercase font-bold tracking-widest ${user?.role === 'Seller' ? 'text-accent-orange' : 'text-accent-teal'}`}>{user?.role} Portal</span>
                <span className="text-xs font-mono text-primary-main/60">{user?.address}</span>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${user?.role === 'Seller' ? 'bg-accent-orange text-white' : 'bg-accent-teal text-white'}`}>
                {user?.role === 'Seller' ? <ShieldCheck className="w-4 h-4" /> : <Wallet className="w-4 h-4" />}
              </div>
            </div>
            
            <button
              onClick={logout}
              className="p-2.5 rounded-full hover:bg-primary-main/5 text-gray-400 hover:text-accent-orange transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
            
            <button 
              className="md:hidden text-primary-main p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-primary-main/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md font-medium ${location.pathname === link.path ? 'bg-primary-main/5 text-accent-teal' : 'text-textPrimary hover:bg-primary-main/5 hover:text-accent-teal'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-primary-main/10">
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent-orange text-white font-medium shadow-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Logout from {user?.role} Portal
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
