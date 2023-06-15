import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import logo from '../../assets/img/IBS_logo.svg'
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';
import authService from '../../services/auth';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    const result = await authService.login(email, password);
    if (result && result.data) {
      return navigate('/');
    }
    if (result && result.error) {
      setError(result.error);
    }
  }

  useEffect(() => {
    if (!email || !email.length || !password || !password.length) {
      return setIsDisabled(true);
    }
    return setIsDisabled(false);
  }, [email, password])

  return (
    <div className={styles.loginPage}>

      <div className={styles.section}>
        <img className={styles.logo} src={logo} />
        <div className={styles.authForm}>
          <Input
            id="ibs-input-email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            type="email"
            placeholder="Email" />
          <Input
            id="ibs-input-pass"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            placeholder="Password">
          </Input>
          {error && error.length
            && <div className="error">
              Error: {error}
            </div>
          }
        </div>
      </div>
      <div className={styles.actionBar}>
        <Button
          onClick={handleLogin}
          disabled={isDisabled}
          variant="primary"
          label="Login" />
        <Button
          variant="secondary"
          label="Create new account"
          disabled={isDisabled}
        ></Button>
      </div>
    </div>
  )

}

export default LoginPage;