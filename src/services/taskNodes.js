import request from "@/utils/request";

export async function queryTaskNodes(){
  return request("/task/nodes");
}

export async function queryTasks(name){
  return request(`/task/${name}`);
}

export async function saveTask(name, task){
  return request(`/task/${name}`, {
    method: 'POST',
    body: JSON.stringify(task)
  })
}
