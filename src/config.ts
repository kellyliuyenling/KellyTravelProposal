// 登录凭据配置
// 在此处设置用户的电子邮件和密码

// 定义凭据对象类型
interface Credentials {
  [email: string]: string;
}

export const AUTH_CONFIG = {
  // 允许访问网站的电子邮件和密码
  // 可以设置多个账户（格式为： 'email@example.com': 'password'）
  credentials: {
    'demo@example.com': 'password123',
    'kellyliuyenling@icloud.com': 'admin',
    'Alanphua@virtuepm.vn': 'yourthebest',
    'williamhsu7111@gmail.com': 'gogogo',
    // 添加更多账户，例如:
    // 'client@company.com': 'securepassword',
  } as Credentials
}; 