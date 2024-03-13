import React, { useState } from 'react';
import styles from './Style.module.css';
import forgetImg from '../../assets/image/forgot.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { isValidateForgetPassword } from '../../utils/validation';
import { userForgetPassword } from '../../utils/userApi';
import Loading from 'react-loading';
import { logout } from '../../store/userSlice';

const PasswordReset = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    password: '',
    confirmPassword: '',
  });
  const handleSubmit = () => {
    if (!isValidateForgetPassword(data)) {
      return false;
    } else {
      setIsLoading(true);
      dispatch(logout());
      userForgetPassword(data, id)
        .then((res) => {
          setIsLoading(false);
          toast.success(res.data.message, { theme: 'colored' });
          Navigate('/login');
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(err.response.data.message, { theme: 'colored' });
          return false;
        });
    }
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginContainer}>
        <ToastContainer />
        <div className={styles.formContainer}>
          <div className={styles.imgContainer}>
            <img src={forgetImg} alt="" />
          </div>
          <div className={styles.form}>
            <div className={styles.formHeading}>
              <h2 style={{ textAlign: 'center', margin: '10px 5px' }}>
                Forgot Your Password
              </h2>
            </div>

            <div className={styles.formInput}>
              <input
                type="password"
                placeholder="Enter new password"
                value={data.password}
                style={{ fontSize: '13px' }}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <input
                type="text"
                placeholder="Enter confirm password"
                style={{ fontSize: '13px' }}
                value={data.confirmPassword}
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
                }
              />
            </div>

            <button className={styles.formBtn} onClick={handleSubmit}>
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
                'Send'
              )}
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default PasswordReset;
