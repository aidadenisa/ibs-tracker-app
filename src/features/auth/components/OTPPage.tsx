import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/Input';
import Button from '@/components/Button';
import authService from '@/features/auth/services/auth';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import AuthLayout from '@/features/auth/components/AuthLayout';
import useAuth from '@/features/auth/hooks/useAuth';

const OTPPage = () => {

  const email = useSelector((state: RootState) => state.auth.email);
  const [otp, setOtp] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();

  const { updateUser } = useAuth();

  const handleLogin = async () => {
    setError(null);
    try {
      const result = await authService.validateOTP({ email, otp });
      if (result && result.data) {
        await updateUser();
        return navigate('/');
      }
    } catch (error) {
      if(error instanceof Error && error.message) {
        setError(error.message);
      } 
    }
  }

  useEffect(() => {
    if (!otp || !otp.length) {
      return setIsDisabled(true);
    }
    return setIsDisabled(false);
  }, [otp])

  return (
    <AuthLayout
      authForm={
        <>
          <Input
            id="ibs-input-pass"
            value={otp}
            onChange={({ target }) => setOtp(target.value)}
            type="password"
            placeholder="Password">
          </Input>
          {error && error.length
            && <div className="error">
              Error: {error}
            </div>
          }
          <p className="info-paragraph">
            We sent you an OTP password at <strong>{email}</strong>. Please insert the code here in order to login.
          </p>
        </>
      }
      actionBar={
        <>
          <Button
            onClick={handleLogin}
            disabled={isDisabled}
            variant="primary"
            label="Login" />
        </>
      }
    />

  )

}

export default OTPPage;