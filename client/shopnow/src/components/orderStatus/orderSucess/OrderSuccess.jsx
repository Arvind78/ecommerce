import React from 'react';
import styles from './Style.module.css';
import { FaCircleCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = ({ orderData }) => {
  const Navigate = useNavigate();

  return (
    <div className={styles.orderSuccessContainer}>
      <div className={styles.checkmarkContainer}>
        <FaCircleCheck size={100} className={styles.checkmark} />
      </div>
      <div className={styles.orderDetails}>
        <h2>Order Successful!</h2>
        <p>Your order has been placed successfully.</p>
      </div>
      <div className={styles.actions}>
        <p>
          To view your order details and track the shipment,
          <br />
          please check your email and open Gmail.
        </p>
      </div>
      <button onClick={() => Navigate('/')}>Back To Home</button>
    </div>
  );
};

export default OrderSuccess;
