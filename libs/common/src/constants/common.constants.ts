/**
 * 全局常量的定义
 */
export const UserConstants = {
  DEFAULT_AVATAR:
    'http://imgs.sunofbeaches.com/group1/M00/00/40/rBsADWAYITCAJpK1AABZPRa3kCo649.png', // 默认头像
  USER_STATE: [
    {
      statusNum: '0',
      statusName: '账户未审核',
    },
    {
      statusNum: '1',
      statusName: '账户有效',
    },
    {
      statusNum: '2',
      statusName: '账户已冻结',
    },
  ],
  // token的key
  TOKEN_KEY: 'token_key_',
  // 盐值的key
  SALT_KEY: 'salt_key_',
  // 摸鱼君cookie的key
  FISHER_COOKIE_KEY: 'fisher_cookie_key_',
  // 邮箱验证码的key
  FISHER_EMAIL_KEY: 'fisher_email_key_',
  // 验证码的后缀
  FISHER_VERIFY_KEY: 'fisher_verify_key_',
  // 验证码配置
  CAPTCHA_OPTION: {
    size: 6, // 数字长度
    ignoreChars: '0oO1ilI', // 忽略字符串
    noise: 1, // 干扰线
    fontSize: 42, // 字体大小
    width: 120, // 宽度
    height: 34, // 高度
    color: true,
    // background: '#cc9966',
  },
  LOGIN_FROM: {
    PC: 'PC', // pc
    ANDROID: 'Android', // 安卓
    IOS: 'IOS', // ios
    LINUX: 'LINUX', // Linux
  },
};

/**
 * 常用设置数据
 */
export const AppSettingConstants = {
  DEFAULT: {
    userId: '',
    language: 'zhCN',
    themeColor: '#ec14c9',
    fontSize: 14,
    borderRadius: 4,
    key: 'default',
    value: '',
  },
};
