import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ForgotPassword } from '@/types/entities';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailSendSchema } from '@/lib/zod';
import { postForgotPassword } from '@/server/auth/forgot-password/actions';

const usePostSendEmail = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPassword>({
    resolver: zodResolver(EmailSendSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ForgotPassword) => await postForgotPassword(data),
    onError: (error: any) => {
      console.error(error);
      setErrorMessage(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data: ForgotPassword) => {
    try {
      const mutationPromise = await toast.promise(mutation.mutateAsync(data), {
        loading: 'Enviando correo...',
        success: 'Correo enviado',
        error: 'Error al enviar correo',
      });
      setEmailSent(true);
      await mutationPromise;
    } catch (error: any) {
      console.error(error);
      setEmailSent(false);
      setErrorMessage(error.message);
    }
  });

  return {
    errorMessage,
    onSubmit,
    register,
    mutation,
    emailSent,
    errors,
  };
};
export default usePostSendEmail;