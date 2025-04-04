import React, { useState } from 'react';
import { AUTH_CONFIG } from './config';
import { saveLoginRecord } from './LoginTracker';

interface LoginPageProps {
  onLogin: (success: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 检查电子邮件和密码是否匹配配置中的凭据
    const isValidCredential = AUTH_CONFIG.credentials[email] === password;

    // 记录登录尝试（无论成功与否）
    saveLoginRecord(email, isValidCredential);

    if (isValidCredential) {
      // 登录成功，存储到sessionStorage（而非localStorage）
      // 这样当用户关闭浏览器时会自动清除登录状态
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userEmail', email);
      onLogin(true);
    } else {
      setError('电子邮件或密码不正确');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-indigo-800">投资提案访问</h1>
          <p className="text-gray-600">请输入您的电子邮件和密码以访问提案</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              电子邮件
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              密码
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 