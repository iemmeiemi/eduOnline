import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios'; 

const useRoleInfo = () => {
  const request = useAxios();

  const fetchRoleInfo = async () => {
    const response = await request('GET', '/api/category'); 
    return response.data.data;
  };

  const { data: categories, error, isLoading, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchRoleInfo,
  });


  return { categories, error, isLoading, refetch };
};

export default useRoleInfo;