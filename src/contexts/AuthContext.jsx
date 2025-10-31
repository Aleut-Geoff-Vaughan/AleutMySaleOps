import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [loginError, setLoginError] = useState('');

  const [users] = useState([
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', firstName: 'Admin', lastName: 'User', isActive: true },
    { id: 2, username: 'sales', password: 'sales123', role: 'sales', firstName: 'Sales', lastName: 'Rep', isActive: true },
    { id: 3, username: 'viewer', password: 'viewer123', role: 'viewer', firstName: 'View', lastName: 'Only', isActive: true }
  ]);

  const login = useCallback((username, password) => {
    const user = users.find(u => u.username === username && u.isActive);
    if (user && user.password === password) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      setUserRole(user.role);
      setLoginError('');
      return true;
    } else {
      setLoginError('Invalid username or password');
      return false;
    }
  }, [users]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUserRole('');
    setLoginError('');
  }, []);

  const value = {
    isAuthenticated,
    currentUser,
    userRole,
    loginError,
    users,
    login,
    logout,
    setLoginError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
