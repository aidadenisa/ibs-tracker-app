import styles from './AuthLayout.module.css';
import logo from '../../assets/img/IBS_logo.svg';
import { ReactNode } from 'react';

type AuthLayoutProps = {
  authForm: ReactNode,
  actionBar: ReactNode
}

const AuthLayout = ({ authForm, actionBar }: AuthLayoutProps) => {

  return (
    <div className={styles.authPage}>

      <div className={styles.section}>
        <img className={styles.logo} src={logo} />
        <div className={styles.authForm}>
          { authForm }
        </div>
      </div>
      <div className={styles.actionBar}>
        { actionBar }
      </div>
    </div>
  )

}

export default AuthLayout;