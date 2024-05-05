import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/Input';
import Button from '@/components/Button';
import AuthLayout from '@/features/auth/components/AuthLayout';
import authService from '@/features/auth/services/auth';
import { setEmail } from '@/features/auth/reducers/auth';

const LoginPage = () => {

  const [email, setEmailInput] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setError(null);
    try {
      const result = await authService.login(email);
      if (result && result.status === 200) {
        dispatch(setEmail(email));
        return navigate('/validate-otp');
      }
    } catch (error) {
      error instanceof Error && setError(error.message);
    }
  }

  useEffect(() => {
    if (!email || !email.length) {
      return setIsDisabled(true);
    }
    return setIsDisabled(false);
  }, [email])

  return (
    <AuthLayout
      authForm={
        <>
          <Input
            id="ibs-input-email"
            value={email}
            onChange={({ target }) => setEmailInput(target.value)}
            type="email"
            placeholder="Email" />
          {error && error.length
            && <div className="error">
              Error: {error}
            </div>
          }
          <p className="info-paragraph">
            We&apos;re going to send you a One Time Password (OTP) on your email address so that you can log in.
          </p>
        </>
      }
      actionBar={
        <>
          <Button
            onClick={handleLogin}
            disabled={isDisabled}
            variant="primary"
            size="lg"
            label="Continue" />
          <Button
            disabled={isDisabled}
            variant="secondary"
            size="lg"
            label="Create new account"
          ></Button>
        </>
      }
    />

  )

}

export default LoginPage;