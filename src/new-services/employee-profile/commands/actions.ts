import httpClient from '@/helpers/httpClient';
import { UpdateEmployee } from '@/new-types';

interface UpdateEmployeeProfileProps {
  employeeId: number;
  profileData: UpdateEmployee;
}

export async function updateEmployeeProfile({ 
  employeeId, 
  profileData 
}: UpdateEmployeeProfileProps) {
  return httpClient<UpdateEmployee>({
    method: 'PATCH',
    endpoint: `/employees/${employeeId}`,
    data: profileData,
  });
}