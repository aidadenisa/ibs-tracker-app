import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/general/Input';
import Button from '@/components/general/Button';
import AuthLayout from '@/components/auth/AuthLayout';
import authService from '@/services/auth';
import { setEmail } from '@/reducers/auth';

const LoginPage = () => {

  const [email, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
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
            label="Continue" />
          <Button
            variant="secondary"
            label="Create new account"
            disabled={isDisabled}
          ></Button>
        </>
      }
    />

  )

}

export default LoginPage;