import httpClient from "@/helpers/httpClient";

export async function getSalaryCertificate() {
  return httpClient({
    method: 'GET',
    endpoint: '/request-salary-certificates',
  });
}