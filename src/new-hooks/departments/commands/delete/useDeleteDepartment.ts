import { useState } from 'react';
import { notify } from '@/utils/notification';
import useArtificialDelay from '@/new-hooks/common/useArtificialDelay';
import { useDeleteDepartmentMutation } from './mutations';

interface Props {
  departmentId: number;
}

const DEPARTMENT_MESSAGES = {
  loading: 'Eliminando departamento...',
  success: 'Departamento eliminado',
  error: 'Error al eliminar departamento',
} as const;

const DEFAULT_ERROR = 'Ha ocurrido un error al eliminar el departamento';

export default function useDeleteDepartment({ departmentId }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { withDelay } = useArtificialDelay(500);

  const mutation = useDeleteDepartmentMutation((error: Error) => {
    setErrorMessage(error.message || DEFAULT_ERROR);
  });

  const confirmDelete = async () => {
    try {
      await notify(
        withDelay(mutation.mutateAsync(departmentId)),
        DEPARTMENT_MESSAGES
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      setIsDeleteModalOpen(false);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const closeErrorModal = () => {
    setErrorMessage(null);
  };

  return {
    handleDelete,
    mutation,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    confirmDelete,
    errorMessage,
    closeErrorModal,
  };
}