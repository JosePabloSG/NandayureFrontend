import { getAllDepartments } from '@/new-services';
import { useQuery } from '@tanstack/react-query';

const useGetAllDepartments = () => {
  const {
    data: departments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['getAllDepartments'],
    queryFn: getAllDepartments,
    staleTime: 1000 * 60 * 5, 
  });

  return {
    departments,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllDepartments;