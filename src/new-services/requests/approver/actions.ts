import httpClient from "@/helpers/httpClient";

export async function getPendingApprovals() {
  return httpClient({
    method: 'GET',
    endpoint: '/request-approvals/currentToApprove',
  });
}

export async function processApproval(id: number, data: { approved: boolean; observation: string }) {
  return httpClient({
    method: 'PATCH',
    endpoint: `/request-approvals/${id}`,
    data,
  });
}