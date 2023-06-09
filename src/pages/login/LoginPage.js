import { useState } from 'react';
import styles from './LoginPage.module.css';
import logo from '../../assets/img/IBS_logo.svg'
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';
import authService from '../../services/auth';
import userService from '../../services/user';

const LoginPage = ({ onLogin }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({})

  const handleLogin = async () => {
    const result = await authService.login(email, password);
    if (result && result.data) {
      onLogin();
    }
  }

  return (
    <div className={styles.loginPage}>

      <div className={styles.section}>
        <img className={styles.logo} src={logo} />
        <div className={styles.authForm}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Email" />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            placeholder="Password">
          </Input>
        </div>
        {user && <div>{JSON.stringify(user)}</div>}
      </div>
      <div className={styles.actionBar}>
        <Button
          onClick={handleLogin}
          variant="primary"
          label="Login" />
        <Button variant="secondary" label="Create new account"></Button>
      </div>
    </div>
  )

}

export default LoginPage;