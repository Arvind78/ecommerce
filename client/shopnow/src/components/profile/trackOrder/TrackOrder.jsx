import React, { useState } from 'react';
import styles from './Style.module.css';
import { trackOrder } from './../../../utils/paymentApi';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState({});
  const trackId = searchParams.get('trackingId');
  const [trackingId, setTrackingId] = useState(trackId);

  const trackOrderHander = () => {
    trackOrder(trackingId)
      .then((res) => {
        console.log(res.data.data);
        setOrder(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2>Track Order</h2>
      <div className={styles.TrackOrder}>
        <input
          type="text"
          placeholder="Enter your order id..."
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <button onClick={trackOrderHander}>Track</button>
      </div>
      <div className={styles.orderDetail}>
        <div className={styles.orderDetailInfo}>
          <p>Order ID: {order?._id}</p>
          <p>Order Date: {moment(order?.createdAt).format('DD MMM YYYY')}</p>
          <p> Amount: ${order?.amount}</p>
          <p> Status: {order?.status}</p>
        </div>
        <div className={styles.productContainer}>
          {order?.items?.map((product) => (
            <div className={styles.products} key={product?._id}>
              <img src={product?.image} alt={product?.name} />
              <div>
                <h2>{product?.name}</h2>
                <h2>Quantity:{product?.quantity}</h2>
                <h2>Price : $ {product?.price}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
