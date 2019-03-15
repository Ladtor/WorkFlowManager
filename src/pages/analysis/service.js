import request from '@/utils/request';

export async function fakeChartData() {
  return request('/analysis/fake_chart_data');
}
