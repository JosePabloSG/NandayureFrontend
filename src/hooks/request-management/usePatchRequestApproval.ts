import { patchRequestApproval } from '@/services';
import { currentToApprove } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useGetToken from '../common/useGetToken';
import toast from 'react-hot-toast';

const usePatchRequestApproval = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useGetToken();
  const [selectedRequest, setSelectedRequest] =
    useState<currentToApprove | null>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: { approved: boolean; observation: string }) => {
      await patchRequestApproval(selectedRequest!.id, data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCurrentToApprove'] });
    },
  });

  const handleRequestClick = (request: currentToApprove) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const onSubmit = async (
    data: { reason: any },
    action: 'approve' | 'reject',
  ) => {
    if (selectedRequest) {
      const updatedRequest = {
        approved: action === 'approve',
        observation: data.reason,
      };

      try {
        await toast.promise(
          new Promise((resolve, reject) => {
            setTimeout(async () => {
              try {
                await mutation.mutateAsync(updatedRequest);
                resolve('Solicitud actualizada');
              } catch (error) {
                reject('Error al actualizar solicitud');
              }
            }, 500); // artificial waiting
          }),
          {
            loading: 'Actualizando solicitud...',
            success: 'Solicitud actualizada',
            error: 'Error al actualizar solicitud',
          },
          { duration: 2500 },
        );
      } catch (error: any) {
        console.error(error);
      }

      // Close the modal and reset the form
      setIsModalOpen(false);
      setSelectedRequest(null);
      reset();
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    isModalOpen,
    setIsModalOpen,
    selectedRequest,
    handleRequestClick,
  };
};

export default usePatchRequestApproval;
