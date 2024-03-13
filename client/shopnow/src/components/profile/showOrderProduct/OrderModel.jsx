import React, { useState } from 'react';
import { TbEdit } from 'react-icons/tb';
import styles from './Style.module.css';
import { PiEyeBold } from 'react-icons/pi';
const OrderModel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.mainConatiner}>
      <TbEdit onClick={openModal} className={styles.edit} />
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.heading}>
              <h3>Update Profile</h3>
              <button className={styles.closeBtn} onClick={closeModal}>
                X
              </button>

              <div className={styles.footer}>
                <button className={styles.cancelBtn}>Cancel</button>
                <button className={styles.updateBtn}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderModel;
