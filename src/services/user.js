import request from '@/utils/request';

export async function query() {
  return request('/users');
}

export async function queryCurrent() {
  return request('/currentUser');
}

export async function queryNotices() {
  return request('/notices');
}
