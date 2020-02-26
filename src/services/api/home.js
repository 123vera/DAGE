import Request from '../request';

export function getNoticelist(params) {
  return Request.get('/other/noticelist', { params });
}
