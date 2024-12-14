import { ResetPassword } from "@/new-types";
import httpClient from "@/helpers/httpClient";

export async function postResetPassword(data: Partial<ResetPassword>, tokenFromUrl: string) {
  return httpClient<ResetPassword>({
    method: 'POST',
    endpoint: '/auth/reset-password',
    data,
    headers: {
      ...(tokenFromUrl && { Authorization: `Bearer ${tokenFromUrl}` }),
    },
  });
}