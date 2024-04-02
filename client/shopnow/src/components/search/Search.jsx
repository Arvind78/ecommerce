import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Style.module.css';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import { FaHome } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { Rate } from 'antd';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { searchProductByInput } from '../../utils/productApi';
import Loader from '../loading/Loader';
import { IoHeart } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../../store/wishlistSlice';
import { GoHeart } from 'react-icons/go';
import ResponsivePagination from 'react-responsive-pagination';
import {
  addItemToCart,
  decreaseItemQuantity,
  increaseItemQuantity,
} from '../../store/cartSlice';
const Search = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlistProduct.products);
  const searchQuery = new URLSearchParams(location.search);
  const [searchInput, setSearchInput] = useState(searchQuery.get('search'));
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isWishListItem, setIsWishListItem] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState('');
  const limit = 5;
  const searchProductHandler = useCallback(() => {
    if (!searchInput) {
      toast.error('Please enter a valid search');
      return false;
    } else {
      setIsLoading(false);
      searchProductByInput(searchInput, currentPage, limit)
        .then((res) => {
          setProductData(res.data.products);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(err.response.data.message);
          return false;
        });
    }
  }, [currentPage]);

  useEffect(() => {
    productData.find((item) => item._id === wishlist._id) &&
      setIsWishListItem(true);
  }, [isWishListItem, wishlist, limit]);

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.searchContainer}>
        <div className={styles.heading}>
          <h2>Search</h2>
          <div onClick={() => Navigate('/')}>
            <FaHome size={24} />
            Home
          </div>
        </div>
        <div className={styles.searchbarContainer}>
          <h1>Search For Products</h1>
          <div>
            <input
              type="text"
              placeholder="Search here..."
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button onClick={searchProductHandler}>Search</button>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.productContainer}>
            {productData?.map((product) => (
              <div className={styles.productCart} key={product?._id}>
                <Link to={`/product/${product?._id}`}>
                  <img src={product?.image} alt={product?.name} />
                </Link>
                <h2>{product?.name}</h2>
                <h6>1 Item</h6>
                <div className={styles.priceSection}>
                  <div>
                    <span>$ {product?.price}</span>
                  </div>
                  <div>
                    {isWishListItem ? (
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
        )}

        <div>
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;
