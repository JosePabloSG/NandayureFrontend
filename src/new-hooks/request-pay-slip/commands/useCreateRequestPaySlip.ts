import { useForm } from 'react-hook-form';
import { notify } from "@/utils/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormsFields, usePostPaySlipMutation } from "./mutations";
import { PaySlipSchema } from "@/schemas";
import useRedirection from '@/new-hooks/common/useRedirect';
import useArtificialDelay from '@/new-hooks/common/useArtificialDelay';

const PAYSLIP_MESSAGES = {
  loading: 'Enviando solicitud...',
  success: 'Solicitud enviada',
  error: 'Error al enviar solicitud',
} as const;

const useCreatePaySlip = () => {
  const { redirect } = useRedirection();
  const { withDelay } = useArtificialDelay(1500);
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(PaySlipSchema),
  });

  const mutation = usePostPaySlipMutation(setError);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await notify(
        withDelay(mutation.mutateAsync(data)),
        PAYSLIP_MESSAGES
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
    mutation,
    errors,
  };
};

export default useCreatePaySlip;