import fetcher from "@/libs/fetcher";
import { ParsedUrlQuery } from "querystring";
import useSwr from "swr";
const useFetch = (cardId:any) => {
  const { data, error, mutate, isLoading } = useSwr(`/api/fetch/${cardId?cardId:""}`, fetcher);

  return {
    data,
    error,
    mutate,
    isLoading,
  };
};

export default useFetch;
