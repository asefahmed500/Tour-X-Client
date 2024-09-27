
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const usePackage = () => {
    const axiosPublic = useAxiosPublic();
  
    const { data: packages = [], isLoading, refetch } = useQuery({
      queryKey: ['package'],
      queryFn: async () => {
        try {
          const res = await axiosPublic.get('/package');
          console.log('Packages fetched:', res.data); // Check if data is fetched
          return res.data;
        } catch (error) {
          console.error('Error fetching packages:', error); // Log error
          throw error;
        }
      }
    });
  
    return [packages, isLoading, refetch];
  };
  

export default usePackage;