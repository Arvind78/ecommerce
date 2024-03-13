import React, { useEffect, useState } from 'react';
import styles from './Style.module.css';
import { useSelector } from 'react-redux';
import { TbEdit, TbTruckDelivery } from 'react-icons/tb';
import UpdateProfile from '../updateProfileModel/UpdateProfile';
import { useNavigate } from 'react-router-dom';
import { BiSolidShoppingBags } from 'react-icons/bi';
import { MdAssignmentReturn } from 'react-icons/md';
import { RiMailCloseFill } from 'react-icons/ri';
import { ToastContainer } from 'react-toastify';
import { getCountOrder } from '../../../utils/paymentApi';
const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const [countOrder, setCountOrder] = useState({
    totalCanceled: 0,
    totalReturned: 0,
    totalOrders: 0,
    totalDelivered: 0,
  });

  useEffect(() => {
    getCountOrder(currentUser?._id)
      .then((res) => {
        const data = res.data.data[0];
        console.log(data);
        setCountOrder({
          totalOrders: data.totalOrders,

          totalCanceled: data.totalCanceled,
          totalReturned: data.totalReturned,
          totalDelivered: data.totalDelivered,
        });
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  console.log(countOrder);
  return (
    <div className={styles.mainContainer}>
      <ToastContainer />
      <div className={styles.headingInfo}>
        <h1 className={styles.title}>My Dashboard</h1>
        <span>
          Hello, <b>{currentUser?.name}</b>
        </span>
        <p className={styles.description}>
          Welcome to your own personal My Account dashboard. Here you have the
          ability to manage all aspects of your e-commerce journey in one
          convenient location. Whether you want to browse the newest products,
          check your order status and returns, or update your profile, you have
          everything at your fingertips.
        </p>
      </div>
      <div className={styles.dashboard}>
        <div className={styles.infoGroup}>
          <BiSolidShoppingBags className={styles.iconGroup} />
          <div>
            <span>Total Order</span>
            <h1>{countOrder?.totalOrders}</h1>
          </div>
        </div>
        <div className={styles.infoGroup}>
          <TbTruckDelivery className={styles.iconGroup} />
          <div>
            <span>Total Delivered</span>
            <h1>{countOrder?.totalDelivered}</h1>
          </div>
        </div>
        <div className={styles.infoGroup}>
          <RiMailCloseFill className={styles.iconGroup} />
          <div>
            <span>Total Cancel</span>
            <h1>{countOrder?.totalCanceled}</h1>
          </div>
        </div>
        <div className={styles.infoGroup}>
          <MdAssignmentReturn className={styles.iconGroup} />
          <div>
            <span>Total Return</span>
            <h1>{countOrder?.totalReturned}</h1>
          </div>
        </div>
      </div>

      <div className={styles.profileDeteils}>
        <section className={styles.profileHeader}>
          <h1>Profile Information</h1>
          <UpdateProfile />
        </section>
        <div className={styles.userDeteils}>
          <section>
            <div>
              <span>Name : </span>
              <span> {currentUser?.name}</span>
            </div>

            <div>
              <span>Email : </span>
              <span> {currentUser?.email}</span>
            </div>

            <div>
              <span>Phone : </span>
              <span> {currentUser?.phone}</span>
            </div>

            <div>
              <span>Address : </span>
              <span> {currentUser?.address}</span>
            </div>
          </section>
          <section className={styles.loginDeteils}>
            <div>
              <h2>Login Details</h2>
            </div>

            <div>
              <span>Email : </span>
              <span> {currentUser?.email}</span>
            </div>

            <div className={styles.passwordInput}>
              <span>Password : </span>
              <input type="password" disabled value={'demo@4080'} />
              <TbEdit
                className={styles.editIcon}
                onClick={() => Navigate('/forgot')}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
