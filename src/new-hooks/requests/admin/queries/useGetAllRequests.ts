import { getAllRequests } from '@/new-services';
import { useQuery } from '@tanstack/react-query';

const useGetAllRequests = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['requests'],
    queryFn: getAllRequests, 
    staleTime: 1000 * 60 * 30, 
  });

  const sortedRequests = Array.isArray(data) ? [...data].reverse() : undefined;

  return {
    requests: sortedRequests,
    isLoading,
    isError,
  };
};


export default useGetAllRequests;