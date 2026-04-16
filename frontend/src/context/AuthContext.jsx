import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simplified login with "Google" or Password
  const login = (method, data) => {
    setUser({ 
        name: data.name || 'Demo User', 
        email: data.email || 'user@chaindeed.gov.in',
        address: '0x7f3a...c8d2' // Single default wallet session
    });
    setIsAuthenticated(true);
    localStorage.setItem('chaindeed_session', 'active');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('chaindeed_session');
  };

  useEffect(() => {
    const session = localStorage.getItem('chaindeed_session');
    if (session) {
      setUser({ name: 'Demo User', email: 'user@chaindeed.gov.in', address: '0x7f3a...c8d2' });
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
