import React, { useState } from 'react';
import styles from './Style.module.css';
import forgetImg from '../../../assets/image/forgot.png';
import { useNavigate } from 'react-router-dom';
import PopupModel from './PopupModel';
import { ToastContainer, toast } from 'react-toastify';
import Loading from 'react-loading';
import { adminForgetSendMail } from '../../../utils/adminPanelApi';
import { isValidateForgetMail } from './../../../utils/validation';

const AdminForget = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const modelOpenHandler = () => {
    setIsOpen(true);
  };
  const modelCloseHandler = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (!isValidateForgetMail(email)) {
      return false;
    } else {
      setIsLoading(true);
      adminForgetSendMail(email)
        .then((res) => {
          setIsLoading(false);
          setTimeout(() => {
            modelOpenHandler();
          }, 1000);
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(err.response.data.message, { theme: 'colored' });
          return false;
        });
    }
    setEmail('');
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginContainer}>
        <ToastContainer />
        <PopupModel
          isOpen={modelOpenHandler}
          openModel={isOpen}
          isClose={modelCloseHandler}
        />

        <div className={styles.formContainer}>
          <div className={styles.imgContainer}>
            <img src={forgetImg} alt="" />
          </div>
          <div className={styles.form}>
            <div className={styles.formHeading}>
              <h2>Welcome To Admin</h2>
              <h4>Forgot your password</h4>
            </div>

            <div className={styles.formInput}>
              <input
                type="text"
                placeholder="Email Address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default AdminForget;
