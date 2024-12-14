import httpClient from '@/helpers/httpClient';

export async function getAllRequests() {
  return httpClient({
    method: 'GET',
    endpoint: '/requests',
  });
}
