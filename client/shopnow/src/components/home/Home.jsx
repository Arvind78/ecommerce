import React, { useEffect, useState } from 'react';
import styles from './Style.module.css';
import Footer from '../common/footer/Footer';
import Header from '../common/header/Header';
import heroImg from '../../assets/image/hero.jpg';
import hero2Img from '../../assets/image/hero-2.jpg';
import hero3Img from '../../assets/image/hero-3.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiOutlineArrowNarrowRight } from 'react-icons/hi';
import electronic from '../../assets/image/electronic.svg';
import sports from '../../assets/image/bootbool.png';
import assessories from '../../assets/image/assessories.svg';
import fashion from '../../assets/image/fashion.svg';
import beauty from '../../assets/image/beauty.svg';
import furniture from '../../assets/image/furniture.svg';
import gymshorts from '../../assets/image/gymshorts.png';
import { IconButton } from '@chakra-ui/react';
// import ReviewSlider from "../reviewSlider/ReviewSlider";
import { Rate } from 'antd';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Aos from 'aos';
import { GoHeart } from 'react-icons/go';
import { IoHeart } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../../store/wishlistSlice';
import { isValidateSubscribeMail } from '../../utils/validation';
import { subscribeEmailHandler } from '../../utils/userApi';
import { ToastContainer, toast } from 'react-toastify';
import { getNewProducts } from '../../utils/productApi';
import {
  addItemToCart,
  decreaseItemQuantity,
  increaseItemQuantity,
} from '../../store/cartSlice';

const breakpoints = {
  // when window width is >= 320px
  300: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  // when window width is >= 480px
  380: {
    slidesPerView: 2,
    // spaceBetween: 20,
  },
  // when window width is >= 640px
  640: {
    slidesPerView: 3,
    // spaceBetween: 10,
  },

  700: {
    slidesPerView: 3,
    // spaceBetween: 10,
  },

  800: {
    slidesPerView: 3,
    // spaceBetween: 10,
  },

  900: {
    slidesPerView: 4,
    spaceBetween: 10,
  },

  1080: {
    slidesPerView: 4,
    spaceBetween: 10,
  },

  1100: {
    slidesPerView: 5,
    spaceBetween: 10,
  },
};

const Home = () => {
  const [newProducts, setNewProducts] = useState([]);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlistProduct.products);
  const [email, setEmail] = useState('');

  useEffect(() => {
    Aos.init();
  }, []);

  // Logic for handling email subscription
  const handleEmailSubscribe = () => {
    if (!isValidateSubscribeMail(email)) {
      return false;
    } else {
      subscribeEmailHandler(email)
        .then((res) => {
          toast.success(res.data.message, { theme: 'colored' });
        })
        .catch((err) => {
          toast.error(err.response.data.message, { theme: 'colored' });
        });
    }
    setEmail('');
  };

  useEffect(() => {
    getNewProducts()
      .then((res) => {
        setNewProducts(res.data.products);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  console.log(newProducts);
  return (
    <div className={styles.Container}>
      <Header />
      <div className={styles.mainContainer}>
        <ToastContainer />
        <section className={styles.heroSection}>
          <Link to="product">
            <img src={heroImg} alt="hero image error" />
          </Link>
        </section>
        <div className={styles.itemsSection}>
          <section className={styles.categorySection}>
            <div className={styles.categoryItem}>
              <div onClick={() => Navigate('/product?category=electronic')}>
                <img src={electronic} alt="electronic image error" />
                <h4>Electronics</h4>
              </div>
            </div>
            <div className={styles.categoryItem}>
              <div onClick={() => Navigate('/product?category=sports')}>
                <img src={sports} alt="sports image error" />
                <h4>Sports</h4>
              </div>
            </div>
            <div className={styles.categoryItem}>
              <div onClick={() => Navigate('/product?category=accessories')}>
                <img src={assessories} alt="assessories image error" />
                <h4>Accessories</h4>
              </div>
            </div>
            <div className={styles.categoryItem}>
              <div onClick={() => Navigate('/product?category=fashion')}>
                <img src={fashion} alt="fashion image error" />
                <h4>Fashion</h4>
              </div>
            </div>
            <div className={styles.categoryItem}>
              <div onClick={() => Navigate('/product?category=beauty')}>
                <img src={beauty} alt="hero image error" />
                <h4>Beauty</h4>
              </div>
            </div>
            <div className={styles.categoryItem}>
              <div onClick={() => Navigate('/product?category=furniture')}>
                <img src={furniture} alt="furniture image error" />
                <h4>Furniture</h4>
              </div>
            </div>
          </section>
          <section className={styles.topSellSection}>
            <h2>Top Selling Items</h2>

            <Swiper
              className={styles.productCainter}
              modules={[Navigation, Pagination, A11y, Autoplay]}
              slidesPerView={3}
              navigation
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={breakpoints}
              pagination={{ clickable: true }}
            >
              {newProducts?.map((product) => (
                <SwiperSlide className={styles.productSlide} key={product._id}>
                  <div className={styles.productCart}>
                    <Link to={`/product/${product._id}`}>
                      <img src={product?.image} alt="product image error" />
                    </Link>

                    <h2>{product?.name}</h2>
                    <h3>1 Item</h3>
                    <div className={styles?.priceSection}>
                      <div>
                        <span>${product?.price}</span>
                        <span>{/* <del>$29.99</del> */}</span>
                      </div>
                      <div>
                        {wishlist.includes(product) ? (
                          <IoHeart
                            size={20}
                            color="#E76D6D"
                            onClick={() =>
                              dispatch(removeProduct(product?._id))
                            }
                          />
                        ) : (
                          <GoHeart
                            size={20}
                            color="#E76D6D"
                            onClick={() => dispatch(addProduct(product))}
                          />
                        )}
                      </div>
                    </div>
                    <div className={styles.ratingCaintainer}>
                      <Rate
                        className={styles.rating}
                        allowHalf
                        defaultValue={product?.rating}
                        disabled
                      />
                      <h3>in stock</h3>
                    </div>
                    <div className={styles.addToCartBtn}>
                      {product?.isAvailable === true ? (
                        <>
                          <button
                            onClick={() =>
                              dispatch(decreaseItemQuantity(product))
                            }
                          >
                            &#8722;
                          </button>
                          <span
                            onClick={() => dispatch(addItemToCart(product))}
                          >
                            Add
                          </span>
                          <button
                            onClick={() =>
                              dispatch(increaseItemQuantity(product))
                            }
                          >
                            &#43;
                          </button>
                        </>
                      ) : (
                        <>
                          <span disabled>Solid out</span>
                        </>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
          <section className={styles.hero2Section}>
            <img
              src={hero2Img}
              alt="hero2 image error"
              className={styles.heroImg2}
            />
            <img
              src={hero3Img}
              alt="hero3 image error"
              className={styles.heroImg3}
            />
          </section>

          <section className={styles.review}>{/* <ReviewSlider /> */}</section>

          <section className={styles.subscribeSection}>
            <div className={styles.subscribeInfo}>
              <h1>Join Our Newsletter And Get...</h1>
              <h2>$10 discount for your first order</h2>
              <div className={styles.subscribeInput}>
                <IconButton size={'sm'}>
                  <HiOutlineMail />
                </IconButton>
                <input
                  type="email"
                  placeholder="Enter Your Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleEmailSubscribe}
                  className={styles.subscribeBtn}
                >
                  Subscribe <HiOutlineArrowNarrowRight />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
