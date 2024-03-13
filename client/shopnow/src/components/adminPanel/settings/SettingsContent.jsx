import React, { useState } from 'react';
import styles from './SettingsContent.module.css';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { adminUpdateImage } from '../../../utils/adminPanelApi';
import { ToastContainer, toast } from 'react-toastify';
import Loading from 'react-loading';

const SettingsContent = () => {
  const isAdmin = JSON.parse(sessionStorage.getItem('isAdminLogin'));
  const [formData, setFormData] = useState({
    name: isAdmin?.name,
    email: isAdmin?.email,
  });
  const [loading, setLoading] = useState({
    type: '',
  });
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const image = new FormData();
    image.append('image', e.target.files[0]);
    setLoading({
      load: true,
      type: 'image',
    });
    adminUpdateImage(isAdmin?._id, image)
      .then((res) => {
        toast.success(res.data.message, { theme: 'colored' });
        sessionStorage.setItem('isAdminLogin', JSON.stringify(res.data.data));
        setLoading({
          type: '',
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { theme: 'colored' });
        setLoading({
          type: '',
        });
        return false;
      });
  };

  const handleSubmit = () => {
    setLoading({
      type: 'deteils',
    });
    adminUpdateImage(isAdmin?._id, formData)
      .then((res) => {
        toast.success(res.data.message, { theme: 'colored' });
        sessionStorage.setItem('isAdminLogin', JSON.stringify(res.data.data));
        setLoading({
          type: '',
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { theme: 'colored' });
        setLoading({
          type: '',
        });
        return false;
      });
  };

  const handleForgetPassword = () => {
    sessionStorage.removeItem('isAdminLogin');
    Navigate('/forget');
  };

  return (
    <div className={styles['settingsContainer']}>
      <ToastContainer />
      <h2>Account Settings</h2>
      <div className={styles['ProfileContainer']}>
        <h3>Profile Picture</h3>
        <p>Accepted formats: PNG, JPG. Maximum file size: 5 MB.</p>
        <section className={styles['profileImg']}>
          <Avatar src={isAdmin?.profileImg} size={90} />
          <div>
            <label htmlFor="image" className={styles['upload-btn']}>
              {loading.type === 'image' ? (
                <div>
                  <Loading
                    type="bubbles"
                    color="white"
                    width={30}
                    height={20}
                  />
                </div>
              ) : (
                ' UPLOAD IMAGE'
              )}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className={styles['image-input']}
              onChange={handleImageUpload}
            />
          </div>
          {/* <span>Remove image</span> */}
        </section>
        <section className={styles['personalInfo']}>
          <h3>Personal Information</h3>
          <p>Your login credentials and the name displayed in reports</p>
          <div className={styles['input-group']}>
            <label htmlFor="name">Name:</label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={styles['input']}
            />
          </div>

          <div className={styles['input-group']}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={styles['input']}
            />
          </div>

          <div className={styles['btn-group']}>
            <button className={styles['updateButton']} onClick={handleSubmit}>
              {loading.type === 'deteils' ? (
                <div>
                  <Loading
                    type="bubbles"
                    color="white"
                    width={30}
                    height={25}
                  />
                </div>
              ) : (
                ' Update'
              )}
            </button>
            <button
              className={styles['forgetPasswordButton']}
              onClick={handleForgetPassword}
            >
              Forget Password
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsContent;
