import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = [
    { path: '/', label: '定制旅游提案', name: 'customized-tour' },
    { path: '/airport-services', label: '机场服务组合', name: 'airport-services' },
    { path: '/partnership', label: '合作框架', name: 'partnership' },
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
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 