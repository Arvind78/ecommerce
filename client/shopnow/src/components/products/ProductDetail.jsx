import React, { useEffect, useState } from 'react';
import styles from './ProductDetail.module.css';
import Header from './../common/header/Header';
import Footer from './../common/footer/Footer';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
} from '@chakra-ui/react';
import { Rate,Progress} from 'antd';
import { Link, useParams } from 'react-router-dom';
import { GoHeart } from 'react-icons/go';
import { IoHeart } from 'react-icons/io5';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { HiOutlineMail } from 'react-icons/hi';
import { addProduct, removeProduct } from '../../store/wishlistSlice';
import ReviewModel from '../popupModels/ReviewModel';
import moment from 'moment';
import {
  getProductById,
  getProductBySubCategory,
  getProductReview,
} from '../../utils/productApi';
import {
  addItemToCart,
  decreaseItemQuantity,
  increaseItemQuantity,
} from '../../store/cartSlice';
import Loader from './../loading/Loader';
import ResponsivePagination from 'react-responsive-pagination';

const ProductDetail = () => {
  const [totalPages, setTotalPages] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const wishlist = useSelector((state) => state.wishlistProduct.products);
  const [product, setProduct] = useState({});
  const [review, setReview] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const limit = 1;

  const getReview = async () => {
    try {
      const res = await getProductReview(id);
      setReview(res.data.reviews);
    } catch (err) {
      console.error(err);
    }
  };

  const getSubCategoryWiseProduct = async () => {
    try {
      const res = await getProductBySubCategory(
        product.subCategory,
        currentPage,
        limit
      );
      setSubCategoryData(res.data.products);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productRes = await getProductById(id);
        setProduct(productRes.data.product);
        await getReview();
        await getSubCategoryWiseProduct();
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, product.subCategory, currentPage]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.product}>
        <div className={styles.productDatail}>
          <h1>{product?.name}</h1>
          <div>
            <h2>DESCRIPTION</h2>
            <p>{product?.Description ? product?.Description : 'N/A'}</p>
          </div>

          <div>
            <h2>DETAILS</h2>
            <p>
              Brand: {product?.brand} <br />
              Color: {product?.color?.toString()} <br />
              Stock :{product?.isAvailable ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        </div>
        <div className={styles.productImg}>
          <img src={product?.image} alt="" />
        </div>
        <div className={styles.productAdd}>
          <div>
            <h1>Price :</h1>
            <span>
              {' '}
              $ {product?.price}
              <p> 10% Descount</p>{' '}
            </span>
          </div>
          <div className={styles.productAddBtn}>
            <button onClick={() => dispatch(addItemToCart(product))}>
              Add To Cart
            </button>
          </div>

          <section className={styles.productAddDelevary}>
            <h2>DELEVARY</h2>
            <div>
              <IoMdCheckmarkCircle color="green" />
              <span>
                <b>free delivary </b> arrives 3-5 days
              </span>
            </div>

            <div>
              <IoMdCheckmarkCircle color="green" />
              <span>
                <b>payment </b> on paypal
              </span>
            </div>

            <div>
              <IoMdCheckmarkCircle color="green" />
              <span>
                <b>express</b> order by 11pm
              </span>
            </div>
          </section>
        </div>
      </div>
      <div className={styles.reviewContainer}>
        <div className={styles.review}>
          <Tabs>
            <TabList>
              <Tab>Review</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <div className={styles.reviewInfo}>
                  <div className={styles.addReview}>
                    <div className={styles.AvarageReview}>
                      <h1>3.45</h1>
                      <Rate value={1} count={1}></Rate>
                      <span>5 Rating</span>
                    </div>

                    <div>
                      <div className={styles.rateContainer}>
                        <span>5</span>
                        <Rate value={1} count={1} color="#000"></Rate>
                        <Progress percent={100} showInfo={false} />

                        <span>2</span>
                      </div>

                      <div className={styles.rateContainer}>
                        <span>4</span>
                        <Rate value={1} count={1} color="#000"></Rate>
                        <Progress percent={100} showInfo={false} />
                        <span>2</span>
                      </div>

                      <div className={styles.rateContainer}>
                        <span>3</span>
                        <Rate value={1} count={1} color="#000"></Rate>  <Progress percent={100} showInfo={false} />

                        <span>2</span>
                      </div>

                      <div className={styles.rateContainer}>
                        <span>2</span>
                        <Rate value={1} count={1} color="#000"></Rate> <Progress percent={100} showInfo={false} />

                        <span>2</span>
                      </div>

                      <div className={styles.rateContainer}>
                        <span>1</span>
                        <Rate value={1} count={1} color="#000"></Rate><Progress percent={100} showInfo={false} />
                        <span>2</span>
                      </div>

                      <div className={styles.newAddReview}>
                        <h1>Review this product</h1>
                        <p>Let other customers know what you think</p>
                        <ReviewModel product={product} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.userListReview}>
                    {review?.map((review) => (
                      <div className={styles.userReview} key={review?._id}>
                        <div className={styles.userInfo}>
                          <img
                            src={review?.userId?.profileImg}
                            alt="profileImg"
                          />
                          <div className={styles.reviewDeteils}>
                            <p>
                              <b>{review?.userId?.name}</b> &nbsp; &nbsp;
                              <span>
                                {moment(review?.createdAt).format(
                                  'DD-MMM-YYYY'
                                )}
                              </span>
                            </p>
                            <Rate value={review?.rating} color="#000"></Rate>
                            <p>{review?.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.otherInfo}>
                    <section className={styles.sectionOne}>
                      <div>
                        <img
                          src="https://laravel.pixelstrap.net/fastkart/storage/1452/04.png"
                          alt=""
                          width={'60px'}
                          height={'60px'}
                        />
                      </div>
                      <div>
                        <b>Trendy Fashions</b>
                        <p>
                          {' '}
                          <Rate value={4.5} color="#000"></Rate>
                          <span> &nbsp;(5 Review)</span>
                        </p>
                      </div>
                    </section>
                    <section className={styles.sectionTwo}>
                      <p>
                        Our products can be easily paired with different
                        outfits, making them versatile accessories that can be
                        worn for various occasions, from casual to formal
                        events. Despite the high quality and trendy designs, our
                        Fashion & Accessories are priced competitively,
                        providing customers with great value for their money.
                      </p>
                    </section>
                    <section className={styles.contactInfo}>
                      <div>
                        <HiOutlineMail color="#0DA487" size={20} />
                        <span>Shopnow@gmail.com</span>
                      </div>
                      <div>
                        <IoPhonePortraitOutline color="#0DA487" size={20} />
                        <span>+91 898837171</span>
                      </div>
                    </section>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>

      <div className={styles.categoryReletedProduct}>
        <div className={styles.productList}>
          <h1>Releted Products</h1>
          <div className={styles.productList}>
            {/* ======== */}

            {loading ? (
              <div className={styles.loading}>
                <Spinner />
              </div>
            ) : (
              subCategoryData?.map((product) => (
                <div className={styles.productCart} key={product?._id}>
                  <Link>
                    <img src={product?.image} alt="image" />
                  </Link>
                  <h2>{product?.name}</h2>
                  <h6>1 Item</h6>
                  <div className={styles.priceSection}>
                    <div>
                      <span>$ {product?.price}</span>
                    </div>
                    <div>
                      {wishlist.includes(product) ? (
                        <IoHeart
                          size={20}
                          color="#E76D6D"
                          onClick={() => dispatch(removeProduct(product?._id))}
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
                        <span onClick={() => dispatch(addItemToCart(product))}>
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
              ))
            )}
          </div>
          <div className={styles.pagination}>
            {!loading && (
              <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
