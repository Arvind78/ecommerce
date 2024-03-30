import React, { useState } from 'react';
import styles from './UserUpdateModel.module.css';
import { Tag } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { updateUserDetails } from '../../../utils/userApi';

const UserUpdateModel = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const openModal = () => {
    setIsModalOpen(true);
    setFormData({
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
    });
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      formData.name === '' ||
      formData.email === '' ||
      formData.phone === ''
    ) {
      return toast.error('Please fill all fields!', {
        autoClose: 3000,
        theme: 'colored',
        closeOnClick: true,
      });
    } else {
      setLoading(true);
      updateUserDetails(formData, data?._id)
        .then((res) => {
          return toast.success(res.data.message, {
            autoClose: 3000,
            theme: 'colored',
            closeOnClick: true,
          });
        })
        .catch((err) => {
          return toast.error(err.response.data.message, {
            autoClose: 3000,
            theme: 'colored',
            closeOnClick: true,
          });
        })
        .finally(() => {
          return setLoading(false);
        });
    }
  };

  return (
    <div className={styles['main-container']}>
      <Tag onClick={openModal} color="blue">
        Update
      </Tag>
      {isModalOpen && (
        <div className={styles['user-model']}>
          <ToastContainer />
          <div className={styles['user-user-contant']}>
            <div className={styles['model-header']}>
              <h2>Update User Information</h2>
              <button
                type="button"
                className={styles['close-button']}
                onClick={closeModal}
              >
                X
              </button>
            </div>
            <div className={styles['model-body']}>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter Phone"
                  pattern="^\d{10}$"
                  title="Please enter a valid 10-digit phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className={styles['save-button']}
                  onClick={handleSubmit}
                >
                  {loading ? 'Loading...' : 'Save'}
                </button>
              </form>
            </div>
            <div className={styles['model-footer']}>
              <button
                type="button"
                className={styles['cancel-button']}
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserUpdateModel;
