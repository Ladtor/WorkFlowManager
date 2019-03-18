import { build } from '@/utils/request';

const { get, post } = build("/task");

export async function taskList() {
  return get();
}

export async function queryTasks(name) {
  return get(`/${name}`);
}

export async function saveTask(name, task) {
  return post(`/${name}`, task);
}
