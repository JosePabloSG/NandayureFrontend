import httpClient from '@/helpers/httpClient';
import { DepartmentProgram } from '@/new-types';

export async function getAllDepartmentPrograms() {
  const departmentPrograms = await httpClient<DepartmentProgram[]>({
    method: 'GET',
    endpoint: '/department-programs',
  });
  return departmentPrograms;
}
