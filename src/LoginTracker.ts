// 登录追踪功能
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { EMAIL_CONFIG } from './emailConfig';
import { WEBHOOK_CONFIG } from './webhookConfig';

// 登录记录接口
export interface LoginRecord {
  email: string;
  timestamp: Date;
  success: boolean;
}

// 从localStorage获取配置
const getConfig = () => {
  const savedConfig = localStorage.getItem('notificationConfig');
  if (savedConfig) {
    try {
      return JSON.parse(savedConfig);
    } catch (error) {
      console.error('Error parsing saved configuration:', error);
    }
  }
  
  // 如果没有保存的配置或解析出错，使用默认配置
  return {
    emailEnabled: EMAIL_CONFIG.NOTIFICATIONS_ENABLED,
    emailService: EMAIL_CONFIG.SERVICE_ID,
    emailTemplate: EMAIL_CONFIG.TEMPLATE_ID,
    emailPublicKey: EMAIL_CONFIG.PUBLIC_KEY,
    notificationEmail: EMAIL_CONFIG.NOTIFICATION_EMAIL,
    webhookEnabled: WEBHOOK_CONFIG.ENABLED,
    webhookUrl: WEBHOOK_CONFIG.WEBHOOK_URL,
    webhookSecretKey: WEBHOOK_CONFIG.SECRET_KEY,
    notificationType: WEBHOOK_CONFIG.NOTIFICATION_TYPE
  };
};

// 发送Webhook通知 (可用于WhatsApp通知)
const sendWebhookNotification = (email: string, success: boolean): void => {
  // 获取最新配置
  const config = getConfig();
  
  // 如果Webhook通知被禁用，直接返回
  if (!config.webhookEnabled) {
    return;
  }
  
  // 根据配置检查是否需要发送此类型的通知
  if (
    (config.notificationType === 'success' && !success) ||
    (config.notificationType === 'failure' && success)
  ) {
    return;
  }
  
  // 获取当前时间
  const now = new Date();
  const dateTimeStr = now.toLocaleString('zh-CN');
  
  // 准备发送的数据
  const webhookData = {
    value1: email, // 用户邮箱
    value2: success ? '成功' : '失败', // 登录状态
    value3: dateTimeStr, // 登录时间
    secretKey: config.webhookSecretKey // 安全密钥
  };
  
  // 发送Webhook请求
  fetch(config.webhookUrl, {
    method: 'POST',
    body: JSON.stringify(webhookData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      console.log('Webhook notification sent successfully');
    } else {
      console.error('Failed to send webhook notification:', response.statusText);
    }
  })
  .catch(error => {
    console.error('Error sending webhook notification:', error);
  });
};

// 发送登录通知邮件
const sendLoginNotification = (email: string, success: boolean): void => {
  // 获取最新配置
  const config = getConfig();
  
  // 如果通知功能被禁用，直接返回
  if (!config.emailEnabled) {
    return;
  }
  
  // 获取当前时间和日期的格式化字符串
  const now = new Date();
  const dateTimeStr = now.toLocaleString('zh-CN');
  
  // IP地址获取（仅示例，实际上可能不准确）
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const ipAddress = data.ip;
      
      // 准备发送的模板参数
      const templateParams = {
        to_email: config.notificationEmail,
        user_email: email,
        login_status: success ? '成功' : '失败',
        login_time: dateTimeStr,
        ip_address: ipAddress || '未知',
        user_agent: navigator.userAgent
      };
      
      // 使用EmailJS发送邮件
      emailjs.send(
        config.emailService,
        config.emailTemplate,
        templateParams,
        config.emailPublicKey
      ).then(
        (result: EmailJSResponseStatus) => {
          console.log('Login notification sent successfully');
        },
        (error: any) => {
          console.error('Failed to send login notification:', error);
        }
      );
    })
    .catch(error => {
      console.error('Error fetching IP:', error);
      // 即使获取IP失败，仍尝试发送通知
      sendNotificationWithoutIP(email, success, dateTimeStr);
    });
};

// 备用函数 - 在无法获取IP时使用
const sendNotificationWithoutIP = (email: string, success: boolean, dateTimeStr: string): void => {
  // 获取最新配置
  const config = getConfig();
  
  const templateParams = {
    to_email: config.notificationEmail,
    user_email: email,
    login_status: success ? '成功' : '失败',
    login_time: dateTimeStr,
    ip_address: '未能获取',
    user_agent: navigator.userAgent
  };
  
  emailjs.send(
    config.emailService,
    config.emailTemplate,
    templateParams,
    config.emailPublicKey
  ).then(
    (result: EmailJSResponseStatus) => {
      console.log('Login notification sent successfully');
    },
    (error: any) => {
      console.error('Failed to send login notification:', error);
    }
  );
};

// 存储登录记录
export const saveLoginRecord = (email: string, success: boolean): void => {
  const newRecord: LoginRecord = {
    email,
    timestamp: new Date(),
    success
  };
  
  // 从localStorage获取现有记录
  const existingRecordsJSON = localStorage.getItem('loginRecords');
  const existingRecords: LoginRecord[] = existingRecordsJSON 
    ? JSON.parse(existingRecordsJSON)
    : [];
  
  // 添加新记录
  existingRecords.push(newRecord);
  
  // 保存回localStorage（只保留最近的50条记录）
  const recentRecords = existingRecords.slice(-50);
  localStorage.setItem('loginRecords', JSON.stringify(recentRecords));
  
  // 发送登录通知邮件
  sendLoginNotification(email, success);
  
  // 发送Webhook通知（WhatsApp）
  sendWebhookNotification(email, success);
};

// 获取所有登录记录
export const getLoginRecords = (): LoginRecord[] => {
  const recordsJSON = localStorage.getItem('loginRecords');
  return recordsJSON ? JSON.parse(recordsJSON) : [];
};

// 清除所有登录记录
export const clearLoginRecords = (): void => {
  localStorage.removeItem('loginRecords');
}; 