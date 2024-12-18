import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateDepartmentSchema } from '@/schemas';
import { notify } from '@/utils/notification';
import useArtificialDelay from '@/new-hooks/common/useArtificialDelay';
import { FormFields, useUpdateDepartmentMutation } from './mutations';
import { PatchDepartment } from '@/types';

interface Props {
  setIsOpen: (value: boolean) => void;
  departmentId: number;
}

const DEPARTMENT_MESSAGES = {
  loading: 'Actualizando departamento...',
  success: 'Departamento actualizado',
  error: 'Error al actualizar departamento',
} as const;

const useUpdateDepartment = ({ setIsOpen, departmentId }: Props) => {
  const { withDelay } = useArtificialDelay(500);
  
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(UpdateDepartmentSchema),
  });

  const mutation = useUpdateDepartmentMutation(departmentId, setError);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const convertedData = convertDepartmentTypes(data);
      await notify(
        withDelay(mutation.mutateAsync(convertedData)),
        DEPARTMENT_MESSAGES
      );
      setIsOpen(false);
    } catch (error: any) {
      setError('root', { message: error.message });
      setIsOpen(false);
    }
  });

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    setValue,
    mutation,
  };
};

export const convertDepartmentTypes = (department: any): PatchDepartment => ({
  id: department.id,
  name: department.name,
  description: department.description,
  departmentHeadId: department.departmentHeadId,
  budgetCodeId: parseInt(department.budgetCodeId, 10),
  departmentProgramId: parseInt(department.departmentProgramId, 10),
});

export default useUpdateDepartment;