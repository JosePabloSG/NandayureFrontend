import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { z } from 'zod';
import { UpdateDepartmentSchema } from '@/schemas';
import { patchDepartment } from '@/new-services';
import { PatchDepartment } from '@/new-types';
export type FormFields = z.infer<typeof UpdateDepartmentSchema>;

export const useUpdateDepartmentMutation = (
  departmentId: number,
  setError: UseFormSetError<FormFields>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PatchDepartment) => 
      await patchDepartment({
        departmentId: departmentId,
        department: data
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['getAllDepartments'] 
      });
    },
    onError: (error: Error) => {
      setError('root', { message: error.message });
    }
  });
};