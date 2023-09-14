import fetcher from "@/libs/fetcher";
import useSwr from "swr";
const useMembers = () => {
  const { data, error, mutate, isLoading } = useSwr("/api/create", fetcher);

  return {
    data,
    error,
    mutate,
    isLoading,
  };
};

export default useMembers;
