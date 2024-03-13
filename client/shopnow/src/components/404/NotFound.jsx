import React from 'react';
import styles from './Style.module.css';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import img404 from '../../assets/image/404.png';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
  const Navigate = useNavigate();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.notFoundContainer}>
          <img src={img404} alt="" />
          <p>
            The page you are looking for could not be found. The link to this
            address may be outdated or we may have moved the since you last
            bookmarked it.
          </p>
          <button onClick={() => Navigate('/')}>Back To Home</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
