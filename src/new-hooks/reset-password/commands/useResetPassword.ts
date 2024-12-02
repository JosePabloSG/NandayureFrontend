import { notify } from '@/utils/notification';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormsFields, useResetPasswordMutation } from './mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema } from '@/schemas';
import { signIn } from 'next-auth/react';
import useRedirection from '@/new-hooks/common/useRedirect';

const RESET_PASSWORD_MESSAGES = {
  loading: 'Cargando...',
  success: 'Contraseña restablecida exitosamente.',
  error:
    'El enlace que intentas usar ya ha sido utilizado o ha expirado. Por favor, solicita uno nuevo para continuar.',
} as const;

interface Props {
  token: string;
}

const useResetPassword = ({ token }: Props) => {
  const { redirect } = useRedirection();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const mutation = useResetPasswordMutation(setError, token);

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const response = await notify(
        mutation.mutateAsync(data),
        RESET_PASSWORD_MESSAGES,
      );
      const { Employee } = response;

      await signIn('credentials', {
        redirect: false,
        EmployeeId: Employee.id,
        Password: data.Password,
      });

      redirect({
        path: '/',
        delay: 2500,
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

export default useResetPassword;
