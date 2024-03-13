import React, { useState } from 'react';
import styles from './Style.module.css';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { createReturnOrderRequest } from '../../../utils/returnOrderApi';
import { ToastContainer, toast } from 'react-toastify';
const ViewOrderModel = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [returnData, setReturnData] = useState({
    orderId: order?._id,
    userId: currentUser?._id,
    reason: '',
  });
  const handleChange = (e) => {
    setReturnData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const openModelHandler = () => {
    setIsOpen(true);
  };

  const closeModelHandler = () => {
    setIsOpen(false);
  };

  const handelReturnOrder = () => {
    if (returnData.reason === '') {
      return toast.error('Please enter reason', { theme: 'colored' });
    } else {
      createReturnOrderRequest(returnData)
        .then((res) => {
          toast.success(res.data.message, { theme: 'colored' });
          setReturnData({
            reason: '',
          });
        })
        .catch((err) => {
          return toast.error(err.response.data.message, { theme: 'colored' });
        });
    }
  };

  return (
    <div className={styles.mainContainer}>
      <button onClick={openModelHandler}>View</button>
      {isOpen && (
        <div className={styles.modelContainer}>
          <ToastContainer />
          <div className={styles.modelContent}>
            <div className={styles.modelHeader}>
              <h2>Order Details</h2>
              <span onClick={closeModelHandler}>X</span>
            </div>

            <div className={styles.modelBody}>
              <div className={styles.orderInfo}>
                <div>
                  <h2>Order ID</h2>
                  <p>{order?._id}</p>
                </div>

                <div>
                  <h2>Order Date</h2>
                  <p>{moment(order?.createdAt).format('MMM DD YYYY')}</p>
                </div>

                <div>
                  <h2>Order Status</h2>
                  <p>{order?.status}</p>
                </div>

                <div>
                  <h2>Total Amount</h2>
                  <p> ${order?.amount}</p>
                </div>
              </div>

              <div className={styles.orderItems}>
                {order?.items.map((item) => (
                  <div key={item._id} className={styles.order}>
                    <img src={item.image} alt="product" />
                    <div className={styles.productDetails}>
                      <h3>{item.name}</h3>
                      <div className={styles.priceAndQuantity}>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: $ {item.price}</p>
                        <p>Shipping: $ {order?.shipping}</p>
                        <p>Tax: $ {order?.tax}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.btnGroup}>
                {order?.status === 'order placed' ||
                order?.status === 'dispatched' ? (
                  <button>Cancel Order</button>
                ) : order?.status === 'delivered' ? (
                  <div className={styles.reasonMeassage}>
                    <textarea
                      placeholder="What is reason..."
                      name="reason"
                      value={returnData.reason}
                      onChange={handleChange}
                    ></textarea>

                    <button onClick={handelReturnOrder}>Return Order</button>
                  </div>
                ) : (
                  order?.status === 'return' && (
                    <button disabled={true}>Return Order</button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrderModel;
