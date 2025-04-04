import React, { useState } from 'react';
import Layout from './Layout';

const PartnershipProposal = () => {
  const [equityShare, setEquityShare] = useState(40);
  const [investorEquity, setInvestorEquity] = useState(60);
  
  // Update investor equity when founder equity changes
  const handleFounderEquityChange = (value: string | number) => {
    const newValue = parseInt(value as string);
    setEquityShare(newValue);
    setInvestorEquity(100 - newValue);
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8 w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">合作与运营框架</h1>
          <p className="text-lg text-gray-600 mb-8">透明合作，促进可持续增长</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Partnership Structure */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">合作结构</h2>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  我们的合作将基于明确的股权分配和透明的治理，
                  确保利益一致和可持续增长。
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-lg mb-3">股权分配</h3>
                  <div className="flex flex-col space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        创始人股权 (%) - 技术与运营专长
                      </label>
                      <div className="relative mt-1 mb-2">
                        <input 
                          type="range" 
                          min="40" 
                          max="60" 
                          value={equityShare}
                          onChange={(e) => handleFounderEquityChange(e.target.value)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div 
                          className="absolute top-[-22px] text-sm font-medium text-white bg-blue-600 rounded px-1 -translate-x-1/2 pointer-events-none"
                          style={{ left: `${((equityShare - 40) / 20) * 100}%` }}
                        >
                          {equityShare}%
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm">40%</span>
                        <span className="text-sm">60%</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        投资者股权 (%) - 资金与业务支持
                      </label>
                      <div className="relative mt-1 mb-2">
                        <div className="w-full h-2 bg-gray-200 rounded-lg relative">
                          <div 
                            className="absolute h-full bg-gray-400 rounded-lg" 
                            style={{ width: `${investorEquity}%` }}
                          ></div>
                        </div>
                        <div 
                          className="absolute top-[-22px] text-sm font-medium text-white bg-gray-600 rounded px-1 -translate-x-1/2 pointer-events-none"
                          style={{ left: `${((investorEquity - 40) / 30) * 100}%` }}
                        >
                          {investorEquity}%
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm">40%</span>
                        <span className="text-sm">70%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-gray-500 pl-4">
                    <h3 className="font-bold text-lg">新加坡法律实体</h3>
                    <p className="text-gray-600">
                      建立符合法规的新加坡公司，以树立市场信誉
                      并确保监管合规。
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-gray-500 pl-4">
                    <h3 className="font-bold text-lg">透明解散条款</h3>
                    <p className="text-gray-600">
                      明确、公平且具有法律约束力的解散条款，以保护所有
                      股东的利益，如果合作需要结束。
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-gray-500 pl-4">
                    <h3 className="font-bold text-lg">决策框架</h3>
                    <p className="text-gray-600">
                      明确定义的日常运营决策和公司战略方向的流程。
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-3">我的贡献</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-700 mr-3 mt-0.5 flex-shrink-0">✓</span>
                    <span><strong>技术专长:</strong> 端到端旅游产品开发和交付</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-700 mr-3 mt-0.5 flex-shrink-0">✓</span>
                    <span><strong>运营专业知识:</strong> 已验证的业务模式，可供扩展</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-700 mr-3 mt-0.5 flex-shrink-0">✓</span>
                    <span><strong>市场洞察力:</strong> 深入了解客户需求和行业趋势</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-700 mr-3 mt-0.5 flex-shrink-0">✓</span>
                    <span><strong>现有基础设施:</strong> 已有代码库和运营框架</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Operational Transparency */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">运营透明性</h2>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  我们的运营将遵循透明、技术支持的方法，确保
                  所有利益相关方都能看到业务绩效。
                </p>
              
                <div className="space-y-6">
                  <div className="border p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-lg">财务透明</h3>
                    </div>
                    <ul className="space-y-1 text-sm">
                      <li>• 所有股东均可查阅月度财务报告</li>
                      <li>• 人工智能驱动的会计系统，实时财务监控</li>
                      <li>• WhatsApp/Telegram集成，即时财务更新</li>
                      <li>• 与所有利益相关者进行季度正式审查</li>
                    </ul>
                  </div>
                  
                  <div className="border p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-lg">人力资源管理</h3>
                    </div>
                    <ul className="space-y-1 text-sm">
                      <li>• 透明招聘流程，明确定义的JD</li>
                      <li>• 性能监控系统，定期评审</li>
                      <li>• 明确的日常运营管理协议</li>
                      <li>• 可扩展的团队结构，支持业务增长</li>
                    </ul>
                  </div>
                  
                  <div className="border p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-lg">KPI与绩效跟踪</h3>
                    </div>
                    <ul className="space-y-1 text-sm">
                      <li>• 关键业务指标实时仪表板</li>
                      <li>• 每周运营指标表现摘要</li>
                      <li>• 月度战略评审，提供可行见解</li>
                      <li>• 数据驱动决策文化</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Partner Support Requirements */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">合作伙伴支持需求</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4 border-b pb-2">基本业务支持</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">1</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium">新加坡公司设立</h4>
                      <ul className="mt-1 text-sm text-gray-600 space-y-1">
                        <li>• 公司注册和设立</li>
                        <li>• 银行开户和初始资金存入</li>
                        <li>• 商业许可申请</li>
                        <li>• 监管合规协助</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">2</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium">跨境人才招聘</h4>
                      <ul className="mt-1 text-sm text-gray-600 space-y-1">
                        <li>• 根据提供的职位描述进行招聘</li>
                        <li>• 外国人才工作签证办理</li>
                        <li>• 入职和初始培训协调</li>
                        <li>• 人力资源合规和合同管理</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">3</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium">财务流动监控</h4>
                      <ul className="mt-1 text-sm text-gray-600 space-y-1">
                        <li>• 建立财务监督流程</li>
                        <li>• 实施会计和财务报告</li>
                        <li>• 设置审计跟踪和控制</li>
                        <li>• 利益相关者财务沟通协议</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">4</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium">人力资源管理</h4>
                      <ul className="mt-1 text-sm text-gray-600 space-y-1">
                        <li>• 日常人力资源管理</li>
                        <li>• 绩效管理实施</li>
                        <li>• 团队协调和沟通</li>
                        <li>• 遵循既定管理准则</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4 border-b pb-2">支付与金融基础设施</h3>
                <div className="space-y-5">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">全球支付解决方案</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      支持建立和管理国际支付网关，以促进全球交易。
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 p-2 rounded flex items-center justify-center">
                        <div className="font-medium">Stripe</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded flex items-center justify-center">
                        <div className="font-medium">Airwallex</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded flex items-center justify-center">
                        <div className="font-medium">Wise</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">额外支持需求</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-200 text-gray-700 mr-2 mt-0.5 flex-shrink-0 text-xs">✓</span>
                        <span><strong>法律咨询:</strong> 合同和协议的持续法律支持</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-200 text-gray-700 mr-2 mt-0.5 flex-shrink-0 text-xs">✓</span>
                        <span><strong>税务优化:</strong> 战略税务规划和合规</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-200 text-gray-700 mr-2 mt-0.5 flex-shrink-0 text-xs">✓</span>
                        <span><strong>行业网络:</strong> 获取相关行业联系</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-200 text-gray-700 mr-2 mt-0.5 flex-shrink-0 text-xs">✓</span>
                        <span><strong>危机管理:</strong> 在意外业务挑战期间的支持</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">战略增值</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      除了财务支持，我们欢迎能够增加战略价值的合作伙伴:
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li>• 与潜在客户或合作伙伴的行业联系</li>
                      <li>• 扩展类似业务的专业知识</li>
                      <li>• 对新加坡/东盟旅游格局的了解</li>
                      <li>• 相关监管环境经验</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-gray-800 text-white py-6 px-6 rounded-lg">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold">让我们共同打造精彩</h2>
                <p className="text-gray-300">寻求真正的合作伙伴，共建透明、高增长业务</p>
              </div>
              <div>
                <a 
                  href="https://wa.me/886919501892"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-800 px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 mr-2 fill-current text-green-600">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                  </svg>
                  开始对话
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PartnershipProposal;
