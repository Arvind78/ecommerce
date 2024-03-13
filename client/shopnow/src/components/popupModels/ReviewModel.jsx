import React from 'react';
import styles from './ReviewModel.module.css';
import { useState } from 'react';
import { Rate } from 'antd';
import { addProductReview } from '../../utils/productApi';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ReviewModel = ({ product }) => {
  const Navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [showModel, setShowModel] = useState(false);
  const [reviewData, setReviewData] = useState({
    userId: currentUser?._id,
    productId: '',
    reviewContent: '',
    rating: 0,
  });

  const handelChange = (e) => {
    setReviewData({
      ...reviewData,
      productId: product._id,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!reviewData.userId) {
      toast.error('Please login your account', {
        theme: 'colored',
      });
      return setTimeout(() => Navigate('/login'), 6000);
    }
    addProductReview(reviewData)
      .then((res) => {
        toast.success(res.data.message, {
          theme: 'colored',
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          theme: 'colored',
        });
      });
  };

  const modelOpenHandler = () => {
    setShowModel(true);
  };

  const modelCloseHandler = () => {
    setShowModel(false);
  };

  console.log(product);
  return (
    <div>
      <ToastContainer />
      <button className={styles.popupBtn} onClick={modelOpenHandler}>
        Write a review
      </button>

      {showModel && (
        <div className={styles.model}>
          <div className={styles.modelContent}>
            <div className={styles.modelHeader}>
              <h2>Review</h2>
              <span onClick={modelCloseHandler}>X</span>
            </div>
            <div className={styles.modelBody}>
              <form>
                <div className={styles.product}>
                  <img src={product?.image} alt={product?.name} />
                  <div>
                    <h2 className={styles.productTitle}>{product?.name}</h2>
                    <Rate value={product?.rating}></Rate>
                    <span> &nbsp;({product?.rating} Ratings)</span>
                  </div>
                </div>

                <div className={styles.reatingContent}>
                  <span>
                    Reating :{' '}
                    <Rate
                      onChange={(value) => {
                        setReviewData({
                          ...reviewData,
                          rating: value,
                        });
                      }}
                    ></Rate>
                  </span>
                  <textarea
                    name="reviewContent"
                    cols="30"
                    value={reviewData.reviewContent}
                    rows="5"
                    placeholder="Write a review..."
                    onChange={handelChange}
                  ></textarea>
                </div>
              </form>
            </div>

            <div className={styles.modelFooter}>
              <button
                onClick={modelCloseHandler}
                className={styles.closeModelBtn}
              >
                Close
              </button>
              <button className={styles.saveBtn} onClick={handleSubmit}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewModel;
