import React, { useState, useEffect } from 'react';
import { getLoginRecords, clearLoginRecords, LoginRecord } from './LoginTracker';
import { Link } from 'react-router-dom';

const LoginHistoryPage: React.FC = () => {
  const [loginRecords, setLoginRecords] = useState<LoginRecord[]>([]);

  useEffect(() => {
    // 获取登录记录
    const records = getLoginRecords();
    // 按时间倒序排列
    records.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    setLoginRecords(records);
  }, []);

  const handleClearRecords = () => {
    if (window.confirm('确定要清除所有登录记录吗？此操作不可撤销。')) {
      clearLoginRecords();
      setLoginRecords([]);
    }
  };

  // 格式化日期时间显示
  const formatDateTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">登录历史记录</h1>
          <div className="space-x-3">
            <Link 
              to="/" 
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              返回主页
            </Link>
            <button
              onClick={handleClearRecords}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              清除记录
            </button>
          </div>
        </div>

        {loginRecords.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-600">暂无登录记录</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    用户邮箱
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    日期时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loginRecords.map((record, index) => (
                  <tr key={index} className={record.success ? 'bg-green-50' : 'bg-red-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{record.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDateTime(record.timestamp)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.success 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {record.success ? '成功' : '失败'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginHistoryPage; 