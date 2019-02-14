import request from '@/utils/request';
export async function taskList() {
  return request('/task');
}
