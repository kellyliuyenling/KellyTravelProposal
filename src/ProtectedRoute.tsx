import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
  requireAdmin?: boolean; // 是否需要管理员权限
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  isAuthenticated, 
  children,
  requireAdmin = false
}) => {
  // 检查是否经过身份验证
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // 如果需要管理员权限，检查当前用户是否是管理员
  if (requireAdmin) {
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail !== 'kellyliuyenling@icloud.com') {
      // 如果不是管理员但尝试访问管理页面，重定向到主页
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute; 