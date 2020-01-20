// 常用数据验证规则
export const REG = {
  MOBILE: /^[0-9]{7,16}$/,
  EMAIL: /^[\w-.]+@([\w-]+\.)+[a-zA-Z]+$/,
  PASSWORD: /^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{8,16}$/, // 8-16 位英文和数字（英文数字都要有，忽略大小写）
  // PASSWORD: /^(?!\d+$)(?![A-Za-z]+$)(?![A-Z0-9]+$)(?![a-z0-9]+$)[a-zA-Z0-9]{8,16}$/,  // 8-16 位英文和数字（英文数字都要有，且必须包含大小写）
  // PASSWORD: /^[a-zA-Z0-9]{8,16}$/,  // 8-16 位英文和数字（只验证位数）
  // WALLET_REMARK: /^[a-zA-Z0-9]{3,42}$/,  // 3-42 位英文和数字（只验证位数）
  WALLET_ADDRESS: /^(?=[0-9a-z\-.]*$)/, // 3-42位小写字母、数字、中划线(-)、点(.) 4种类型
  WALLET_REMARK: /^(?=[0-9a-zA-Z]*$)/, // 3-42 位英文和数字（只验证位数）
  NUMBER: /^-?\d+(.\d+)?$/,
  IDCARD: /^[a-z0-9A-Z]+$/,
  URL: /^https?:\/\//,
  IP: /^([0-9]{1,3})(\.[0-9]{1,3}){3}$/,
  GOOGLE_AUTH: /^[0-9]{6}$/,
  WALLET: /^[a-zA-Z0-9]{20,100}$/,
  ETH_WALLET: /^0(x|X)[0-9a-fA-F]{40}$/,
  BTC_WALLET_1: /^1[0-9a-zA-Z]{25,33}$/,
  BTC_WALLET_3: /^3[0-9a-zA-Z]{33}$/,
};
