import { FormsFields, useChangePasswordMutation } from './mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordSchema } from '@/schemas';
import { SubmitHandler, useForm } from 'react-hook-form';
import { notify } from '@/utils/notification';
import useRedirection from '@/new-hooks/common/useRedirect';

const CHANGE_PASSWORD_MESSAGES = {
  loading: 'Cargando...',
  success: 'Contraseña editada exitosamente.',
  error: 'Error al cambiar la contraseña.',
} as const;

const useChangePassword = () => {
  const { redirect } = useRedirection();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const mutation = useChangePasswordMutation(setError);

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      await notify(mutation.mutateAsync(data), CHANGE_PASSWORD_MESSAGES);
      redirect({
        path: '/',
        delay: 3000,
      });
    } catch (error: any) {
      setError('root', { message: error.message });
    }
  };

  return {
    handleSubmit,
    register,
    onSubmit,
    mutation,
    errors,
  };
};

export default useChangePassword;
