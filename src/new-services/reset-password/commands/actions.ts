import { ResetPassword } from "@/new-types";
import httpClient from "@/helpers/httpClient";

export async function postResetPassword(data: Partial<ResetPassword>) {
  return httpClient<ResetPassword>({
    method: 'POST',
    endpoint: '/auth/reset-password',
    data,
  });
}