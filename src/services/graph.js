import request from '@/utils/request';

export async function execute(serialNo, version, runVersion, nodeId, params) {
  return request(`/node/execute/${serialNo}/${version}/${runVersion}/${nodeId}`,{
    method: 'POST',
    data: params
  });
}

export async function success(serialNo, version, runVersion, nodeId, result) {
  return request(`/node/success/${serialNo}/${version}/${runVersion}/${nodeId}`,{
    method: 'POST',
    data: result
  });
}
