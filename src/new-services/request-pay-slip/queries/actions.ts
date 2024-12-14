import httpClient from "@/helpers/httpClient";

export async function getPaySlip() {
  return httpClient({
    method: 'GET',
    endpoint: '/request-payment-confirmations',
  });
}