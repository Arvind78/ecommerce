import { Tag } from 'antd';
import React, { useState } from 'react';
import styles from './Model.module.css';
import { deleteEnquiries, updateEnquiries } from '../../../utils/adminPanelApi';
import { ToastContainer, toast } from 'react-toastify';
const EnquiryModel = ({ data, fetchData }) => {
  const [isOpen, seIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handelOpenModel = () => {
    seIsOpen(true);
  };

  const handelCloseModel = () => {
    seIsOpen(false);
  };

  const handelUpdateEnquiry = () => {
    setLoading(true);
    updateEnquiries(data?._id, status)
      .then((res) => {
        toast.success(res.data.message, { theme: 'colored' });
        fetchData();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, { theme: 'colored' });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handelDeleteEnquiry = () => {
    deleteEnquiries(data?._id)
      .then((res) => {
        toast.success(res.data.message, { theme: 'colored' });
        fetchData();
      })
      .catch((err) => {
        return toast.error(err?.response?.data?.message, { theme: 'colored' });
      });
  };

  return (
    <div className={styles.mainContainer}>
      <Tag color="blue" onClick={handelOpenModel}>
        Update
      </Tag>
      {isOpen && (
        <div className={styles.model}>
          <ToastContainer />
          <div className={styles.modelContent}>
            <div className={styles.modelHeader}>
              <h3>Update Enquiry</h3>
              <button className={styles.closeBtn} onClick={handelCloseModel}>
                X
              </button>
            </div>
            <div className={styles.modelBody}>
              <p>Name : {data?.name}</p>
              <p>Email : {data?.email}</p>
              <p>Phone : {data?.phone}</p>
              <p>Status : {data?.status}</p>
              <textarea
                rows={2}
                cols={35}
                placeholder="message..."
                value={data?.message}
              ></textarea>
              <div className={styles.btnContainer}>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select Status </option>
                  <option value="pending">Pending</option>
                  <option value="success">Success</option>
                </select>
                <button
                  className={styles.updateBtn}
                  onClick={handelUpdateEnquiry}
                >
                  {loading ? 'loading...' : 'update'}
                </button>
                <button
                  className={styles.removeBtn}
                  onClick={handelDeleteEnquiry}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className={styles.modelFooter}>
              <button
                className={styles.closeBtnFooter}
                onClick={handelCloseModel}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiryModel;
