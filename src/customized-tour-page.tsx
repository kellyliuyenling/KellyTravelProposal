import React, { useState, useEffect } from 'react';
import Layout from './Layout';

const CustomizedTourProposal = () => {
  // 财务模型状态
  const [price, setPrice] = useState(4000);
  const [cost, setCost] = useState(2800);
  const [margin, setMargin] = useState(30);
  const [leads, setLeads] = useState(110);
  const [conversionRate, setConversionRate] = useState(5);
  const [staffCost, setStaffCost] = useState(5000);
  const [leadCost, setLeadCost] = useState(2000);

  // 计算指标
  const [monthlyOrders, setMonthlyOrders] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [monthlyProfit, setMonthlyProfit] = useState(0);
  const [breakEvenMonth, setBreakEvenMonth] = useState(0);
  const [yearOneProfit, setYearOneProfit] = useState(0);
  const [yearTwoProfit, setYearTwoProfit] = useState(0);
  const [roi, setRoi] = useState(0);

  // 当输入变化时更新计算
  useEffect(() => {
    // 如果利润率变化，计算成本
    const calculatedCost = price * (1 - margin/100);
    if (Math.abs(calculatedCost - cost) > 1) {
      setCost(calculatedCost);
    }
    
    // 如果成本变化，计算利润率
    const calculatedMargin = ((price - cost) / price) * 100;
    if (Math.abs(calculatedMargin - margin) > 1) {
      setMargin(calculatedMargin);
    }
    
    // 计算每月订单
    const orders = Math.round(leads * (conversionRate / 100));
    setMonthlyOrders(orders);
    
    // 计算每月收入
    const revenue = orders * price;
    setMonthlyRevenue(revenue);
    
    // 计算每月利润
    const profit = (price - cost) * orders - staffCost - leadCost;
    setMonthlyProfit(profit);
    
    // 估算收支平衡月份（简化线性模型）
    if (profit > 0) {
      // 假设$100,000投资
      const breakEven = Math.ceil(100000 / profit);
      setBreakEvenMonth(breakEven);
    } else {
      setBreakEvenMonth(0);
    }
    
    // 第一年利润（带增长的简化模型）
    let yearOneTotal = 0;
    let currentMonthProfit = profit;
    let currentConversionRate = conversionRate;
    let currentLeads = leads;
    
    for (let i = 0; i < 12; i++) {
      yearOneTotal += currentMonthProfit;
      
      // 模拟逐步改进
      if (i % 3 === 2) { // 每季度
        currentConversionRate += 0.5;
        currentLeads += 5;
        const newOrders = Math.round(currentLeads * (currentConversionRate / 100));
        currentMonthProfit = (price - cost) * newOrders - staffCost - leadCost;
      }
    }
    
    setYearOneProfit(yearOneTotal);
    
    // 第二年利润（假设持续增长的简化估算）
    setYearTwoProfit(yearOneTotal * 2.5);
    
    // 计算2年投资回报率
    setRoi(((yearOneTotal + (yearOneTotal * 2.5)) / 100000) * 100);
    
  }, [price, cost, margin, leads, conversionRate, staffCost, leadCost]);

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8 w-full">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">定制旅游体验</h1>
          <p className="text-lg text-gray-600 mb-8">高端旅游解决方案，快速进入市场</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* 商业概览 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">商业优势</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-3 mt-0.5 flex-shrink-0">✓</span>
                  <span><strong>随时可启动：</strong> 依托现有代码库，3周内即可运营</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-3 mt-0.5 flex-shrink-0">✓</span>
                  <span><strong>最小启动成本：</strong> 主要投资专注于许可证和营销</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-3 mt-0.5 flex-shrink-0">✓</span>
                  <span><strong>新加坡旅游局许可证：</strong> 提升信誉度和市场准入</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-3 mt-0.5 flex-shrink-0">✓</span>
                  <span><strong>经验证的商业模式：</strong> 已验证的方法和成熟的流程</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-3 mt-0.5 flex-shrink-0">✓</span>
                  <span><strong>高价值定位：</strong> 高利润率的高端套餐</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-3 mt-0.5 flex-shrink-0">✓</span>
                  <span><strong>专业知识无需资本：</strong> Kelly提供行业知识，您提供投资</span>
                </li>
              </ul>
            </div>
            
            {/* 财务模拟器 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">互动财务模型</h2>
              <p className="text-gray-600 mb-4">调整参数以模拟不同的商业情景</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">套餐价格 ($)</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">套餐成本 ($)</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={cost}
                    onChange={(e) => setCost(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">利润率 (%)</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={margin.toFixed(1)}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">每月潜在客户</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={leads}
                    onChange={(e) => setLeads(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">转化率 (%)</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">每月员工成本 ($)</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={staffCost}
                    onChange={(e) => setStaffCost(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">每月获客成本 ($)</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={leadCost}
                    onChange={(e) => setLeadCost(Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-lg mb-3 text-blue-800">计算指标</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">每月订单数</p>
                    <p className="text-2xl font-bold">{monthlyOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">每月收入</p>
                    <p className="text-2xl font-bold">${monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">每月利润</p>
                    <p className={`text-2xl font-bold ${monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${monthlyProfit.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">收支平衡月份</p>
                    <p className="text-2xl font-bold">{breakEvenMonth > 0 ? breakEvenMonth : 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-800 text-white p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-3">投资回报</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-80">第1年利润</p>
                    <p className="text-2xl font-bold">${yearOneProfit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">第2年利润</p>
                    <p className="text-2xl font-bold">${yearTwoProfit.toLocaleString()}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm opacity-80">2年投资回报率</p>
                    <p className="text-3xl font-bold">{roi.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 时间线 */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6 text-blue-800">实施时间线</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg">第1周: 基础</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• 公司注册与银行开户</li>
                  <li>• 旅游许可证申请提交</li>
                  <li>• 网站框架部署</li>
                  <li>• 核心团队招聘</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg">第2周: 准备</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• 旅游套餐最终确定</li>
                  <li>• 供应商网络建立</li>
                  <li>• 初始营销活动启动</li>
                  <li>• 支付处理集成</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg">第3周: 上线</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• 网站测试与上线</li>
                  <li>• 预订系统激活</li>
                  <li>• 全面数字营销展开</li>
                  <li>• 销售潜客生成开始</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-blue-800 text-white py-6 px-6 rounded-lg">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold">准备投资讨论</h2>
                <p className="text-blue-200">寻求$100,000投资或新加坡旅游局许可支持</p>
              </div>
              <div>
                <a 
                  href="https://wa.me/886919501892"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-800 px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-100 transition inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 mr-2 fill-current text-green-600">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                  </svg>
                  联系我们
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomizedTourProposal;
