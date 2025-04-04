import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EMAIL_CONFIG } from './emailConfig';
import { WEBHOOK_CONFIG } from './webhookConfig';

interface ConfigSettings {
  emailEnabled: boolean;
  emailService: string;
  emailTemplate: string;
  emailPublicKey: string;
  notificationEmail: string;
  webhookEnabled: boolean;
  webhookUrl: string;
  webhookSecretKey: string;
  notificationType: string;
}

const NotificationConfigPage: React.FC = () => {
  const [config, setConfig] = useState<ConfigSettings>({
    emailEnabled: EMAIL_CONFIG.NOTIFICATIONS_ENABLED,
    emailService: EMAIL_CONFIG.SERVICE_ID,
    emailTemplate: EMAIL_CONFIG.TEMPLATE_ID,
    emailPublicKey: EMAIL_CONFIG.PUBLIC_KEY,
    notificationEmail: EMAIL_CONFIG.NOTIFICATION_EMAIL,
    webhookEnabled: WEBHOOK_CONFIG.ENABLED,
    webhookUrl: WEBHOOK_CONFIG.WEBHOOK_URL,
    webhookSecretKey: WEBHOOK_CONFIG.SECRET_KEY,
    notificationType: WEBHOOK_CONFIG.NOTIFICATION_TYPE
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [webhookTestStatus, setWebhookTestStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
  }>({ loading: false });
  
  // 从localStorage加载配置
  useEffect(() => {
    const savedConfig = localStorage.getItem('notificationConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.error('Error parsing saved configuration:', error);
      }
    }
  }, []);
  
  // 保存更改
  const handleSave = () => {
    // 保存到localStorage
    localStorage.setItem('notificationConfig', JSON.stringify(config));
    
    // 显示成功消息
    setShowSuccess(true);
    
    // 3秒后隐藏成功消息
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  // 发送测试邮件
  const sendTestEmail = () => {
    if (!config.emailEnabled) {
      alert('请先启用邮件通知功能');
      return;
    }
    
    if (!config.emailService || !config.emailTemplate || !config.emailPublicKey || !config.notificationEmail) {
      alert('请填写完整的邮件配置信息');
      return;
    }
    
    // 临时导入EmailJS
    import('@emailjs/browser').then(emailjs => {
      const templateParams = {
        to_email: config.notificationEmail,
        user_email: '测试账户',
        login_status: '测试',
        login_time: new Date().toLocaleString('zh-CN'),
        ip_address: '测试IP',
        user_agent: navigator.userAgent
      };
      
      emailjs.send(
        config.emailService,
        config.emailTemplate,
        templateParams,
        config.emailPublicKey
      ).then(
        () => alert('测试邮件发送成功！请检查您的邮箱。'),
        (error) => alert(`测试邮件发送失败: ${error.text}`)
      );
    }).catch(error => {
      alert(`加载EmailJS失败: ${error}`);
    });
  };
  
  // 发送测试Webhook
  const sendTestWebhook = () => {
    if (!config.webhookEnabled) {
      alert('请先启用Webhook通知功能');
      return;
    }
    
    if (!config.webhookUrl) {
      alert('请填写Webhook URL');
      return;
    }
    
    // 如果URL仍然包含'YOUR_KEY'，提示用户替换
    if (config.webhookUrl.includes('YOUR_KEY')) {
      alert('请将Webhook URL中的YOUR_KEY替换为您的实际IFTTT密钥');
      return;
    }
    
    // 设置加载状态
    setWebhookTestStatus({ 
      loading: true, 
      message: '正在发送请求到IFTTT...' 
    });
    
    const webhookData = {
      value1: '测试账户',
      value2: '测试登录',
      value3: new Date().toLocaleString('zh-CN'),
      secretKey: config.webhookSecretKey
    };
    
    fetch(config.webhookUrl, {
      method: 'POST',
      body: JSON.stringify(webhookData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        setWebhookTestStatus({ 
          loading: false, 
          success: true,
          message: '测试消息已成功发送！请检查您的WhatsApp是否收到通知。'
        });
        
        // 5秒后清除状态
        setTimeout(() => {
          setWebhookTestStatus({ loading: false });
        }, 5000);
      } else {
        setWebhookTestStatus({ 
          loading: false, 
          success: false,
          message: `请求失败: ${response.statusText}。请确认您的IFTTT Webhook密钥是否正确。`
        });
      }
    })
    .catch(error => {
      setWebhookTestStatus({ 
        loading: false, 
        success: false,
        message: `发送请求时遇到错误: ${error.message}。请检查您的网络连接和IFTTT配置。`
      });
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">通知配置</h1>
          <Link 
            to="/" 
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            返回主页
          </Link>
        </div>
        
        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            配置已保存成功！注意：设置将在页面刷新后生效。
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">邮件通知设置</h2>
          
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={config.emailEnabled}
                onChange={(e) => setConfig({...config, emailEnabled: e.target.checked})}
              />
              <span className="ml-2">启用邮件通知</span>
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                EmailJS Service ID
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={config.emailService}
                onChange={(e) => setConfig({...config, emailService: e.target.value})}
                placeholder="service_xxxxxxxx"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                EmailJS Template ID
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={config.emailTemplate}
                onChange={(e) => setConfig({...config, emailTemplate: e.target.value})}
                placeholder="template_xxxxxxxx"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                EmailJS Public Key
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={config.emailPublicKey}
                onChange={(e) => setConfig({...config, emailPublicKey: e.target.value})}
                placeholder="XXXXXXXXXXXXXXXX"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                接收通知的邮箱
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={config.notificationEmail}
                onChange={(e) => setConfig({...config, notificationEmail: e.target.value})}
                placeholder="your-email@example.com"
              />
            </div>
          </div>
          
          <button
            onClick={sendTestEmail}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition mr-2"
          >
            发送测试邮件
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">WhatsApp通知设置 (Webhook)</h2>
          
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={config.webhookEnabled}
                onChange={(e) => setConfig({...config, webhookEnabled: e.target.checked})}
              />
              <span className="ml-2">启用Webhook通知</span>
            </label>
          </div>
          
          <div className="mb-5">
            <div className="bg-blue-50 p-3 rounded-md border border-blue-200 mb-4">
              <h3 className="text-sm font-semibold mb-2 text-blue-800">IFTTT设置指南：</h3>
              <ol className="text-sm text-blue-700 list-decimal pl-5 space-y-1">
                <li>访问 <a href="https://ifttt.com/join" target="_blank" className="text-blue-600 underline">IFTTT</a> 并创建账号</li>
                <li>创建新的Applet: 点击Create → If This → Webhooks → Receive a web request</li>
                <li>设置事件名称为 <strong>login_event</strong></li>
                <li>点击Then That → 选择WhatsApp服务</li>
                <li>设置消息内容为: "有人登录系统: {'{'}Value1{'}'} 于 {'{'}Value3{'}'}，登录状态: {'{'}Value2{'}'}"</li>
                <li>创建并激活Applet</li>
                <li>访问 <a href="https://ifttt.com/maker_webhooks/settings" target="_blank" className="text-blue-600 underline">Webhook设置</a> 获取您的API密钥</li>
                <li>将下方URL中的YOUR_KEY替换为您的密钥</li>
              </ol>
              
              <details className="mt-3">
                <summary className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium">
                  查看详细设置步骤 (带截图说明)
                </summary>
                <div className="mt-3 bg-white p-3 rounded-md border border-blue-100">
                  <h4 className="font-medium mb-2">详细IFTTT Webhook设置流程：</h4>
                  <ol className="list-decimal pl-5 space-y-3">
                    <li>
                      <strong>创建IFTTT账号</strong> - 访问 <a href="https://ifttt.com/join" target="_blank" className="text-blue-600 underline">https://ifttt.com/join</a> 并注册账号
                    </li>
                    <li>
                      <strong>创建新的Applet</strong>
                      <ul className="list-disc pl-5 mt-1">
                        <li>在IFTTT首页点击右上角的"Create"按钮</li>
                        <li>点击"If This"按钮开始设置触发条件</li>
                      </ul>
                    </li>
                    <li>
                      <strong>选择Webhooks服务</strong>
                      <ul className="list-disc pl-5 mt-1">
                        <li>在搜索框中输入"Webhooks"</li> 
                        <li>选择"Webhooks"服务</li>
                      </ul>
                    </li>
                    <li>
                      <strong>选择"Receive a web request"触发器</strong>
                      <ul className="list-disc pl-5 mt-1">
                        <li>这允许您的系统通过HTTP请求触发IFTTT</li>
                      </ul>
                    </li>
                    <li>
                      <strong>设置事件名称</strong>
                      <ul className="list-disc pl-5 mt-1">
                        <li>输入事件名称为 <code className="bg-gray-100 px-1 py-0.5 rounded">login_event</code></li>
                        <li>点击"Create trigger"按钮</li>
                      </ul>
                    </li>
                    <li>
                      <strong>设置WhatsApp动作</strong>
                      <ul className="list-disc pl-5 mt-1">
                        <li>点击"Then That"设置响应动作</li>
                        <li>搜索并选择"WhatsApp"服务</li>
                        <li>如果是首次使用，需要连接您的WhatsApp账户</li>
                        <li>设置接收者为您自己的WhatsApp号码</li>
                        <li>设置消息内容为: "有人登录系统: {'{'}Value1{'}'} 于 {'{'}Value3{'}'}，登录状态: {'{'}Value2{'}'}"</li>
                      </ul>
                    </li>
                    <li>
                      <strong>完成Applet创建</strong>
                      <ul className="list-disc pl-5 mt-1">
                        <li>点击"Create action"</li>
                        <li>给Applet起个名字，例如"登录系统通知"</li>
                        <li>点击"Finish"完成创建</li>
                      </ul>
                    </li>
                    <li>
                      <strong>获取Webhook URL</strong>
                      <ul className="list-disc pl-5 mt-1">
                        <li>访问 <a href="https://ifttt.com/maker_webhooks" target="_blank" className="text-blue-600 underline">https://ifttt.com/maker_webhooks</a></li>
                        <li>点击右上角的"Documentation"或访问 <a href="https://ifttt.com/maker_webhooks/settings" target="_blank" className="text-blue-600 underline">https://ifttt.com/maker_webhooks/settings</a></li>
                        <li>查看您的个人Webhook URL和密钥</li>
                        <li>您的Webhook URL格式为: <code className="bg-gray-100 px-1 py-0.5 rounded">https://maker.ifttt.com/trigger/login_event/with/key/YOUR_KEY</code></li>
                        <li>将URL中的<code className="bg-gray-100 px-1 py-0.5 rounded">YOUR_KEY</code>替换为您的实际密钥</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </details>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Webhook URL (IFTTT/Zapier)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={config.webhookUrl}
              onChange={(e) => setConfig({...config, webhookUrl: e.target.value})}
              placeholder="https://maker.ifttt.com/trigger/login_event/with/key/YOUR_KEY"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Webhook Secret Key (可选)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={config.webhookSecretKey}
                onChange={(e) => setConfig({...config, webhookSecretKey: e.target.value})}
                placeholder="your-secret-key"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                通知类型
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={config.notificationType}
                onChange={(e) => setConfig({...config, notificationType: e.target.value})}
              >
                <option value="all">所有登录尝试</option>
                <option value="success">仅成功登录</option>
                <option value="failure">仅失败登录</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={sendTestWebhook}
            className={`px-4 py-2 ${webhookTestStatus.loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white rounded transition`}
            disabled={webhookTestStatus.loading}
          >
            {webhookTestStatus.loading ? '发送中...' : '发送测试Webhook'}
          </button>
          
          {webhookTestStatus.message && (
            <div className={`mt-3 p-3 rounded-md ${
              webhookTestStatus.success ? 'bg-green-50 text-green-700 border border-green-200' : 
              'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {webhookTestStatus.message}
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationConfigPage; 