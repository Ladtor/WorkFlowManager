import request from '@/utils/request';

export async function get(serialNo, version, runVersion) {
  let url = `/workflow/${serialNo}`;
  if (version)
    url = `${url}/${version}`;
  if (runVersion)
    url = `${url}/${runVersion}`;

  return request(url);
}

export async function list() {
  return request('/workflow');
}

export async function search(keywords) {
  return request(`/workflow/search/${keywords}`);
}

export async function save(workflow) {
  return request('/workflow', {
    method: 'POST',
    body: JSON.stringify(workflow),
  });
}

export async function update(serialNo, version, graph) {
  return request(`/workflow/${serialNo}/${version}`, {
    method: 'PUT',
    body: JSON.stringify(graph),
  });
}

export async function del(serialNo) {
  return request(`/workflow/${serialNo}`, {
    method: 'DELETE',
  });
}

export async function execute(serialNo, params) {
  return request(`/workflow/execute/${serialNo}`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

export async function getExecuteLog(serialNo) {
  return request(`/workflow/executeLog/${serialNo}`);
}

export async function cron(serialNo, cronText) {
  return request(`/workflow/cron/${serialNo}}`, {
    method: 'POST',
    body: cronText
  });
}

export async function cancel(serialNo) {
  return request(`/workflow/cron/${serialNo}`, {
    method: 'DELETE'
  });
}
