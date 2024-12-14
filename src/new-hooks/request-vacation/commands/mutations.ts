import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from "react-hook-form";
import { z } from "zod";
import { VacationSchema } from "@/schemas";
import { RequestVacation } from '@/new-types';
import { postRequestVacation } from '@/new-services';

export type FormsFields = z.infer<typeof VacationSchema>;

export const useCreateVacationMutation = (
  setError: UseFormSetError<FormsFields>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RequestVacation) => await postRequestVacation(data),
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