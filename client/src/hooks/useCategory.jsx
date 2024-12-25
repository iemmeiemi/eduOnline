import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios'; 

const useCategory = () => {
  const request = useAxios();

  const fetchCategories = async () => {
    const response = await request('GET', '/api/category'); 
    return response.data.data;
  };

  const { data: categories, error, isLoading, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });


  return { categories, error, isLoading, refetch };
};

export default useCategory;