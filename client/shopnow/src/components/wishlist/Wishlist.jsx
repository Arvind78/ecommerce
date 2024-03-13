// Wishlist.js
import React, { useState, useEffect } from 'react';
import styles from './Style.module.css';
import Header from '../../components/common/header/Header';
import Footer from '../../components/common/footer/Footer';
import emptyImg from '../../assets/image/empty-items.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { Rate } from 'antd';
import { GoHeart } from 'react-icons/go';
import { IoHeart } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../../store/wishlistSlice';
import { MdDeleteForever } from 'react-icons/md';
import ResponsivePagination from 'react-responsive-pagination';
import {
  addItemToCart,
  decreaseItemQuantity,
  increaseItemQuantity,
} from '../../store/cartSlice';

const Wishlist = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlistProduct.products);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(wishlist.length / 10);
  const paginatedProducts = wishlist.slice(
    currentPage * 10 - 10,
    currentPage * 10
  );

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.heading}>
        {/* Heading with home link */}
        <h2>Wishlist</h2>
        <div onClick={() => Navigate('/')}>
          <FaHome size={24} />
          Home
        </div>
      </div>
      <div className={styles.section}>
        {wishlist.length > 0 ? (
          <div className={styles.cards}>
            {paginatedProducts?.map((product) => (
              <div className={styles.productCart} key={product?._id}>
                <img src={product?.image} alt="product image error" />
                <h2>{product?.name}</h2>
                <h3>1 Item</h3>
                <div className={styles.priceSection}>
                  <div>
                    <span>${product?.price}</span>
                    <span>{/* <del>$29.99</del> */}</span>
                  </div>
                  <div>
                    <MdDeleteForever
                      size={16}
                      className={styles.deleteIcon}
                      color="#E76D6D"
                      onClick={() => dispatch(removeProduct(product?._id))}
                    />
                  </div>
                </div>
                <div className={styles.addToCartBtn}>
                  <button
                    onClick={() => dispatch(decreaseItemQuantity(product))}
                  >
                    &#8722;
                  </button>
                  <span onClick={() => dispatch(addItemToCart(product))}>
                    Add
                  </span>
                  <button
                    onClick={() => dispatch(increaseItemQuantity(product))}
                  >
                    &#43;
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptySection}>
            <img src={emptyImg} alt="empty-image" />
            <p className={styles.emptyMessage}>Your wishlist is empty.</p>
          </div>
        )}
        {wishlist.length > 0 && (
          <div className={styles.pagination}>
            <ResponsivePagination
              current={currentPage}
              total={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
