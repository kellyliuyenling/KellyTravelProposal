import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomizedTourProposal from './customized-tour-page';
import AirportServicesProposal from './airport-products-page';
import PartnershipProposal from './partnership-page';
import LoginPage from './LoginPage';
import ProtectedRoute from './ProtectedRoute';
import './index.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // 检查用户是否已登录（从sessionStorage中获取状态）
  // 使用sessionStorage而非localStorage，这样关闭浏览器后会自动清除会话
  useEffect(() => {
    const loginStatus = sessionStorage.getItem('isLoggedIn');
    if (loginStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  // 处理登录事件
  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? 
            <Navigate to="/" replace /> : 
            <LoginPage onLogin={handleLogin} />
        } />
        
        <Route path="/" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CustomizedTourProposal />
          </ProtectedRoute>
        } />
        
        <Route path="/airport-services" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AirportServicesProposal />
          </ProtectedRoute>
        } />
        
        <Route path="/partnership" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <PartnershipProposal />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);
root.render(<App />); 