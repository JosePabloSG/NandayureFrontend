import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { ChangePassword } from '@/types';
import { ChangePasswordSchema } from '@/schemas';
import { postChangePassword } from '@/services';
import { useRouter } from 'next/navigation';

type FormsFields = z.infer<typeof ChangePasswordSchema>;

const useChangePassword = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ChangePassword) => await postChangePassword(data),
    onError: (error: any) => {
      setError('root', error.message);
    },
  });

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      await toast.promise(mutation.mutateAsync(data), {
        loading: 'Cargando...',
        success: () => {
          setTimeout(() => {
            router.push('/');
          }, 3000);
          return 'Contraseña editada exitosamente.';
        },
        error: 'Error al cambiar la contraseña.',
      });
    } catch (error: any) {
      setError('root', error.message);
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
