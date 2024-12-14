import { notify } from "@/utils/notification";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormsFields, useCreateSalaryCertificateMutation } from "./mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SalaryCertificateSchema } from "@/schemas";
import useRedirection from "@/new-hooks/common/useRedirect";
import useArtificialDelay from "@/new-hooks/common/useArtificialDelay";

const CERTIFICATE_MESSAGES = {
  loading: 'Enviando solicitud...',
  success: 'Solicitud enviada',
  error: 'Error al enviar solicitud',
} as const;

const useCreateRequestSalaryCertificate = () => {
  const { redirect } = useRedirection();
  const { withDelay } = useArtificialDelay(1500);
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(SalaryCertificateSchema),
  });

  const mutation = useCreateSalaryCertificateMutation(setError);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await notify(
        withDelay(mutation.mutateAsync(data)),
        CERTIFICATE_MESSAGES
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
    handleSubmit,
    register,
    onSubmit,
    mutation,
    errors,
  };
};

export default useCreateRequestSalaryCertificate;