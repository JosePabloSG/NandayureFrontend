import { getRequestHistory } from '@/new-services';
import { useQuery } from '@tanstack/react-query';

const useGetRequestHistory = (employeeId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      return await getRequestHistory(employeeId);
    },
    queryKey: ['requests-history', employeeId],
  });

  const sortedRequests = Array.isArray(data) ? [...data].reverse() : undefined;

  return {
    requests: sortedRequests,
    isLoading,
    isError,
    error,
  };
};

export default useGetRequestHistory;
