import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DepartmentSchema } from '@/schemas';
import { notify } from '@/utils/notification';
import { Department } from '@/new-types';
import { FormsFields, useCreateDepartmentMutation } from './mutations';

const DEPARTMENT_MESSAGES = {
  loading: 'Guardando departamento...',
  success: 'Departamento guardado',
  error: 'Error al guardar departamento',
} as const;

const useCreateDepartment = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormsFields>({
    resolver: zodResolver(DepartmentSchema),
  });

  const mutation = useCreateDepartmentMutation(setError);

  const handleAddNew = () => setIsAddModalOpen(true);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const convertedData = convertDepartmentTypes(data);
      await notify(
        mutation.mutateAsync(convertedData),
        DEPARTMENT_MESSAGES
      );
      setIsAddModalOpen(false);
    } catch (error: any) {
      setError('root', { message: error.message });
    }
  });

  return {
    onSubmit,
    register,
    mutation,
    isAddModalOpen,
    setValue,
    setIsAddModalOpen,
    handleAddNew,
    errors,
  };
};

export default useCreateDepartment;

export const convertDepartmentTypes = (department: any): Department => ({
  id: department.id,
  name: department.name,
  description: department.description,
  departmentHeadId: department.departmentHeadId,
  budgetCodeId: department.budgetCodeId,
  departmentProgramId: department.departmentProgramId
});