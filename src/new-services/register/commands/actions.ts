import { Employee } from "@/new-types";
import httpClient from "@/helpers/httpClient";

export async function postEmployee(data: Partial<Employee>) {
  return httpClient<Employee>({
    method: 'POST',
    endpoint: '/employees',
    data,
  });
}