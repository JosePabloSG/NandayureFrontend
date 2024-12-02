import { postChangePassword } from "@/new-services";
import { ChangePassword } from "@/new-types";
import { ChangePasswordSchema } from "@/schemas";
import { useMutation } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import { z } from "zod";

export type FormsFields = z.infer<typeof ChangePasswordSchema>;

export const useChangePasswordMutation = (setError: UseFormSetError<FormsFields>) => {
  return useMutation({
    mutationFn: async (data: ChangePassword) => await postChangePassword(data),
    onError: (error: Error) => {
      setError('root', { message: error.message });
    }
  });
};


