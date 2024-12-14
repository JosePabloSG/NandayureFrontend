import { ResetPassword } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import { z } from "zod";
import { ResetPasswordSchema } from "@/schemas";
import { postResetPassword } from "@/new-services";

export type FormsFields = z.infer<typeof ResetPasswordSchema>;

export const useResetPasswordMutation = (
  setError: UseFormSetError<FormsFields>,
  token: string
) => {
  return useMutation({
    mutationFn: async (data: ResetPassword) => await postResetPassword(data, token),
    onError: (error: Error) => {
      setError('root', { message: error.message });
    }
  });
};