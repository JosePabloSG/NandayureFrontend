import { processApproval } from '@/new-services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

export const useProcessApprovalMutation = (setError: UseFormSetError<any>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { 
      id: number; 
      data: { approved: boolean; observation: string; }
    }) => {
      return processApproval(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      queryClient.invalidateQueries({ queryKey: ['pending-approvals'] });
    },
    onError: (error: Error) => {
      setError('root', { message: error.message });
    }
  });
};