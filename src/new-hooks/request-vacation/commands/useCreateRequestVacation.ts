import { useForm } from 'react-hook-form';
import { notify } from "@/utils/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormsFields, useCreateVacationMutation } from "./mutations";
import { VacationSchema } from "@/schemas";
import useRedirection from '@/new-hooks/common/useRedirect';
import useArtificialDelay from '@/new-hooks/common/useArtificialDelay';

const VACATION_MESSAGES = {
  loading: 'Enviando solicitud...',
  success: 'Solicitud enviada',
  error: 'Error al enviar solicitud',
} as const;

const useCreateRequestVacation = () => {
  const { redirect } = useRedirection();
  const { withDelay } = useArtificialDelay(1500);
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(VacationSchema),
  });

  const mutation = useCreateVacationMutation(setError);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await notify(
        withDelay(mutation.mutateAsync(data)),
        VACATION_MESSAGES
      );
      redirect({
        path: '/',
        delay: 1000,
      });
    } catch (error: any) {
      setError('root', { message: error.message });
    }
  });

  return {
    onSubmit,
    register,
    setValue,
    mutation,
    errors,
  };
};

export default useCreateRequestVacation;