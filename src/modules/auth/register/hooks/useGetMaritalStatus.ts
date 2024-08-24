import { useQuery } from "@tanstack/react-query";
import { getMaritalStatus } from "../server/actions";

const useGetMaritalStatus = () => {
  const { data: maritalStatus } = useQuery({
    queryFn: async () => await getMaritalStatus(),
    queryKey: ["maritalStatus"],
  });

  return {
    maritalStatus
  }
}
export default useGetMaritalStatus;