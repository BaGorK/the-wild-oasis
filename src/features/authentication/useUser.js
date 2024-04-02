import { getCurrentUser } from '../../services/apiAuth';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return { user, isLoading, isAuthenticated: user?.role === 'authenticated' };
}
