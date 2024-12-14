import { getPendingApprovals } from "@/new-services";
import { useQuery } from "@tanstack/react-query";

const useGetPendingApprovals = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['pending-approvals'],
    queryFn: getPendingApprovals, 
    staleTime: 1000 * 60 * 30, 
  });

  const sortedRequests = Array.isArray(data) ? [...data].reverse() : undefined;
  
  return {
    pendingApprovals: sortedRequests,
    isLoading,
    isError,
  };
}

export default useGetPendingApprovals;