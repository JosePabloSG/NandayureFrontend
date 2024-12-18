import httpClient from '@/helpers/httpClient';
import { Employee } from '@/new-types';

interface GetEmployeeProfileProps {
  employeeId: number;
}

export async function getEmployeeProfile({ employeeId }: GetEmployeeProfileProps) {
  return httpClient<Employee>({
    method: 'GET',
    endpoint: `/employees/${employeeId}`,
  });
}