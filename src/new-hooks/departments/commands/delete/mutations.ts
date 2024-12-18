import { deleteDepartment } from '@/new-services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteDepartmentMutation = (
  onError: (error: Error) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (departmentId: number) => 
      await deleteDepartment(departmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['getAllDepartments'] 
      });
    },
    onError: (error: Error) => {
      onError(error);
    }
  });
};