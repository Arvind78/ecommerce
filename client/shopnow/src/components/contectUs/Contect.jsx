import React, { useEffect, useState } from 'react';
import styles from './Style.module.css';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPhoneAlt, FaBuilding, FaUser } from 'react-icons/fa';
import {
  MdEmail,
  MdOutlineChatBubble,
  MdOutlineSmartphone,
} from 'react-icons/md';
import { IoLocation } from 'react-icons/io5';
import contactImg from '../../assets/image/contact.png';
import { isValidateContectInput } from '../../utils/validation';
import { ToastContainer, toast } from 'react-toastify';
import Loading from 'react-loading';
import { contactUsHandler } from '../../utils/userApi';
const Contect = () => {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidateContectInput(contactData)) {
      return false;
    } else {
      setIsLoading(true);
      contactUsHandler(contactData)
        .then((res) => {
          setIsLoading(false);
          toast.success(res.data.message, { theme: 'colored' });

          setContactData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
          });
        })
        .catch((err) => {
          setIsLoading(false);

          toast.error(err.response.data.message, { theme: 'colored' });
          return false;
        });
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.container}>
        <ToastContainer />
        <div className={styles.heading}>
          <h2>Contact</h2>
          <div onClick={() => Navigate('/')}>
            <FaHome size={24} />
            Home
          </div>
        </div>
        <div className={styles.contactContainer}>
          <div data-aos="fade-right" className={styles.imgContainer}>
            <div className={styles.image}>
              <img src={contactImg} alt="" />
            </div>
            <h1 className={styles.headingContact}>Get In Touch</h1>

            <div className={styles.otherInfo}>
              <div className={styles.addressDeteils}>
                <FaPhoneAlt className={styles.icon} />
                <div>
                  <h2> Phone</h2>
                  <span> (+1) 618 190 496</span>
                </div>
              </div>

              <div className={styles.addressDeteils}>
                <MdEmail className={styles.icon} />
                <div>
                  <h2> Email</h2>
                  <span>geweto9420@chokxus.com</span>
                </div>
              </div>

              <div className={styles.addressDeteils}>
                <IoLocation className={styles.icon} />
                <div>
                  <h2> Head Office</h2>
                  <span>Cruce Casa de Postas 29</span>
                </div>
              </div>

              <div className={styles.addressDeteils}>
                <FaBuilding className={styles.icon} />
                <div>
                  <h2>Office</h2>
                  <span>London Office</span>
                </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-left" className={styles.formContainer}>
            <h1 className={styles.formHeading}>Contact Us</h1>
            <form>
              <div className={styles.groupFiled}>
                <label htmlFor="">Name</label>
                <div className={styles.inputGroup}>
                  <FaUser />
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    name="name"
                    value={contactData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.groupFiled}>
                <label htmlFor="">Email</label>
                <div className={styles.inputGroup}>
                  <MdEmail size={18} />
                  <input
                    type="text"
                    placeholder="Enter Your Email"
                    name="email"
                    value={contactData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.groupFiled}>
                <label htmlFor="">Phone</label>
                <div className={styles.inputGroup}>
                  <MdOutlineSmartphone size={18} />
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    name="phone"
                    value={contactData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.groupFiled}>
                <label htmlFor="">Subject</label>
                <div className={styles.inputGroup}>
                  <FaUser />
                  <input
                    type="text"
                    placeholder="Enter Your Subject"
                    name="subject"
                    value={contactData.subject}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.groupFiled}>
                <label htmlFor="">Message</label>
                <div className={styles.textGroup}>
                  <MdOutlineChatBubble size={20} className={styles.chatIcon} />
                  <textarea
                    rows={4}
                    name="message"
                    value={contactData.message}
                    onChange={handleChange}
                    placeholder="Enter Your Message"
                  ></textarea>
                </div>
              </div>

              <div className={styles.formBtn}>
                <button onClick={handleSubmit}>
                  {isLoading ? (
                    <Loading
                      type="bubbles"
                      width="25px"
                      height="22px"
                      color="#fff"
                    />
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </div>
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

export default Contect;
