import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { GoHeart } from 'react-icons/go';
import {
  Avatar,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { BsLightningCharge } from 'react-icons/bs';
import styles from './Style.module.css';
import Sidebar from '../sidebar/Sidebar';
import { PiShoppingCart } from 'react-icons/pi';
import { BiCategoryAlt } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import aos from 'aos';
import { FaUser } from 'react-icons/fa';
import { RiLogoutCircleFill, RiLogoutCircleRFill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { logoutHandler } from '../../../utils/userApi';
import { logout } from '../../../store/userSlice';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { carts } = useSelector((state) => state.cart);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState(0);
  const productCategories = [
    'Electronics',
    'Sports',
    'Accessories',
    'Fashion',
    'Beauty',
    'Furniture',
  ];
  const [category, setCategory] = useState('');
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    aos.init();

    return () =>
      removeEventListener('scroll', () => {
        setScroll(0);
      });
  }, []);
  window.addEventListener('scroll', () => {
    setScroll(window.scrollY);
  });

  const inputValueHandler = (e) => {
    Navigate(`/product?category=${e.target.value}`);
  };

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    Navigate(`/search?search=${searchInput}`);
    setSearchInput('');
  };

  const handleLogout = () => {
    logoutHandler()
      .then((res) => {
        dispatch(logout());
        localStorage.removeItem('accessToken');
        toast.success(res.data.message, {
          theme: 'colored',
          autoClose: 3000,
          closeOnClick: true,
        });
        setTimeout(() => Navigate('/'), 4000);
      })
      .catch((err) => {
        return toast.error(err.response.data.message, {
          theme: 'colored',
          autoClose: 3000,
          closeOnClick: true,
        });
      });
  };

  return (
    <header className={scroll > 0 ? styles.headerScroll : styles.header}>
      <ToastContainer />
      <section className={styles.firstSection}>
        <div className={styles.menu}>
          <Sidebar />
        </div>
        <div className={styles.logo}>
          <h1 onClick={() => Navigate('/')}>
            SHOP<span>NOW</span>
          </h1>
        </div>
        <div className={styles.option}>
          <div className={styles.CategoryOption}>
            <select onChange={inputValueHandler} value={category}>
              <option value="">All Category</option>
              <option value="electronics">Electronics</option>
              <option value="sports">Sports</option>
              <option value="accessories">Accessories</option>
              <option value="fashion">Fashion</option>
              <option value="beauty">Beauty</option>
              <option value="furniture">Furniture</option>
            </select>
          </div>
          <div className={styles.searchbar}>
            <input
              type="text"
              placeholder="Search Here..."
              onChange={searchInputHandler}
              value={searchInput}
            />
            <button onClick={handleSearch}>
              <IoIosSearch size={18} />
            </button>
          </div>
        </div>
        <div className={styles.other}>
          <div className={styles.support}>
            <TfiHeadphoneAlt size={22} />
            <div className={styles.supportInfo}>
              <h2>24/7 Support Center</h2>
              <span>+91 8948837171</span>
            </div>
          </div>
          <div className={styles.whitelistedIcon}>
            <Link to={'/wishlist'}>
              <GoHeart size={22} />
            </Link>
          </div>

          <div className={styles.cartIcon}>
            <Link to="/cart">
              <PiShoppingCart size={22} />
            </Link>
            <span>{carts?.length || 0}</span>
          </div>
          <div className={styles.Acount}>
            <Popover>
              <PopoverTrigger>
                <IconButton size="sm" rounded={80}>
                  <Avatar
                    size="sm"
                    src={currentUser?.profileImg}
                    alt="avatar missing"
                  />
                </IconButton>
              </PopoverTrigger>
              <PopoverContent
                w="150px"
                marginLeft={'60px'}
                textAlign="center"
                padding={'6px 10px'}
                fontSize={'16px'}
              >
                {!currentUser ? (
                  <>
                    <span
                      className={styles.accountLink}
                      onClick={() => Navigate('/ragister')}
                    >
                      <FaUser /> Ragister
                    </span>
                    <hr />
                    <span
                      className={styles.accountLink}
                      onClick={() => Navigate('/login')}
                    >
                      <RiLogoutCircleRFill />
                      Login
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className={styles.accountLink}
                      onClick={() => Navigate('/myaccount')}
                    >
                      <FaUser />
                      My account
                    </span>
                    <hr />
                    <span className={styles.accountLink} onClick={handleLogout}>
                      <RiLogoutCircleFill />
                      Logout
                    </span>
                  </>
                )}
              </PopoverContent>
            </Popover>
            <div className={styles.accountInfo}>
              <h3>Hi , {currentUser?.name || 'User'}</h3>
              <span>My Account</span>
            </div>
          </div>
        </div>
      </section>
      <section
        className={styles.secondSection}
        style={{ display: scroll > 0 ? 'none' : '' }}
      >
        <div>
          <Popover>
            <PopoverTrigger>
              <div className={styles.categoryBtn}>
                <BiCategoryAlt size={20} />
                <span>All Categories</span>
              </div>
            </PopoverTrigger>
            <PopoverContent
              w="200px"
              outline={'none'}
              textAlign="left"
              padding={'10px 20px'}
              fontSize={'14px'}
            >
              {productCategories.map((collection, index) => (
                <span
                  key={index}
                  style={{ margin: '5px 0px', cursor: 'pointer' }}
                  onClick={() =>
                    Navigate(`/product?category=${collection.toLowerCase()}`)
                  }
                >
                  {collection}
                </span>
              ))}
            </PopoverContent>
          </Popover>
        </div>
        <nav className={styles.menuContainer}>
          <Link to="/">Home</Link>
          <Link>
            <Popover>
              <PopoverTrigger>
                <span>Collections</span>
              </PopoverTrigger>
              <PopoverContent
                width={'120px'}
                padding={'0px'}
                className={styles.Collections}
              >
                <PopoverBody className={styles.collectionsItem}>
                  <div>
                    <li>
                      <Link to={`/product?subCotegory=men`}>Phone</Link>
                    </li>
                    <li>
                      <Link to={`/product?subCotegory=wowen`}>Wowen</Link>
                    </li>
                    <li>
                      <Link to={`/product?subCotegory=kids`}>Kids</Link>
                    </li>
                  </div>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Link>
          <Link to="/product">Product</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contect us</Link>
        </nav>
        <div className={styles.dealBtn}>
          <BsLightningCharge size={16} />
          <span>Today Deal</span>
        </div>
      </section>
    </header>
  );
};

export default Header;
