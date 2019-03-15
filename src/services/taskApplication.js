import { build } from "@/utils/request";

const { get, post } = build('/taskApplication');

export async function queryTaskApplications() {
  return get();
}

export async function saveApplication(application) {
  return post(application);
}

export async function queryTasks(name) {
  return get(`/${name}`);
}

export async function saveTask(name, task) {
  return post(`/${name}`, task);
}
