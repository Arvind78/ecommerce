import React, { useState } from 'react';
import styles from './Style.module.css';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';
import loginImg from '../../../assets/image/log-in.png';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { isValidateLogin } from '../../../utils/validation';
import { userLogin } from '../../../utils/userApi';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Loading from 'react-loading';
import { loginSuccess } from '../../../store/userSlice';
import { Switch } from 'antd';
import { adminLogin } from '../../../utils/adminPanelApi';

const AdminLogin = () => {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (!isValidateLogin(loginData)) {
      return false;
    } else {
      setIsLoading(true);
      adminLogin(loginData)
        .then((res) => {
          toast.success(res.data.message, { theme: 'colored' });
          setIsLoading(false);
          console.log(res.data.admin);
          sessionStorage.setItem(
            'isAdminLogin',
            JSON.stringify(res.data.admin)
          );

          setTimeout(() => {
            setLoginData({
              email: '',
              password: '',
            });
            return window.location.reload();
          }, 4000);
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(err.response.data.message, { theme: 'colored' });
        });
    }
  };

  const switchToggle = (value) => {
    if (value === false) {
      setTimeout(() => {
        localStorage.setItem('role', 'user');
        window.location.href = '/login';
      }, 1000);
    } else {
      localStorage.setItem('role', 'admin');
      Navigate('/');
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginContainer}>
        <ToastContainer />
        <div className={styles.formContainer}>
          <div data-aos="zoom-out" className={styles.form}>
            <div className={styles.formHeading}>
              <h2>Welcome To Admin Panel</h2>
              <h4>Log In Admin Account</h4>
              <Switch
                checkedChildren="Admin Mode"
                unCheckedChildren="User Mode"
                onChange={switchToggle}
                defaultChecked
              />
            </div>
            <div className={styles.formInput}>
              <input
                type="text"
                placeholder="Email Address"
                name="email"
                value={loginData.email}
                onChange={onChangeHandler}
              />
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={loginData.password}
                onChange={onChangeHandler}
              />
            </div>
            <div className={styles.forgetContainer}>
              <a onClick={() => Navigate('/forgot')}> Forgot Password ? </a>
            </div>
            <button className={styles.formBtn} onClick={handleLogin}>
              {isLoading ? (
                <div>
                  <Loading
                    type="bubbles"
                    color="white"
                    width={30}
                    height={25}
                  />
                </div>
              ) : (
                'Login'
              )}
            </button>
            <p className={styles.orLine}>OR</p>
            <div className={styles.notAccount}>
              <p>Don't have an account?</p>
              <span onClick={() => Navigate('/admin/signup')}>
                {' '}
                Register Now
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
