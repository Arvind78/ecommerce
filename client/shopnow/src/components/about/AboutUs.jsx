// AboutUs.js
import React, { useEffect, useState } from 'react';
import styles from './Style.module.css';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@chakra-ui/react';
import { getRevieHandler } from '../../utils/userApi';
const AboutUs = () => {
  const [review, setReview] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    getRevieHandler()
      .then((res) => setReview(res.data.reviews))
      .catch((err) => console.log(err));
  }, []);

  console.log(review);
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.heading}>
        <h2>About Us</h2>
        <div onClick={() => Navigate('/')}>
          <FaHome size={24} />
          Home
        </div>
      </div>

      <div className={styles.section}>
        <img
          src="https://img.freepik.com/free-vector/about-us-concept-illustration_114360-639.jpg?t=st=1710017445~exp=1710021045~hmac=84fc6566ab9d81349e98d453c4aefaf11544c23436251f6b7a757ee385ffa867&w=740"
          alt="ShopNow Logo"
          className={styles.logo}
        />
        <div>
          <p>
            We are ShopNow, a leading online marketplace that connects buyers
            and sellers across the world. We offer a wide range of products,
            from fashion to electronics, at affordable prices and fast delivery.
            We are committed to providing the best customer service and shopping
            experience for our users.
          </p>

          <p>
            Our mission is to empower people to buy and sell anything online,
            and to create a more inclusive and sustainable economy.
          </p>

          <p>
            Our vision is to become the world's most trusted and innovative
            e-commerce platform, and to make online shopping accessible and
            enjoyable for everyone.
          </p>
        </div>
      </div>

      <div className={styles.sectionTeam}>
        <h2 className={styles.title}>Our Team</h2>
        <div className={styles.cards}>
          {review?.map((review) => (
            <div className={styles.card} key={review?._id}>
              <Avatar src={review?.image} size="lg" />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{review?.name}</h3>
                <p className={styles.cardSubtitle}>{review?.designation}</p>
                <p className={styles.cardText}>{review?.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div data-aos="zoom-out" className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.4874526226017!2d81.14726579829468!3d25.386206540584613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3984b53f5e541619%3A0xd5e93c86ed83541b!2sRajapur%2C%20Uttar%20Pradesh%20210207!5e1!3m2!1sen!2sin!4v1706120019711!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: '0px' }}
            allowfullscreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
