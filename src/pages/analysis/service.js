import request from '@/utils/request';

export async function fakeChartData() {
  return request('/api/analysis/fake_chart_data');
}
