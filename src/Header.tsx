import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  
  // 获取当前登录的用户邮箱
  const userEmail = sessionStorage.getItem('userEmail');
  
  // 检查是否为管理员（只有kellyliuyenling@icloud.com才是管理员）
  const isAdmin = userEmail === 'kellyliuyenling@icloud.com';

  const routes = [
    { path: '/', label: '全球旅游愿景', name: 'vision' },
    { path: '/customized-tour', label: '定制旅游提案', name: 'customized-tour' },
    { path: '/airport-services', label: '机场服务组合', name: 'airport-services' },
    { path: '/partnership', label: '合作框架', name: 'partnership' },
  ];
  
  const adminRoutes = [
    { path: '/login-history', label: '登录记录', name: 'login-history' },
    { path: '/notification-config', label: '通知配置', name: 'notification-config' },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="text-xl font-bold mr-10">
              Kelly 旅游提案
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {routes.map((route) => (
                <Link 
                  to={route.path} 
                  key={route.name}
                  className={`py-2 px-1 font-medium text-md transition-colors hover:text-blue-200 border-b-2 ${
                    isActivePath(route.path) 
                      ? 'border-white text-white' 
                      : 'border-transparent text-blue-100'
                  }`}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center">
            {/* 显示当前登录的用户 */}
            <div className="hidden md:block mr-4 text-sm">
              {userEmail && (
                <span>
                  {userEmail}
                </span>
              )}
            </div>
            
            {/* 管理菜单 - 只对管理员显示 */}
            {isAdmin && (
              <div className="hidden md:relative md:block">
                <button
                  onClick={() => setShowAdminMenu(!showAdminMenu)}
                  className="bg-blue-700 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm transition flex items-center"
                >
                  管理 
                  <svg 
                    className={`ml-1 h-4 w-4 transition-transform ${showAdminMenu ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showAdminMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    {adminRoutes.map((route) => (
                      <Link 
                        key={route.name}
                        to={route.path}
                        onClick={() => setShowAdminMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                      >
                        {route.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  ) : (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 6h16M4 12h16M4 18h16" 
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {routes.map((route) => (
              <Link 
                to={route.path} 
                key={route.name}
                className={`block py-2 px-4 font-medium rounded transition-colors ${
                  isActivePath(route.path) 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            
            {/* 移动端管理菜单 - 仅对管理员显示 */}
            {isAdmin && (
              <>
                <div className="py-2 px-4 font-medium text-xs uppercase text-blue-200 border-t border-blue-700 mt-2 pt-2">
                  管理菜单
                </div>
                
                {/* 移动端管理菜单链接 */}
                {adminRoutes.map((route) => (
                  <Link 
                    to={route.path} 
                    key={route.name}
                    className="block py-2 px-4 font-medium rounded transition-colors text-blue-100 hover:bg-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 