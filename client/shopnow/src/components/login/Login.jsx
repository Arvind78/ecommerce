import React, { useState } from 'react';
import styles from './Style.module.css';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import loginImg from '../../assets/image/log-in.png';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { isValidateLogin } from '../../utils/validation';
import { userLogin } from '../../utils/userApi';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Loading from 'react-loading';
import { loginSuccess } from '../../store/userSlice';
import { Switch } from 'antd';
// Component for user login
const Login = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // State to manage login data
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Function to handle input changes
  const onChangeHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Function to handle login
  const handleLogin = () => {
    // Validate login data
    if (!isValidateLogin(loginData)) {
      return false;
    } else {
      // Call API for user login

      setIsLoading(true);
      userLogin(loginData)
        .then((res) => {
          toast.success(res.data.message, {
            theme: 'colored',
            autoClose: 3000,
            closeOnClick: true,
          });
          setIsLoading(false);
          dispatch(loginSuccess(res.data.user));
          localStorage.setItem('accessToken', res.data.token);
          setTimeout(() => Navigate('/'), 4000);
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(err.response.data.message, {
            theme: 'colored',
            autoClose: 3000,
            closeOnClick: true,
          });
        });
    }
  };

  const switchToggle = (value) => {
    if (value === false) {
      setTimeout(() => {
        localStorage.setItem('role', 'admin');
        window.location.href = '/';
      }, 1000);
    } else {
      localStorage.setItem('role', 'user');
    }
  };

  return (
    <div className={styles.mainContainer}>
      {/* Header component */}
      <Header />
      <div className={styles.loginContainer}>
        <ToastContainer />
        <div className={styles.loginHeading}>
          {/* Heading with home link */}
          <h2>Login</h2>
          <div onClick={() => Navigate('/')}>
            <FaHome size={24} />
            Home
          </div>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.imgContainer}>
            {/* Image container */}
            <img src={loginImg} alt="" />
          </div>
          <div data-aos="zoom-out-left" className={styles.form}>
            <div className={styles.formHeading}>
              {/* Form heading */}
              <h2>Welcome To ShopNow</h2>
              <h4>Log In Your Account</h4>
              <Switch
                checkedChildren="User Mode"
                unCheckedChildren="Admin Mode"
                onChange={switchToggle}
                defaultChecked
              />
            </div>

            {/* Form inputs */}
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
              {/* Forgot password link */}
              <a onClick={() => Navigate('/forgot')}> Forgot Password ? </a>
            </div>
            {/* Login button */}
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
            {/* Link to register */}
            <div className={styles.notAccount}>
              <p>Don't have an account?</p>
              <span onClick={() => Navigate('/ragister')}> Register Now</span>
            </div>
          </div>
        </div>
      </div>
      {/* Footer component */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
