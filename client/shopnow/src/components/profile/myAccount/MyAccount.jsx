import React, { useEffect, useState } from 'react';
import styles from './Style.module.css';
import Footer from '../../common/footer/Footer';
import Header from '../../common/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaFirstOrderAlt } from 'react-icons/fa6';
import { PiKeyReturnFill } from 'react-icons/pi';
import { GiDigitalTrace } from 'react-icons/gi';
import { RiLogoutCircleFill, RiDashboard2Line } from 'react-icons/ri';
import Dashboard from '../dashboard/Dashboard';
import Order from '../orderDeteils/Order';
import Return from '../returnProduct/Return';
import TrackOrder from '../trackOrder/TrackOrder';
import { MdOutlineLogout } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import { logoutHandler } from '../../../utils/userApi';
import { logout } from '../../../store/userSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';

const MyAccount = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const Navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [currentMenu, setCurrentMenu] = useState('dashboard');
  const trackingId = searchParams.get('trackingId');

  useEffect(() => {
    if (trackingId) {
      setCurrentMenu('track');
    }
  }, [trackingId]);
  console.log();
  const handleLogout = () => {
    logoutHandler()
      .then((res) => {
        dispatch(logout());
        localStorage.removeItem('accessToken')

        toast.success(res.data.message, {
          theme: 'colored',
        });
        Navigate('/');
      })
      .catch((err) => {
        return toast.error(err.response.data.message, {
          theme: 'colored',
        });
      });
  };
  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.mainAccount}>
        <ToastContainer />
        <div className={styles.menuItem}>
          <div className={styles.menuAvatar}>
            <img src={currentUser?.profileImg} alt="" />
          </div>

          <div className={styles.userName}>
            <h1>{currentUser?.name}</h1>
            <span>{currentUser?.email}</span>
          </div>
          <div className={styles.menu}>
            <div
              className={
                currentMenu === 'dashboard'
                  ? styles.menuActive
                  : styles.menuLink
              }
              onClick={() => setCurrentMenu('dashboard')}
            >
              <RiDashboard2Line className={styles.icon} />
              <span>Dashboard</span>
            </div>

            <div
              className={
                currentMenu === 'order' ? styles.menuActive : styles.menuLink
              }
              onClick={() => setCurrentMenu('order')}
            >
              <FaFirstOrderAlt className={styles.icon} />
              <span>Orders</span>
            </div>

            <div
              className={
                currentMenu === 'return' ? styles.menuActive : styles.menuLink
              }
              onClick={() => setCurrentMenu('return')}
            >
              <PiKeyReturnFill className={styles.icon} />
              <span>Return</span>
            </div>

            <div
              className={
                currentMenu === 'track' ? styles.menuActive : styles.menuLink
              }
              onClick={() => setCurrentMenu('track')}
            >
              <GiDigitalTrace className={styles.icon} />
              <span>Track</span>
            </div>

            <button className={styles.logOutBtn} onClick={handleLogout}>
              <MdOutlineLogout size={20} />
              Logout
            </button>
          </div>
        </div>
        <div className={styles.menuContent}>
          {currentMenu === 'dashboard' && <Dashboard />}
          {currentMenu === 'order' && <Order />}
          {currentMenu === 'return' && <Return />}
          {currentMenu === 'track' && <TrackOrder />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccount;
