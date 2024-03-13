import React, { useState } from 'react';
import styles from './ReviewSlider.module.css'; // Import module CSS

const ReviewSlider = () => {
  const reviews = [
    {
      id: 1,
      author: 'John Doe',
      rating: 5,
      content: 'Excellent product! It exceeded my expectations.',
    },
    {
      id: 2,
      author: 'Jane Smith',
      rating: 4,
      content: 'Very happy with the purchase. Would recommend!',
    },
    {
      id: 3,
      author: 'Mike Jones',
      rating: 3,
      content:
        'Good product, but could be improved with some additional features.',
    },
  ];

  const [currentReview, setCurrentReview] = useState(0);

  const handleNextReview = () => {
    setCurrentReview((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setCurrentReview(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  return (
    <div className={styles.reviewSlider}>
      <div className={styles.reviewContainer}>
        <div className={styles.reviewContent}>
          <span className={styles.author}>{reviews[currentReview].author}</span>
          <span className={styles.rating}>
            {[...Array(reviews[currentReview].rating)].map((_, index) => (
              <span key={index} className={styles.star}>
                ★
              </span>
            ))}
          </span>
          <p className={styles.content}>{reviews[currentReview].content}</p>
        </div>
        <div className={styles.navigation}>
          <button className={styles.prevButton} onClick={handlePrevReview}>
            Prev
          </button>
          <button className={styles.nextButton} onClick={handleNextReview}>
            Next
          </button>
        </div>
      </div>
      <div className={styles.dotsContainer}>
        {reviews.map((review, index) => (
          <button
            key={review.id}
            className={`${styles.dot} ${
              currentReview === index ? styles.activeDot : ''
            }`}
            onClick={() => setCurrentReview(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ReviewSlider;
