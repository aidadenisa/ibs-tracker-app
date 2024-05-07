import { ReactNode, createContext } from 'react';
import { useAuthentication, AuthState } from '@/features/auth/hooks/useAuthentication';

const AuthContext = createContext<AuthState>({} as AuthState);

const AuthProvider = ({ children }: { children: ReactNode }) => {

  const authCapabilities = useAuthentication();

  return (
    <AuthContext.Provider value={authCapabilities}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };