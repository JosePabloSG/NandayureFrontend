import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateEmployeeSchema } from '@/schemas';
import { notify } from '@/utils/notification';
import useArtificialDelay from '@/new-hooks/common/useArtificialDelay';
import { FormFields, useUpdateEmployeeMutation } from './mutations';

interface Props {
  employeeId: number;
  setIsOpen: (value: boolean) => void;
}

const EMPLOYEE_MESSAGES = {
  loading: 'Actualizando empleado...',
  success: 'Empleado actualizado',
  error: 'Error al actualizar empleado',
} as const;

const useUpdateEmployeeProfile = ({ employeeId, setIsOpen }: Props) => {
  const { withDelay } = useArtificialDelay(500);
  
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
    trigger,
  } = useForm<FormFields>({
    resolver: zodResolver(UpdateEmployeeSchema),
  });

  const mutation = useUpdateEmployeeMutation(employeeId, setError);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await notify(
        withDelay(mutation.mutateAsync(data)),
        EMPLOYEE_MESSAGES
      );
      setIsOpen(false);
    } catch (error: any) {
      setError('root', { message: error.message });
      setIsOpen(false);
    }
  });

  return {
    onSubmit,
    register,
    mutation,
    errors,
    trigger,
  };
};

export default useUpdateEmployeeProfile;