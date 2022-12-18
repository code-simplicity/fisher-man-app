/**
 * 全局常量的定义
 */
export const UserConstants = {
  // 默认头像
  DEFAULT_AVATAR:
    'http://imgs.sunofbeaches.com/group1/M00/00/40/rBsADWAYITCAJpK1AABZPRa3kCo649.png',
  // 用户的枚举状态
  USER_STATE_ENUM: {
    // 未激活
    NOT_ACTIVATE: 0,
    // 普通用户
    COMMON: 1,
    // 管理员
    ADMIN: 2,
    // 已拉黑
    SHIELDING: 3,
    // 冻结中
    FREEZE: 4,
  },
  // 用户状态
  USER_STATE: [
    {
      state: 0,
      stateName: '账户未激活，等管理员激活才可以使用',
    },
    {
      state: 3,
      stateName: '账户已拉黑',
    },
    {
      state: 4,
      stateName: '账户已冻结',
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
  // 删除标识
  USER_DELETED: {
    // 未删除
    UNDELETE: 0,
    // 已删除（逻辑） 其实是被禁用或者拉黑
    DELETED: 1,
    // 物理删除
    REAL_DELETED: 2,
  },
  // 性别
  USER_SEX: {
    FEMALE: '女',
    MALE: '男',
    UNKNOWN: '未知',
  },
  // 用户配置初始值
  USER_INFO_CONFIG: {
    // 公司地址
    COMPANY_ADDRESS: '加里敦',
    // 职位
    POSITION: '无业游民',
    //擅长
    GOOD_AT: '唱跳rap篮球',
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
