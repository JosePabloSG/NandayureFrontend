import httpClient from "@/helpers/httpClient";
import { RequestVacation } from "@/new-types";

export async function postRequestVacation(data: Partial<RequestVacation>) {
  return httpClient<RequestVacation>({
    method: 'POST',
    endpoint: '/request-vacation',
    data,
  });
}