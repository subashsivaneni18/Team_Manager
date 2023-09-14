import fetcher from '@/libs/fetcher'
import useSwr from 'swr'
const useCurrentUser = () =>{
    const {data,error,mutate,isLoading} = useSwr('/api/current',fetcher)

    return{
        data,
        error,
        mutate,
        isLoading
    }
}

export default useCurrentUser