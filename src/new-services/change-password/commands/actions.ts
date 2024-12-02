import httpClient from "@/helpers/httpClient";
import { ChangePassword } from "@/new-types";

export async function postChangePassword(data: Partial<ChangePassword>) {
  return httpClient<ChangePassword>({
    method: 'POST',
    endpoint: '/change-password',
    data,
  });
}
