import { RequestPaySlip } from "@/new-types";
import httpClient from "@/helpers/httpClient";

export async function postPaySlip(data: Partial<RequestPaySlip>) {
  return httpClient<RequestPaySlip>({
    method: 'POST',
    endpoint: '/request-payment-confirmations',
    data,
  });
}