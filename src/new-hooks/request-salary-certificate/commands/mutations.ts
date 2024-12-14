import { postSalaryCertificate } from "@/new-services";
import { RequestSalaryCertificate } from "@/new-types";
import { SalaryCertificateSchema } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import { z } from "zod";

export type FormsFields = z.infer<typeof SalaryCertificateSchema>;

export const useCreateSalaryCertificateMutation = (
  setError: UseFormSetError<FormsFields>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RequestSalaryCertificate) => 
      await postSalaryCertificate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getCurrentToApprove'],
      });
    },
    onError: (error: Error) => {
      setError('root', { message: error.message });
    }
  });
};