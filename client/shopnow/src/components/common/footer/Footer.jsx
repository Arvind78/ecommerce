// Footer.js
import React from 'react';
import styles from './Style.module.css'; // import the module CSS file
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import {
  MdOutlineMarkEmailUnread,
  MdOutlineContactPhone,
} from 'react-icons/md';

import pyment from '../../../assets/image/paymet.png';
import gstore from '../../../assets/image/playstore.svg';
import astore from '../../../assets/image/appstore.svg';
import { useNavigate } from 'react-router-dom';
function Footer() {
  const Navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.title}>
            SHOP<span>NOW</span>
          </h3>
          <p className={styles.text}>
            Discover convenience redefined at our multipurpose store. From to
            the latest fashion trends find everything you need under one roof.
            Your one-stop shopping destination for a diverse range of products.
          </p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Categories</h3>
          <ul className={styles.list}>
            <li className={styles.item}>
              <a href="#" className={styles.link}>
                Men
              </a>
            </li>
            <li className={styles.item}>
              <a href="#" className={styles.link}>
                Women
              </a>
            </li>
            <li className={styles.item}>
              <a href="#" className={styles.link}>
                Kids
              </a>
            </li>
            <li className={styles.item}>
              <a href="#" className={styles.link}>
                Electronics
              </a>
            </li>
            <li className={styles.item}>
              <a href="#" className={styles.link}>
                Furniture
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Useful Links</h3>
          <ul className={styles.list}>
            <li className={styles.item}>
              <a onClick={() => Navigate('/')} className={styles.link}>
                Home
              </a>
            </li>
            <li className={styles.item}>
              <a onClick={() => Navigate('/product')} className={styles.link}>
                Collections
              </a>
            </li>
            <li className={styles.item}>
              <a onClick={() => Navigate('/about')} className={styles.link}>
                About
              </a>
            </li>

            <li className={styles.item}>
              <a onClick={() => Navigate('/cart')} className={styles.link}>
                Cart
              </a>
            </li>
            <li className={styles.item}>
              <a onClick={() => Navigate('/search')} className={styles.link}>
                Search
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Help Center</h3>
          <ul className={styles.list}>
            <li className={styles.item}>
              <a onClick={() => Navigate('/myaccount')} className={styles.link}>
                My Account
              </a>
            </li>
            <li className={styles.item}>
              <a onClick={() => Navigate('/myaccount')} className={styles.link}>
                My Orders
              </a>
            </li>
            <li className={styles.item}>
              <a onClick={() => Navigate('/wishlist')} className={styles.link}>
                Wishlist
              </a>
            </li>

            <li className={styles.item}>
              <a onClick={() => Navigate('/fqa')} className={styles.link}>
                FAQ's
              </a>
            </li>
            <li className={styles.item}>
              <a onClick={() => Navigate('/contact')} className={styles.link}>
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3 className={styles.title}>Contact Us</h3>
          <p className={styles.text}>
            <div className={styles.support}>
              <div>
                <MdOutlineContactPhone size={18} /> Customer Support 24/7
              </div>
              <span>+1 555 -186 -5359</span>
            </div>
            <div className={styles.support}>
              <div>
                <MdOutlineMarkEmailUnread size={20} /> support@shopnow.com
              </div>
            </div>
          </p>
          <p className={styles.text}>Download App:</p>
          <div className={styles.icons}>
            <a href="#" className={styles.icon}>
              <img
                src={gstore}
                alt="playstore image error"
                className={styles.storeIcon}
              />
            </a>
            <a href="#" className={styles.icon}>
              <img
                src={astore}
                className={styles.storeIcon}
                alt="Apple store image error"
              />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.container2}>
          <p className={styles.copy}>©2023 Fastkart All rights reserved</p>
          <div className={styles.payment}>
            <img src={pyment} alt="VISA" className={styles.image} />
          </div>
          <div className={styles.social}>
            <span>Stay connected : </span>
            <a href="https://www.facebook.com/" className={styles.icon}>
              <FaFacebookF size={15} />
            </a>
            <a href="https://twitter.com/" className={styles.icon}>
              <FaTwitter size={15} />
            </a>
            <a href="https://www.instagram.com/" className={styles.icon}>
              <FaInstagram size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
