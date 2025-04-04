// Webhook配置
// 可以使用IFTTT或Zapier创建Webhook，将HTTP请求转发到WhatsApp

// 用户WhatsApp联系方式: +886919501892
// 用户邮箱: kellyliuyenling@icloud.com

export const WEBHOOK_CONFIG = {
  // 启用webhook通知
  ENABLED: true,
  
  // 您的IFTTT Webhook URL
  // 可在 https://ifttt.com/maker_webhooks 创建
  // 创建流程:
  // 1. 注册IFTTT账号
  // 2. 创建新Applet: If (Webhook接收数据) Then (发送WhatsApp消息)
  // 3. 使用Webhooks服务作为触发器，选择"Receive a web request"
  // 4. 事件名称设置为"login_event"
  // 5. 选择WhatsApp作为动作服务
  // 6. 消息内容可以设置为: "有人登录系统: {{Value1}} 于 {{Value3}}，登录状态: {{Value2}}"
  // 7. 获取您的IFTTT Webhook URL并填写到下面
  // 8. 访问 https://ifttt.com/maker_webhooks/settings 获取您的密钥
  // 9. 将下面URL中的YOUR_KEY替换为您的实际密钥
  WEBHOOK_URL: 'https://maker.ifttt.com/trigger/login_event/with/key/YOUR_KEY',
  
  // 用于安全验证的密钥(可选)
  SECRET_KEY: 'kelly-travel-login-security',
  
  // 设置通知类型
  // 'all': 所有登录尝试都发送通知
  // 'success': 只有成功登录才发送通知
  // 'failure': 只有失败登录才发送通知
  NOTIFICATION_TYPE: 'all'
}; 