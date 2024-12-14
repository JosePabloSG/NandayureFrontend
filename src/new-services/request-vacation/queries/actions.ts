import httpClient from "@/helpers/httpClient";

export async function getVacation() {
  return httpClient({
    method: 'GET',
    endpoint: '/request-vacation',
  });
}