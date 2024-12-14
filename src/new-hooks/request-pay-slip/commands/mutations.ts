import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from "react-hook-form";
import { z } from "zod";
import { PaySlipSchema } from "@/schemas";
import { RequestPaySlip } from '@/new-types';
import { postPaySlip } from '@/new-services';

export type FormsFields = z.infer<typeof PaySlipSchema>;

export const usePostPaySlipMutation = (
  setError: UseFormSetError<FormsFields>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RequestPaySlip) => await postPaySlip(data),
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