import React, { useEffect, useState } from 'react';
import { TbEdit } from 'react-icons/tb';
import styles from './Style.module.css';
import { HiMiniCamera } from 'react-icons/hi2';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateUserDetails,
  userUpdateProfileImage,
} from '../../../utils/userApi';
import { toast } from 'react-toastify';
import { updateUser } from '../../../store/userSlice';

const UpdateProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: currentUser?.name,
    email: currentUser?.email,
    phone: currentUser?.phone,
    address: currentUser?.address,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const profileImageHandler = async () => {
      if (image) {
        try {
          const formData = new FormData();
          formData.append('avatar', image);
          const res = await userUpdateProfileImage(formData, currentUser._id);
          dispatch(updateUser(res.data.user));
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    };
    profileImageHandler();
  }, [image, currentUser._id, dispatch]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setImage(null);
  };

  const handleSubmit = async () => {
    try {
      const res = await updateUserDetails(formData, currentUser._id);
      toast.success(res.data.message, {
        theme: 'colored',
        autoClose: 3000,
        closeOnClick: true,
      });
      dispatch(updateUser(res.data.user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <TbEdit onClick={openModal} size={28} className={styles.edit} />
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.heading}>
              <h3>Update Profile</h3>
              <button className={styles.closeBtn} onClick={closeModal}>
                X
              </button>
            </div>
            <div className={styles.form}>
              <div className={styles.profileImage}>
                <div>
                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : currentUser?.profileImg
                    }
                    alt=""
                  />
                  <label className={''}>
                    <HiMiniCamera size={35} />{' '}
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                      name="avatar"
                      style={{ display: 'none' }}
                      required
                    />
                  </label>
                </div>
              </div>
              <div className={styles.detailInput}>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                  />
                </div>
                <div>
                  <label htmlFor="address">Address</label>
                  <textarea
                    name="address"
                    rows={1}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                  />
                </div>
              </div>
            </div>
            <div className={styles.footer}>
              <button className={styles.cancelBtn} onClick={closeModal}>
                Cancel
              </button>
              <button className={styles.updateBtn} onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
