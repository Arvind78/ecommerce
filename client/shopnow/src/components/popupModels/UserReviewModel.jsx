import React, { useState } from 'react';
import styles from './UserReviewModel.module.css';
import { MdRateReview } from 'react-icons/md';
import { FcAddImage } from 'react-icons/fc';
import { createRevieHandler } from '../../utils/userApi';
import { ToastContainer, toast } from 'react-toastify';

const UserReviewModel = ({ model, toggle }) => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'profileImg' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('designation', formData.designation);
    data.append('description', formData.description);
    data.append('profileImg', formData.profileImg);
    createRevieHandler(data)
      .then((res) => {
        toast.success(res.data.message, { theme: 'colored' });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { theme: 'colored' });
      });
  };
  return (
    <div className={styles.userReviewModel}>
      <ToastContainer />
      <section onClick={toggle}>
        <MdRateReview />
      </section>

      {model && (
        <div className={styles.modalDialog}>
          <form className={styles.modalContent} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Designation"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              cols=""
              rows="1"
            ></textarea>
            <div>
              <label className={styles.fileInput} htmlFor="fileInput">
                <FcAddImage size={36} />
                Avatar Upload
              </label>
              <input
                type="file"
                id="fileInput"
                name="profileImg"
                onChange={handleChange}
                style={{ display: 'none' }} // Hide the file input visually
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserReviewModel;
