import useGetToken from '@/hooks/common/useGetToken';
import { postSalaryCertificates } from '@/services';
import { RequestSalaryCertificateForm } from '@/types/request/RequestSalaryCertificate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const usePostSalaryCetificates = () => {
  const { register, handleSubmit, setValue } = useForm();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: RequestSalaryCertificateForm) =>
      await postSalaryCertificates(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getCurrentToApprove'],
      });
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              await mutation.mutateAsync(data);
              resolve('Solicitud enviada');
              setTimeout(() => {
                router.push('/');
              }, 1000);
            } catch (error) {
              reject('Error al enviar solicitud');
            }
          }, 500);
        }),
        {
          loading: 'Enviando solicitud...',
          success: 'Solicitud enviada',
          error: 'Error al enviar solicitud',
        },
        { duration: 4500 },
      );
    } catch (error: any) {
      console.error(error);
    }
  });

  return {
    onSubmit,
    register,
    setValue,
    mutation,
  };
};
export default usePostSalaryCetificates;
