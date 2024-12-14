import httpClient from "@/helpers/httpClient";

export async function getRequestHistory(employeeId: string) {
  return httpClient({
    method: 'GET',
    endpoint: `/requests/${employeeId}`,
  });
}