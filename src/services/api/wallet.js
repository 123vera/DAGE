import { onlinePost } from '../utils';

// 获取站内还是站外提币及手续费比例
// address 钱包地址
// openId 用户openid
export function getServiceCharge(address) {
  return onlinePost('/userasset/walletforaddress', { address });
}

// 提币申请初始化
// type 提币类型，usdt|dgt
// openId 用户openid
export function withdrawInit(type) {
  return onlinePost('/userasset/cashini', { type });
}


