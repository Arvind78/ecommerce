import React from 'react';
import styles from './Style.module.css'; // Assuming the module name is
import { IoMdCloseCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const OrderCancel = ({ reason }) => {
  const Navigate = useNavigate();

  return (
    <div className={styles.orderSuccessContainer}>
      <div className={styles.checkmarkContainer}>
        <IoMdCloseCircle size={100} className={styles.checkmark} />
      </div>
      <div className={styles.orderDetails}>
        <h2>Order Cancel!</h2>
        <p>Your order has been cancelled .</p>
      </div>
      <button onClick={() => Navigate('/')}>Back To Home</button>
    </div>
  );
};

export default OrderCancel;
