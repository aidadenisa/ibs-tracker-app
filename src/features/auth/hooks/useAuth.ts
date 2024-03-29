import { useContext } from 'react';
import { AuthContext } from '@/features/auth/providers/AuthProvider';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;