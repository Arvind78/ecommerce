import React, { useState } from 'react';
import styles from './Style.module.css';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import signupImg from '../../assets/image/sign-up.png';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { isValid } from '../../utils/validation';
import ReactLoading from 'react-loading';
import { userRegistration } from '../../utils/userApi';

// Component for user registration
const Ragister = () => {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // State to manage registration data
  const [ragisterData, setRagisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    checkbox: false,
  });

  // Function to handle input changes
  const onChangeHandler = (e) => {
    setRagisterData({ ...ragisterData, [e.target.name]: e.target.value });
  };

  // Function to handle registration
  const ragisterHandler = () => {
    // Validate registration data
    if (!isValid(ragisterData)) {
      return false;
    } else {
      // Call API for user registration
      setIsLoading(true);
      userRegistration(ragisterData)
        .then((res) => {
          toast.success(res.data.message, {
            theme: 'colored',
            autoClose: 3000,
            closeOnClick: true,
          });
          setIsLoading(false);
          setTimeout(() => Navigate('/login'), 4000);
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
    setRagisterData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      checkbox: false,
    });
  };

  return (
    <div className={styles.mainContainer}>
      {/* Header component */}
      <Header />
      {/* Toast container for notifications */}
      <ToastContainer />
      <div className={styles.ragisterContainer}>
        <div className={styles.ragisterHeading}>
          {/* Heading with home link */}
          <h2>Register</h2>
          <div onClick={() => Navigate('/')}>
            <FaHome size={24} />
            Home
          </div>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.imgContainer}>
            {/* Image container */}
            <img src={signupImg} alt="" />
          </div>
          <div className={styles.form}>
            <div className={styles.formHeading}>
              {/* Form heading */}
              <h2>Welcome To Our Store</h2>
              <h4>Create New Account</h4>
            </div>
            {/* Form inputs */}
            <div className={styles.formInput}>
              <input
                type="text"
                name="name"
                value={ragisterData.name}
                placeholder="Full Name"
                onChange={onChangeHandler}
              />
              <input
                type="text"
                name="email"
                value={ragisterData.email}
                placeholder="Email Address"
                onChange={onChangeHandler}
              />
              <input
                type="text"
                name="phone"
                value={ragisterData.phone}
                placeholder="Phone Number"
                onChange={onChangeHandler}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={ragisterData.password}
                onChange={onChangeHandler}
              />
              <input
                type="text"
                name="confirmPassword"
                placeholder="Password Confirmation"
                value={ragisterData.confirmPassword}
                onChange={onChangeHandler}
              />
            </div>
            {/* Checkbox for terms agreement */}
            <div className={styles.formCheckBox}>
              <input
                type="checkbox"
                name="checkbox"
                checked={ragisterData.checkbox}
                onChange={onChangeHandler}
              />
              <span>
                I agree with <a href="#">Terms</a> and <a href="#">Privacy</a>
              </span>
            </div>
            {/* Registration button */}
            <button className={styles.formBtn} onClick={ragisterHandler}>
              {isLoading ? (
                <div style={{ textAlign: 'center' }}>
                  <ReactLoading
                    type={'bubbles'}
                    color={'white'}
                    height={25}
                    width={30}
                  />
                </div>
              ) : (
                'Register'
              )}
            </button>
            <p className={styles.orLine}>or</p>
            {/* Already have an account link */}
            <div className={styles.alreadyAccount}>
              <p>Already have an account?</p>
              <span onClick={() => Navigate('/login')}>Log In</span>
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

export default Ragister;
