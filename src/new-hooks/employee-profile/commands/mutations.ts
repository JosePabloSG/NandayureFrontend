import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { z } from 'zod';
import { UpdateEmployeeSchema } from '@/schemas';
import { updateEmployeeProfile } from '@/new-services';
import { UpdateEmployee } from '@/new-types';

export type FormFields = z.infer<typeof UpdateEmployeeSchema>;

export const useUpdateEmployeeMutation = (
  employeeId: number,
  setError: UseFormSetError<FormFields>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateEmployee) => 
      await updateEmployeeProfile({ employeeId, profileData: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['employeeById', employeeId] 
      });
    },
    onError: (error: Error) => {
      setError('root', { message: error.message });
    }
  });
};