import Request from '../request';

export function getUserInfoStatus() {
  return Request.get('/api/v1/bankcard/infostatus');
}
