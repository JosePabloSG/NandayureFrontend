import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { z } from 'zod';
import { DepartmentSchema } from '@/schemas';
import { postDepartment } from '@/new-services';
import { Department } from '@/new-types';

export type FormsFields = z.infer<typeof DepartmentSchema>;

export const useCreateDepartmentMutation = (
  setError: UseFormSetError<FormsFields>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Department) => await postDepartment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getAllDepartments'],
      });
    },
    onError: (error: Error) => {
      setError('root', { message: error.message });
    }
  });
};