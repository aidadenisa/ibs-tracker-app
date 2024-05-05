import api from '@/lib/api';
import { AuthInput } from '@/features/auth/types';
import tokenService from '@/services/token';

const BASE_URL = '/auth';

const login = async (email: string) => { 
  try {
    const result = await api.post(`${BASE_URL}/login`, { email })
    if(result && result.status === 200) {
      return result;
    }
    return;
  } catch(err) {
    if(err && err instanceof Error && err.message) {
      throw new Error(`There has been an error logging in. ${ err.message }`);
    }
    return;
  }
}

const validateOTP = async (authInput: AuthInput) => {
  try {
    const result = await api.post(`${BASE_URL}/validate-otp`, authInput);
    if(result && result.status === 200 && result.data && result.data.token) {
      tokenService.setToken(result.data.token);
    }
    return result;

  } catch(err) {
    if(err && err instanceof Error && err.message) {
      throw new Error(`There has been an error logging in. ${ err.message }`);
    }
  }
}

export default {
  login,
  validateOTP,
}