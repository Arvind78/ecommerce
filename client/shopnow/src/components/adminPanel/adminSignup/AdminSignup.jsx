import React, { useState } from 'react';
import styles from './Style.module.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { adminSignup } from '../../../utils/adminPanelApi';

// Component for user registration
const AdminSignup = () => {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [ragisterData, setRagisterData] = useState({
    name: '',
    email: '',
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
    if (!ragisterData.name || ragisterData.name.trim() === '') {
      toast.error('Please enter your name', { theme: 'colored' });
      return false;
    }

    // Validate email
    if (!/\S+@\S+\.\S+/.test(ragisterData.email)) {
      toast.error('Please enter a valid email address', { theme: 'colored' });
      return false;
    }

    // Validate password
    if (!ragisterData.password || ragisterData.password.length < 8) {
      toast.error('Password must be at least 8 characters long', {
        theme: 'colored',
      });
      return false;
    } else if (ragisterData.password !== ragisterData.confirmPassword) {
      toast.error('Passwords do not match', { theme: 'colored' });
      return false;
    }

    // Validate terms agreement
    if (!ragisterData.checkbox) {
      toast.error('Please agree to the terms and privacy policy', {
        theme: 'colored',
      });
      return false;
    }
    setIsLoading(true);
    adminSignup(ragisterData)
      .then((res) => {
        toast.success(res.data.message, {
          theme: 'colored',
          autoClose: 3000,
          closeOnClick: true,
        }); // Success toast
        setIsLoading(false);
        setTimeout(() => Navigate('/'), 4000);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message, {
          theme: 'colored',
          autoClose: 3000,
          closeOnClick: true,
        }); // Error toast
      });
  };

  return (
    <div className={styles.mainContainer}>
      <ToastContainer />
      <div className={styles.ragisterContainer}>
        <div className={styles.formContainer}>
          <div className={styles.form}>
            <div className={styles.formHeading}>
              {/* Form heading */}
              <h2>Welcome To Admin Panel</h2>
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
              <span onClick={() => Navigate('/')}>Log In</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
