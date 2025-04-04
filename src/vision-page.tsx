import React, { useState, useEffect, useRef } from 'react';
import Layout from './Layout';

const GlobalTourismVision: React.FC = () => {
  // Animation state control
  const [isVisible, setIsVisible] = useState({
    header: false,
    challenge: false,
    opportunity: false,
    vision: false,
    stats: false,
    cta: false
  });
  
  // Store section references with useRef
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
    header: null,
    challenge: null,
    opportunity: null,
    vision: null,
    stats: null,
    cta: null
  });
  
  // Improved scroll animation with Intersection Observer API
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.getAttribute('data-section');
          if (sectionName) {
            setIsVisible(prev => ({ ...prev, [sectionName]: true }));
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all section elements
    Object.entries(sectionRefs.current).forEach(([_, ref]) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Animation class helper
  const fadeInClass = (section: string, delay: string = '') => {
    return isVisible[section as keyof typeof isVisible] 
      ? `opacity-100 transform translate-y-0 ${delay}`
      : 'opacity-0 transform translate-y-10';
  };
  
  // Set animation duration based on content complexity
  const getAnimationDuration = (section: string) => {
    const durations: {[key: string]: string} = {
      header: 'duration-1000',
      challenge: 'duration-1200',
      opportunity: 'duration-1200',
      vision: 'duration-800',
      stats: 'duration-1500',
      cta: 'duration-700'
    };
    return durations[section] || 'duration-1000';
  };

  // Set section reference
  const setSectionRef = (element: HTMLDivElement | null, section: string) => {
    if (element) {
      sectionRefs.current[section] = element;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8 w-full">
          {/* Header Section */}
          <div 
            ref={(el) => setSectionRef(el, 'header')}
            className={`transition ${getAnimationDuration('header')} ease-out ${fadeInClass('header')}`}
            data-section="header"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                全球旅游的黄金时代：蓄势待发
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">洞悉全球经济变局，把握高端旅游的蓬勃增长机遇</p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mb-8"></div>
          </div>

          {/* Top Sections: Challenges and Market Forecast side by side */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Challenges Section - With floating effect */}
            <div 
              ref={(el) => setSectionRef(el, 'challenge')}
              className={`transition ${getAnimationDuration('challenge')} ease-out delay-300 ${fadeInClass('challenge')}`}
              data-section="challenge"
            >
              <div className="bg-white rounded-lg shadow-lg p-6 h-full border-l-4 border-gray-300 hover:shadow-xl transform transition duration-500 hover:-translate-y-1 hover:border-l-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">全球经济新常态下的挑战</h2>
                
                <div className="space-y-4">
                  <div className="p-3 border-l-3 border-gray-300 transition duration-300 hover:border-l-4 hover:border-gray-400 hover:bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">地缘政治风险</h3>
                    <p className="text-gray-600 text-sm">
                      全球地缘政治紧张局势升级，导致旅客改变目的地选择或延迟旅行计划，影响消费者信心和投资决策
                    </p>
                  </div>
                  
                  <div className="p-3 border-l-3 border-gray-300 transition duration-300 hover:border-l-4 hover:border-gray-400 hover:bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">传统产业增长放缓</h3>
                    <p className="text-gray-600 text-sm">
                      制造业、房地产等传统增长引擎面临挑战，增长动能减弱，迫使投资者寻找高增长领域
                    </p>
                  </div>
                  
                  <div className="p-3 border-l-3 border-gray-300 transition duration-300 hover:border-l-4 hover:border-gray-400 hover:bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">通货膨胀压力</h3>
                    <p className="text-gray-600 text-sm">
                      全球面临持续通胀，生活成本上升，但同时促使富裕人群寻求更高品质的生活体验与深度旅游
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700 font-medium text-center text-sm">
                    然而，每一次变革都蕴藏着新的机遇。旅游业，尤其是高端旅游，正展现出前所未有的潜力...
                  </p>
                </div>
              </div>
            </div>
            
            {/* Stats Section - With floating effect */}
            <div 
              ref={(el) => setSectionRef(el, 'stats')}
              className={`transition ${getAnimationDuration('stats')} ease-out delay-300 ${fadeInClass('stats')}`}
              data-section="stats"
            >
              <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden border-l-4 border-blue-500 hover:shadow-xl transform transition duration-500 hover:-translate-y-1 hover:border-l-6">
                <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900">全球旅游市场预测</h2>
                </div>
                
                <div className="p-6 flex flex-col h-[calc(100%-56px)] justify-between">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:bg-blue-50 hover:shadow">
                      <div className="text-4xl font-bold text-blue-600 mb-3">+7.8%</div>
                      <h3 className="font-semibold text-gray-800 text-sm">全球旅游市场年增长率</h3>
                      <p className="text-xs text-gray-500 mt-1">预计2025年国际游客增长3-5%</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:bg-blue-50 hover:shadow">
                      <div className="text-4xl font-bold text-blue-600 mb-3">+34.2%</div>
                      <h3 className="font-semibold text-gray-800 text-sm">高端自驾体验市场增长</h3>
                      <p className="text-xs text-gray-500 mt-1">豪华汽车租赁市场年复合增长率9.4%</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:bg-blue-50 hover:shadow">
                      <div className="text-4xl font-bold text-blue-600 mb-3">+28.1%</div>
                      <h3 className="font-semibold text-gray-800 text-sm">可持续旅游需求增长</h3>
                      <p className="text-xs text-gray-500 mt-1">消费者日益关注环保与负责任旅行</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:bg-blue-50 hover:shadow">
                      <div className="text-4xl font-bold text-blue-600 mb-3">+18.4%</div>
                      <h3 className="font-semibold text-gray-800 text-sm">健康旅游市场增长</h3>
                      <p className="text-xs text-gray-500 mt-1">预计2027年达1.4万亿美元规模</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-700 font-medium text-center text-sm">
                      数据来源：
                      <a href="https://www.unwto.org/tourism-data/un-tourism-world-tourism-barometer-data" target="_blank" className="text-blue-600 hover:underline ml-1">UNWTO全球旅游展望报告</a>、
                      <a href="https://wttc.org/research/economic-impact" target="_blank" className="text-blue-600 hover:underline ml-1">WTTC全球经济影响报告</a>、
                      <a href="https://www.globalwellnessinstitute.org/" target="_blank" className="text-blue-600 hover:underline ml-1">Global Wellness Institute</a>、
                      <a href="https://www.americanexpress.com/en-us/travel/discover/get-inspired/global-travel-trends" target="_blank" className="text-blue-600 hover:underline ml-1">American Express Travel Trends</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Opportunities Section - Enhanced with hover effects and updated data */}
          <div 
            ref={(el) => setSectionRef(el, 'opportunity')}
            className={`transition ${getAnimationDuration('opportunity')} ease-out delay-500 ${fadeInClass('opportunity')}`}
            data-section="opportunity"
          >
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border-l-4 border-blue-500 hover:shadow-xl transition duration-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">高端旅游：经济不确定性中的增长引擎</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-blue-700 mb-4">为何高端旅游将逆势上扬？</h3>
                  <div className="space-y-4">
                    <div className="flex items-start p-3 rounded-lg transition duration-300 hover:bg-blue-50 hover:shadow">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-700 mr-3 mt-0.5 flex-shrink-0">✓</span>
                      <div>
                        <strong>高端旅游支出稳步提升</strong>
                        <p className="text-gray-600 text-sm">美国运通(Amex)报告显示，2024年大部分受访者计划增加或维持旅行支出，欧洲有62%的超高净值人士计划增加在豪华住宿和独特旅行体验上的支出</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-3 rounded-lg transition duration-300 hover:bg-blue-50 hover:shadow">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-700 mr-3 mt-0.5 flex-shrink-0">✓</span>
                      <div>
                        <strong>旅游市场全面复苏增长</strong>
                        <p className="text-gray-600 text-sm">UNWTO数据显示2024年国际旅客人数已恢复至疫情前水平，2025年将继续增长3-5%，WTTC预测旅游业经济贡献将创历史新高</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-3 rounded-lg transition duration-300 hover:bg-blue-50 hover:shadow">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-700 mr-3 mt-0.5 flex-shrink-0">✓</span>
                      <div>
                        <strong>深度旅游与体验定制需求激增</strong>
                        <p className="text-gray-600 text-sm">全球定制旅游市场年复合增长率达17.8%，预计2025年规模将达4470亿美元，高端旅客不再追求物质享受，更注重独特、真实且个人化的体验</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6 transition duration-300 hover:shadow-lg">
                  <h3 className="text-xl font-bold text-indigo-800 mb-4">AI浪潮：旅游业的超级催化剂</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    与普遍担忧不同，AI实际上将<strong>大幅提升</strong>人类的旅行需求：
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start bg-white bg-opacity-50 p-3 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-md hover:bg-blue-50">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-700 mr-3 mt-0.5 flex-shrink-0">→</span>
                      <div>
                        <strong>工作效率提升</strong>
                        <p className="text-gray-600 text-sm">AI提高工作效率，为人们创造更多休闲时间</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start bg-white bg-opacity-50 p-3 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-md hover:bg-blue-50">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-700 mr-3 mt-0.5 flex-shrink-0">→</span>
                      <div>
                        <strong>四天工作制</strong>
                        <p className="text-gray-600 text-sm">全球多国已开始试行，将创造更多长周末旅行需求</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start bg-white bg-opacity-50 p-3 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-md hover:bg-blue-50">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-700 mr-3 mt-0.5 flex-shrink-0">→</span>
                      <div>
                        <strong>人类体验需求</strong>
                        <p className="text-gray-600 text-sm">AI时代，真实的人际互动和体验将变得更加珍贵</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Section - Enhanced with better hover effects and updated content */}
          <div className="mb-12">
            {/* Vision Section - Redesigned */}
            <div 
              ref={(el) => setSectionRef(el, 'vision')}
              className={`transition ${getAnimationDuration('vision')} ease-out delay-700 ${fadeInClass('vision')}`}
              data-section="vision"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t border-blue-100 hover:shadow-xl transition duration-500">
                <div className="px-6 py-5 bg-gray-50 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800">我们的战略愿景</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-5 rounded-lg hover:shadow-md transition duration-300">
                      <h3 className="font-bold text-lg text-gray-800 mb-3">市场机遇</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start bg-white p-3 rounded-lg transition duration-300 hover:shadow hover:bg-blue-50">
                          <svg className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                          <div>
                            <p className="text-gray-700">旅游市场处于疫后复苏反弹<span className="font-semibold">重启黄金期</span>，根据UNWTO预测，2025-2030年将是建立品牌的关键窗口期</p>
                            <p className="text-xs text-gray-500 mt-1">国际旅游运输协会报告显示，旅游市场復甦速度超出预期</p>
                          </div>
                        </li>
                        <li className="flex items-start bg-white p-3 rounded-lg transition duration-300 hover:shadow hover:bg-blue-50">
                          <svg className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                          <div>
                            <p className="text-gray-700">高净值人群增长率达<span className="font-semibold">12.8%</span>，凯捷全球财富报告显示高端旅游需求持续强劲增长</p>
                            <p className="text-xs text-gray-500 mt-1">Knight Frank报告指出，89%的百万富翁计划在2025年增加豪华旅行支出</p>
                          </div>
                        </li>
                        <li className="flex items-start bg-white p-3 rounded-lg transition duration-300 hover:shadow hover:bg-blue-50">
                          <svg className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                          <div>
                            <p className="text-gray-700">成熟技术和运营模式，<span className="font-semibold">大幅节省启动成本和时间</span>，实现3-6周快速进入市场</p>
                            <p className="text-xs text-gray-500 mt-1">独家技术，8倍量能客制化全球旅游计画</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-5 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-md hover:bg-blue-100">
                        <h3 className="font-bold text-blue-800 text-lg">创新高端自驾</h3>
                        <p className="text-sm text-gray-600 mt-2">
                          精选全球顶级自驾线路，结合豪华住宿、美食体验和专属活动，打造沉浸式高品质体验
                        </p>
                        <div className="w-12 h-1 bg-blue-400 mx-auto mt-3"></div>
                      </div>
                      
                      <div className="bg-blue-50 p-5 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-md hover:bg-blue-100">
                        <h3 className="font-bold text-blue-800 text-lg">回归自然体验</h3>
                        <p className="text-sm text-gray-600 mt-2">
                          探寻远离人工痕迹的纯净目的地，在保持高品质服务的同时，让旅客与自然深度连接，感受真实与宁静
                        </p>
                        <div className="w-12 h-1 bg-blue-400 mx-auto mt-3"></div>
                      </div>
                      
                      <div className="bg-blue-50 p-5 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-md hover:bg-blue-100">
                        <h3 className="font-bold text-blue-800 text-lg">健康与养生</h3>
                        <p className="text-sm text-gray-600 mt-2">
                          与顶级养生机构合作，融入健康管理、疗养体验和身心重置项目，满足后疫情时代需求
                        </p>
                        <div className="w-12 h-1 bg-blue-400 mx-auto mt-3"></div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 mt-4">
                      <p className="text-center text-blue-700 font-medium">
                        我们的战略定位：<span className="font-bold">体验式奢华旅游的引领者</span> — 创造独特、真实且个性化的高端旅行体验
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section - Enhanced with better effects and updated content */}
          <div 
            ref={(el) => setSectionRef(el, 'cta')}
            className={`transition ${getAnimationDuration('cta')} ease-out delay-1000 ${fadeInClass('cta')}`}
            data-section="cta"
          >
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-lg shadow-xl p-8 text-white hover:shadow-2xl transform transition duration-500 hover:-translate-y-1">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">全球高端旅游投资与战略合作</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-white bg-opacity-10 p-6 rounded-lg transform transition duration-500 hover:scale-105 hover:bg-opacity-20 hover:shadow-lg">
                    <div className="text-4xl text-white font-bold mb-2">3-6周</div>
                    <h3 className="text-xl font-semibold">快速启动</h3>
                    <p className="text-white text-opacity-90 text-sm mt-2">
                      从合作洽谈到业务启动，我们提供完整的技术、运营和市场支持，快速进入市场
                    </p>
                    <div className="w-12 h-1 bg-white bg-opacity-30 mt-4"></div>
                  </div>
                  
                  <div className="bg-white bg-opacity-10 p-6 rounded-lg transform transition duration-500 hover:scale-105 hover:bg-opacity-20 hover:shadow-lg">
                    <div className="text-4xl text-white font-bold mb-2">30%+</div>
                    <h3 className="text-xl font-semibold">利润率</h3>
                    <p className="text-white text-opacity-90 text-sm mt-2">
                      高端旅游产品平均利润率远超传统旅游业，数字化运营进一步提升盈利能力
                    </p>
                    <div className="w-12 h-1 bg-white bg-opacity-30 mt-4"></div>
                  </div>
                  
                  <div className="bg-white bg-opacity-10 p-6 rounded-lg transform transition duration-500 hover:scale-105 hover:bg-opacity-20 hover:shadow-lg">
                    <div className="text-4xl text-white font-bold mb-2">24个月</div>
                    <h3 className="text-xl font-semibold">投资回报期</h3>
                    <p className="text-white text-opacity-90 text-sm mt-2">
                      根据我们的实际运营数据，平均投资回收期为18-24个月，显著低于行业平均水平
                    </p>
                    <div className="w-12 h-1 bg-white bg-opacity-30 mt-4"></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-white text-opacity-90 mb-6 max-w-2xl mx-auto">
                    立足当下，布局未来。把握旅游业黄金十年的战略机遇，与我们一起创造非凡价值。
                  </p>
                  
                  <a 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('https://wa.me/886919501892', '_blank');
                    }}
                    className="bg-white text-blue-800 px-10 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-blue-50 transition inline-flex items-center transform hover:scale-105"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 mr-4 fill-current text-green-600">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                    </svg>
                    <span>联系我们</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default GlobalTourismVision;