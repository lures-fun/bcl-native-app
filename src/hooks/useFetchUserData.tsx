import { useCallback, useEffect, useState } from 'react';
import axiosInstance from 'src/lib/axiosInstance';
import { User } from 'src/types/User';

export const useFetchUserData = () => {
  const [userData, setUserData] = useState<User>();
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get<User>('/users/profile');
      setUserData(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return { userData, error, isLoading, refetch: fetchUserData };
};
