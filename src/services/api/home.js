import Request from '../request';

export function getNoticelist(params) {
  return Request.post('/other/noticelist', params);
}
