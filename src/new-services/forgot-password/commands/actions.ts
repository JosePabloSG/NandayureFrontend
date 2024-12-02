import { ForgotPassword } from "@/new-types";
import httpClient from "@/helpers/httpClient";

export async function postForgotPassword(Email: ForgotPassword) {
  return httpClient<ForgotPassword>({
    method: 'POST',
    endpoint: '/auth/forgot-password',
    data: Email,
  });
}