import { useEffect, useMemo, useState } from 'react';
import userService from '@/services/user';
import { UserConfig } from '@/types';
import tokenService from '@/services/token';
import { redirect } from 'react-router-dom';

interface AuthState {
  user: UserConfig, 
  isLoggedIn: boolean,
  loading: boolean,
  updateUser: () => Promise<void>,
  removeUser: () => void,
}

const useAuthentication = (): AuthState => {

  const [user, setUser] = useState<UserConfig>({} as UserConfig);
  const [loading, setLoading] = useState(true);
  const token = tokenService.getToken();

  const isLoggedIn = useMemo(() => user && !!Object.keys(user).length, [user]);

  useEffect(() => {
    if (!token || !token.length) {
      setLoading(false);
      redirect('/login');
      return;
    }

    if (!user || !Object.keys(user).length) {
      updateUser()
        .then(() => {
          setLoading(false);
        });
      ;
    }
  }, [user, token]);

  const updateUser = async () => {
    const { records, ...userInfo } = await userService.refreshLoggedInUserData();
    setUser(userInfo);
    setLoading(false);
  };

  const removeUser = () => {
    setUser({} as UserConfig);
  };

  return {
    user,
    isLoggedIn,
    loading,
    updateUser,
    removeUser,
  }
}

export { useAuthentication };
export type { AuthState };