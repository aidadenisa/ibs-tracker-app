import styles from './LoginPage.module.css';
import logo from '../../assets/img/IBS_logo.svg'
const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <img className={styles.logo} src={logo}/>
      <div className={styles.authForm}>
        <input placeholder="Email"></input>
        <input type="password" placeholder="Password"></input>
      </div>
      <div className={styles.actionBar}>
        <button className="primary-button">Login</button>
        <button className="secondary-button">Create new account</button>
      </div>
    </div>
  )

}

export default LoginPage;