import { notify } from "@/utils/notification";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormsFields, useSendEmailMutation } from "./mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailSendSchema } from "@/schemas";
import { useState } from "react";

const SEND_EMAIL_MESSAGES = {
  loading: 'Enviando correo...',
  success: 'Correo enviado',
  error: 'Error al enviar correo',
} as const;

const useSendEmail = () => {
  const [emailSent, setEmailSent] = useState(false);
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(EmailSendSchema),
  });

  const mutation = useSendEmailMutation(setError);

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      await notify(
        new Promise((resolve) => {
          setTimeout(async () => {
            await mutation.mutateAsync(data);
            resolve('Correo enviado');
          }, 500);
        }),
        SEND_EMAIL_MESSAGES
      );
      setEmailSent(true);
    } catch (error: any) {
      setEmailSent(false);
      setError('root', { message: error.message });
    }
  };

  return {
    handleSubmit,
    register,
    onSubmit,
    mutation,
    emailSent,
    errors,
  };
};

export default useSendEmail;