import React, { useEffect, useState } from 'react';
import styles from './ViewOrder.module.css'; // Import CSS modules
import {
  deleteOrderId,
  fetchUpdateOrderStatus,
  fetchUserOrder,
} from '../../../utils/adminPanelApi';
import { Button, Tag } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '@chakra-ui/react';

const ViewOrderModal = ({ id, isOpen, setIsOpen }) => {
  const [orderDetails, setOrderDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleClose = () => {
    setIsOpen(false);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchUserOrder(id);
      setOrderDetails(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [id, isOpen]);

  // if (isLoading) {
  //   return <div style={{
  //     display: 'flex',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     height: '80vh'
  //   }}>
  //     <Spinner
  //         thickness='4px'
  //         speed='0.50s'
  //         emptyColor='gray.200'
  //         color='#38A169'
  //         size='lg'
  //     />
  //   </div>;
  // }

  const handleDeleteOrder = (id) => {
    deleteOrderId(id)
      .then((res) => {
        return toast.success(res?.data?.message, {
          theme: 'colored',
        });
      })
      .catch((err) => {
        return toast.error(err?.response?.data?.message, {
          theme: 'colored',
        });
      })
      .finally(() => {
        handleClose();
      });
  };

  const handleOrderStatusUpdate = (id) => {
    if (status === '' || status === undefined) {
      toast.error('Please select a status!', {
        theme: 'colored',
      });
      return;
    }
    setIsLoading(true);
    fetchUpdateOrderStatus(id, status)
      .then((res) => {
        toast.success('Order status successfully updated!', {
          theme: 'colored',
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      })
      .finally(() => {
        setIsLoading(false);
        fetchData();
      });
  };

  return (
    <div className={styles.mainContainer}>
      <Tag
        color="blue"
        style={{ cursor: 'pointer' }}
        onClick={() => setIsOpen(true)}
      >
        View
      </Tag>

      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <ToastContainer />
            <div className={styles.modalHeader}>
              <h3>Order Details</h3>
              <button onClick={handleClose}>X</button>
            </div>
            <div className={styles.modelBody}>
              <div className={styles.order}>
                <div className={styles.orderInfoCart}>
                  <span>Order ID</span>
                  <p> {orderDetails?._id}</p>
                </div>

                <div className={styles.orderInfoCart}>
                  <span>Order Amount</span>
                  <p> $ {orderDetails?.amount}</p>
                </div>

                <div className={styles.orderInfoCart}>
                  <span>Payment Status</span>
                  <p> {orderDetails?.paymentStatus}</p>
                </div>

                <div className={styles.orderInfoCart}>
                  <span>Order Status</span>
                  <p> {orderDetails?.status}</p>
                </div>
                <div className={styles.itemContainer}>
                  {orderDetails?.items?.map((item, index) => (
                    <div key={index} className={styles.item}>
                      <img src={item.image} alt="product" />
                      <div className={styles.itemInfo}>
                        <p> {item.name}</p>
                        <section>
                          <span>Quantity : {item.quantity}</span>
                          <span>Price : $ {orderDetails.subTotal}</span>
                          <span>Shipping : $ {orderDetails.shipping}</span>
                          <span> Tax: $ {orderDetails.tax}</span>
                        </section>
                      </div>
                    </div>
                  ))}
                  <div className={styles.address}>
                    <h3>Shipping Address</h3>
                    <div className={styles.addressInfo}>
                      <span> Title : {orderDetails?.address?.title}</span>
                      <span> Address : {orderDetails?.address?.address}</span>
                      <span> City : {orderDetails?.address?.city}</span>
                      <span>State : {orderDetails?.address?.state}</span>
                      <span> Country : {orderDetails?.address?.country}</span>
                      <span> Pincode : {orderDetails?.address?.pincode}</span>
                      <span>Phone : {orderDetails?.address?.phone}</span>
                    </div>
                  </div>
                  <div className={styles.update}>
                    <h2>Update Order Status</h2>
                    <div className={styles.updateInfo}>
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={() =>
                          handleOrderStatusUpdate(orderDetails?._id)
                        }
                      >
                        {isLoading ? 'Loading...' : 'Update'}
                      </button>

                      <button
                        style={{ backgroundColor: '#FF4D4F' }}
                        onClick={() => handleDeleteOrder(orderDetails?._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrderModal;
