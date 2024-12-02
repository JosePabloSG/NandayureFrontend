import { SubmitHandler, useForm } from "react-hook-form";
import { FormsFields } from "./mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "next-auth/react";
import { useState } from "react";
import useRedirection from "@/new-hooks/common/useRedirect";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { redirect } = useRedirection();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<FormsFields> = async (credentials) => {
    try {
      setIsLoading(true);

      const response = await signIn('credentials', {
        ...credentials,
        redirect: false,
      });

      if (response?.error) {
        setError('root', { message: response.error });
        return;
      }

      redirect({ path: '/'});
    } catch (error: any) {
      setError('root', { message: 'Ocurrió un error inesperado' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    register,
    onSubmit,
    errors,
    isLoading,
  };
};

export default useLogin;
