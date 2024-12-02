import { notify } from "@/utils/notification";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormsFields, useRegisterMutation, convertEmployeeTypes } from "./mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import useRedirection from "@/new-hooks/common/useRedirect";

const REGISTER_MESSAGES = {
  loading: 'Guardando empleado...',
  success: 'Empleado guardado',
  error: 'Error al guardar empleado',
} as const;

const useRegister = () => {
  const { redirect } = useRedirection();
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(RegisterSchema),
  });

  const mutation = useRegisterMutation(setError);

  const onSubmit: SubmitHandler<FormsFields> = async (data) => {
    try {
      const convertedData = convertEmployeeTypes(data);
      await notify(mutation.mutateAsync(convertedData), REGISTER_MESSAGES);
      redirect({
        path: '/success',
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
    setValue,
  };
};

export default useRegister;