import React, { useState, useEffect } from 'react';
import Layout from './Layout';

// 定义产品接口
interface Product {
  name: string;
  price: number;
  margin: number;
  distribution: number;
}

// 主组件
const AirportServicesProposal: React.FC = () => {
  // 市场数据状态
  const [totalMarketSize, setTotalMarketSize] = useState<number>(500000);
  const [targetMarketShare, setTargetMarketShare] = useState<number>(1.0);
  
  // 产品数据状态
  const [products, setProducts] = useState<Product[]>([
    { name: 'Visa Services', price: 100, margin: 50, distribution: 25 },
    { name: 'Airport Transfers', price: 80, margin: 35, distribution: 25 },
    { name: 'Fast Track Services', price: 60, margin: 70, distribution: 25 },
    { name: 'Tourist Transportation', price: 200, margin: 40, distribution: 25 }
  ]);
  
  // 运营成本状态
  const [monthlyOperationCost, setMonthlyOperationCost] = useState<number>(30000);
  const [monthlyMarketingCost, setMonthlyMarketingCost] = useState<number>(10000);
  
  // 计算指标
  const [monthlyCustomers, setMonthlyCustomers] = useState<number>(0);
  const [avgTicketPrice, setAvgTicketPrice] = useState<number>(0);
  const [avgProfitMargin, setAvgProfitMargin] = useState<number>(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
  const [monthlyProfit, setMonthlyProfit] = useState<number>(0);
  const [annualProfit, setAnnualProfit] = useState<number>(0);
  const [investmentROI, setInvestmentROI] = useState<number>(0);
  
  // 产品特定计算 - 初始化默认值
  const [productRevenues, setProductRevenues] = useState<number[]>([0, 0, 0, 0]);
  const [productProfits, setProductProfits] = useState<number[]>([0, 0, 0, 0]);
  
  // 更新产品数据
  const updateProduct = (index: number, field: keyof Product, value: string | number): void => {
    const numValue = parseFloat(value.toString());
    
    setProducts(prevProducts => {
      const newProducts = [...prevProducts];
      
      if (field === 'price') {
        newProducts[index] = { ...newProducts[index], price: numValue };
      } else if (field === 'margin') {
        newProducts[index] = { ...newProducts[index], margin: numValue };
      } else if (field === 'distribution') {
        // 设置新的分布值
        newProducts[index] = { ...newProducts[index], distribution: numValue };
        
        // 计算其他产品的总分布
        const totalOtherDistribution = newProducts.reduce((sum, product, i) => 
          i !== index ? sum + product.distribution : sum, 0);
        
        // 如果总分布超过100%，按比例调整其他值
        if (totalOtherDistribution + numValue > 100) {
          const adjustment = (100 - numValue) / totalOtherDistribution;
          
          // 更新其他产品的分布
          return newProducts.map((product, i) => {
            if (i !== index) {
              return { ...product, distribution: product.distribution * adjustment };
            }
            return product;
          });
        }
      }
      
      return newProducts;
    });
  };
  
  // 当输入变化时执行计算
  useEffect(() => {
    // 计算每月客户数
    const customers = Math.round(totalMarketSize * (targetMarketShare / 100));
    setMonthlyCustomers(customers);
    
    // 计算平均票价和利润率
    let weightedPrice = 0;
    let weightedMargin = 0;
    
    products.forEach(product => {
      weightedPrice += product.price * (product.distribution / 100);
      weightedMargin += product.margin * (product.distribution / 100);
    });
    
    setAvgTicketPrice(weightedPrice);
    setAvgProfitMargin(weightedMargin);
    
    // 计算收入和利润
    const revenue = customers * weightedPrice;
    setMonthlyRevenue(revenue);
    
    const profit = revenue * (weightedMargin / 100) - monthlyOperationCost - monthlyMarketingCost;
    setMonthlyProfit(profit);
    
    // 计算年度利润（带增长）
    let annualTotal = 0;
    let currentProfit = profit;
    let currentCustomers = customers;
    
    for (let i = 0; i < 12; i++) {
      annualTotal += currentProfit;
      
      // 每季度增长模型
      if (i % 3 === 2) {
        currentCustomers *= 1.2; // 20%季度增长
        const newRevenue = currentCustomers * weightedPrice;
        currentProfit = newRevenue * (weightedMargin / 100) - monthlyOperationCost - monthlyMarketingCost;
      }
    }
    
    setAnnualProfit(annualTotal);
    
    // 计算ROI（假设$30,000投资分配到机场服务）
    setInvestmentROI((annualTotal / 30000) * 100);
    
    // 计算产品特定收入和利润
    const newProdRevenues = products.map(product => 
      customers * (product.distribution / 100) * product.price
    );
    setProductRevenues(newProdRevenues);
    
    const newProdProfits = products.map((product, i) => 
      newProdRevenues[i] * (product.margin / 100)
    );
    setProductProfits(newProdProfits);
    
  }, [totalMarketSize, targetMarketShare, products, monthlyOperationCost, monthlyMarketingCost]);

  // 渲染组件
  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8 w-full">
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">机场服务组合</h1>
          <p className="text-lg text-gray-600 mb-8">高利润旅游服务，月市场规模500,000</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* 市场概览 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-800">市场机会</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    月度市场总量 (用户)
                  </label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={totalMarketSize}
                    onChange={(e) => setTotalMarketSize(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    目标市场份额 (%)
                  </label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={targetMarketShare}
                    onChange={(e) => setTargetMarketShare(parseFloat(e.target.value))}
                    step="0.1"
                    min="0.1"
                    max="10"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2 text-indigo-800">预计业务规模</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">月度客户</p>
                      <p className="text-2xl font-bold">{monthlyCustomers.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">平均票价</p>
                      <p className="text-2xl font-bold">${avgTicketPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">月收入</p>
                      <p className="text-2xl font-bold">${monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">月利润</p>
                      <p className="text-2xl font-bold text-green-600">${monthlyProfit.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3 text-indigo-800">主要竞争优势</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 mr-3 mt-0.5 flex-shrink-0">✓</span>
                      <span><strong>卓越的利润率:</strong> 各产品线30-100%的利润率</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 mr-3 mt-0.5 flex-shrink-0">✓</span>
                      <span><strong>可量化的市场:</strong> 官方数字500,000月度用户</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 mr-3 mt-0.5 flex-shrink-0">✓</span>
                      <span><strong>互补服务:</strong> 所有产品交叉销售机会</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 mr-3 mt-0.5 flex-shrink-0">✓</span>
                      <span><strong>战略入口点:</strong> 与旅客建立关系的首要接触点</span>
                    </li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      月运营成本 ($)
                    </label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={monthlyOperationCost}
                      onChange={(e) => setMonthlyOperationCost(parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      月营销成本 ($)
                    </label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={monthlyMarketingCost}
                      onChange={(e) => setMonthlyMarketingCost(parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* 产品组合 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-800">产品组合</h2>
              <p className="text-gray-600 mb-4">调整产品参数以建模不同的业务场景</p>
              
              <div className="space-y-6">
                {products.map((product, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          价格 ($)
                        </label>
                        <input 
                          type="number" 
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          value={product.price}
                          onChange={(e) => updateProduct(index, 'price', e.target.value)}
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          利润率 (%)
                        </label>
                        <input 
                          type="number" 
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          value={product.margin}
                          onChange={(e) => updateProduct(index, 'margin', e.target.value)}
                          min="1"
                          max="100"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          分布 (%)
                        </label>
                        <input 
                          type="number" 
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          value={product.distribution.toFixed(1)}
                          onChange={(e) => updateProduct(index, 'distribution', e.target.value)}
                          min="0"
                          max="100"
                          step="1"
                        />
                      </div>
                    </div>
                    
                    {/* 每产品指标 */}
                    {productRevenues[index] !== undefined && (
                      <div className="grid grid-cols-2 gap-2 mt-3 bg-gray-50 p-2 rounded text-sm">
                        <div>
                          <span className="text-gray-600">月收入:</span>
                          <span className="font-medium ml-1">${Math.round(productRevenues[index]).toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">月利润:</span>
                          <span className="font-medium ml-1">${Math.round(productProfits[index]).toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-indigo-800 text-white p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-3">投资回报</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-80">年度利润</p>
                    <p className="text-2xl font-bold">${Math.round(annualProfit).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">投资回报率 (于$30,000)</p>
                    <p className="text-2xl font-bold">{Math.round(investmentROI)}%</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm opacity-80">平均利润率</p>
                    <p className="text-3xl font-bold">{avgProfitMargin.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 增长计划 */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-800">增长策略与整合</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-3">市场渗透时间线</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-bold mr-4">Q1</div>
                    <div>
                      <p className="font-medium">建立基础</p>
                      <p className="text-sm text-gray-600">0.5% 市场份额 • 基础服务提供</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold mr-4">Q2</div>
                    <div>
                      <p className="font-medium">优化运营</p>
                      <p className="text-sm text-gray-600">1.0% 市场份额 • 改善转化漏斗</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-800 font-bold mr-4">Q3</div>
                    <div>
                      <p className="font-medium">扩大营销</p>
                      <p className="text-sm text-gray-600">2.0% 市场份额 • 拓展合作伙伴关系</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-400 flex items-center justify-center text-indigo-800 font-bold mr-4">Q4</div>
                    <div>
                      <p className="font-medium">全面市场整合</p>
                      <p className="text-sm text-gray-600">3.0% 市场份额 • 完整服务套件</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-3">与主要旅游业务的协同</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">客户共享</td>
                      <td className="py-2">机场服务客户直接转化为主要旅游产品</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">营销效率</td>
                      <td className="py-2">共享营销资源降低客户获取成本</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">品牌建设</td>
                      <td className="py-2">机场服务作为建立信任的品牌"入口点"</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">运营规模</td>
                      <td className="py-2">共享后端系统和客户支持降低整体成本</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">数据洞察</td>
                      <td className="py-2">机场服务使用数据提供旅行偏好洞察</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-indigo-800 text-white py-6 px-6 rounded-lg">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold">卓越投资机会</h2>
                <p className="text-indigo-200">30-100% 利润率 • 官方数字500,000月度用户市场</p>
              </div>
              <div>
                <a 
                  href="https://wa.me/886919501892"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-indigo-800 px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-indigo-100 transition inline-flex items-center"
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

export default AirportServicesProposal;
