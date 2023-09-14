import fetcher from "@/libs/fetcher";
import useSwr from "swr";
const useGetMembers = () => {
  const { data, error, mutate, isLoading } = useSwr("/api/getMembers", fetcher);

  return {
    data,
    error,
    mutate,
    isLoading,
  };
};

export default useGetMembers;
