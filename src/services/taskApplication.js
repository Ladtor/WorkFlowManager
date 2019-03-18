import { build } from "@/utils/request";

const { get, post } = build('/taskApplication');

export async function queryTaskApplications() {
  return get();
}

export async function saveApplication(application) {
  return post(application);
}
