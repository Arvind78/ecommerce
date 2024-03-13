import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Style.module.css';
import Footer from '../common/footer/Footer';
import Header from '../common/header/Header';
import { Select } from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';
import { Button, Rate, Slider } from 'antd';
import { FaSort } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { GoHeart } from 'react-icons/go';
import { IoHeart } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../../store/wishlistSlice';
import ResponsivePagination from 'react-responsive-pagination';
import FilterDrawer from './FilterDrawer';
import { getProductsByCategory, getProducts } from '../../utils/productApi';
import {
  addItemToCart,
  decreaseItemQuantity,
  increaseItemQuantity,
} from '../../store/cartSlice';
import { Spinner } from '@chakra-ui/react';
import emptyProductImg from '../../assets/image/empty-items.svg';

const Products = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlistProduct.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const query = useLocation().search.split('=')[1];
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(query);
  const [sort, setSort] = useState('asce');
  const [rating, setRating] = useState('');
  const [size, setSize] = useState('');
  const [limit, setLimit] = useState(8);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const getProductData = () => {
    setLoading(true);
    getProducts(currentPage, limit, sort)
      .then((res) => {
        setProducts(res.data.products),
          setTotalPages(res.data.totalPages),
          setLoading(false);
      })
      .catch((err) => {
        console.log(err), setLoading(false);
      });
  };

  const filterData = () => {
    setLoading(true);

    getProductsByCategory(
      category,
      price,
      rating,
      size,
      sort,
      currentPage,
      limit
    )
      .then((res) => {
        setProducts(res.data.products),
          setTotalPages(res.data.totalPages),
          setLoading(false);
      })
      .catch((err) => {
        console.log(err), setLoading(false);
      });
  };

  useEffect(() => {
    if (category || rating || price || size || sort) {
      filterData();
    } else {
      getProductData();
    }
  }, [price, rating, size, limit, category, sort, currentPage]);

  const resetFilter = () => {
    setCategory('');
    setPrice('');
    setRating('');
    setSize('');
  };

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.productContainer}>
        <div className={styles.filter}>
          <FilterDrawer
            category={category}
            rating={rating}
            setRating={setRating}
            price={price}
            setPrice={setPrice}
            setSize={setSize}
            size={size}
            setCategory={setCategory}
            resetFilter={resetFilter}
          />
        </div>
        <div className={styles.filterContainer}>
          <div className={styles.category}>
            <h2>Category</h2>
            <Select
              icon={<MdArrowDropDown />}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="sports">Sports</option>
              <option value="accessories">Accessories</option>
              <option value="fashion">Fashion</option>
              <option value="beauty">Beauty</option>
              <option value="furniture">Furniture</option>
            </Select>
          </div>

          <div className={styles.reating}>
            <h2>Reating</h2>
            <Rate defaultValue={rating} onChange={setRating} />
          </div>

          <div className={styles.price}>
            <h2>Price</h2>
            <Slider
              range
              max={4999}
              min={99}
              defaultValue={price}
              onChange={setPrice}
            />
            <span>From 99 To 4999</span>
          </div>
          <div className={styles.size}>
            <h2>Size</h2>
            <div>
              <span onClick={() => setSize('xs')}>XS</span>
              <span onClick={() => setSize('s')}>S</span>
              <span onClick={() => setSize('m')}>M</span>
            </div>
            <div>
              <span onClick={() => setSize('l')}>L</span>
              <span onClick={() => setSize('xl')}>XL</span>
              <span onClick={() => setSize('2xl')}>2XL</span>
            </div>
            <div>
              <span onClick={() => setSize('28')}>28</span>
              <span onClick={() => setSize('30')}>30</span>
              <span onClick={() => setSize('32')}>32</span>
            </div>
            <div>
              <span onClick={() => setSize('34')}>34</span>
              <span onClick={() => setSize('36')}>36</span>
              <span onClick={() => setSize('48')}>40</span>
            </div>
          </div>
          <div>
            <Button onClick={resetFilter}>Reset</Button>
          </div>
        </div>
        <div className={styles.cartContainter}>
          <div className={styles.sortBtnContainer}>
            <Select
              icon={<FaSort />}
              width="110px"
              placeholder="Sorting"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="asce">ASC</option>
              <option value="desc">DES</option>
            </Select>
          </div>
          <div className={styles.productList}>
            {loading ? (
              <div className={styles.loading}>
                <Spinner />
              </div>
            ) : products.length === 0 ? (
              <div className={styles.noProductContainer}>
                <img
                  src={emptyProductImg}
                  alt="error"
                  width={'320px'}
                  height={'300px'}
                />
                <h2>No Product Found</h2>
                <Button style={{ backgroundColor: '#09735E', color: '#fff' }}>
                  <Link to={'/'}>Go to Home</Link>
                </Button>
              </div>
            ) : (
              products.map((product) => (
                <div className={styles.productCart} key={product?._id}>
                  <Link to={`/product/${product?._id}`}>
                    <img src={product?.image} alt={product?.name} />
                  </Link>
                  <h2>{product?.name}</h2>
                  <h6>1 Item</h6>
                  <div className={styles.priceSection}>
                    <div>
                      <span>{`$ ${product?.price}`}</span>
                      <span>{/* <del>$29.99</del> */}</span>
                    </div>
                    <div>
                      {!wishlist.includes(product) ? (
                        <GoHeart
                          size={20}
                          color="#E76D6D"
                          onClick={() => dispatch(addProduct(product))}
                        />
                      ) : (
                        <IoHeart
                          size={20}
                          color="#E76D6D"
                          onClick={() => dispatch(removeProduct(product?._id))}
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

export default Products;
