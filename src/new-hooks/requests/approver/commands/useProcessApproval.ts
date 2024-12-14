import { CurrentToApprove } from '@/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { notify } from '@/utils/notification';
import { useProcessApprovalMutation } from './mutations';
import useArtificialDelay from '@/new-hooks/common/useArtificialDelay';

const APPROVAL_MESSAGES = {
  loading: 'Enviando solicitud...',
  success: 'Solicitud enviada',
  error: 'Error al enviar solicitud',
} as const;

const useProcessApproval = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<CurrentToApprove | null>(null);
  const { register, handleSubmit, reset, setError } = useForm();
  const { withDelay } = useArtificialDelay(1500);
  
  const mutation = useProcessApprovalMutation(setError);

  const handleRequestClick = (request: CurrentToApprove) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const onSubmit = async (data: { reason: string }, action: 'approve' | 'reject') => {
    if (!selectedRequest) return;

    const requestData = {
      approved: action === 'approve',
      observation: data.reason
    };

    try {
      await notify(
        withDelay(
          mutation.mutateAsync({ 
            id: selectedRequest.id, 
            data: requestData 
          })
        ),
        APPROVAL_MESSAGES
      );
      
      setIsModalOpen(false);
      setSelectedRequest(null);
      reset();
    } catch (error: any) {
      setError('root', { message: error.message });
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
    isLoading: mutation.isPending
  };
};

export default useProcessApproval;