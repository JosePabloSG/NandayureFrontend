import { ForgotPassword } from "@/types";
import { EmailSendSchema } from "@/schemas";
import { useMutation } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import { z } from "zod";
import { postForgotPassword } from "@/new-services";

export type FormsFields = z.infer<typeof EmailSendSchema>;

export const useSendEmailMutation = (setError: UseFormSetError<FormsFields>) => {
  return useMutation({
    mutationFn: async (data: ForgotPassword) => await postForgotPassword(data),
    onError: (error: Error) => {
      setError('root', { message: error.message });
    }
  });
};