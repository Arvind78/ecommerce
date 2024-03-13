import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
const Admin = lazy(() => import('./components/adminPanel/dashboard/Dashboard'));
const Card = lazy(() => import('./components/cart/Cart'));
const Ragister = lazy(() => import('./components/Ragister/Ragister'));
const Login = lazy(() => import('./components/login/Login'));
const About = lazy(() => import('./components/about/AboutUs'));
const Wishlist = lazy(() => import('./components/wishlist/Wishlist'));
const Forget = lazy(() => import('./components/forgot/Forget'));
const Home = lazy(() => import('./components/home/Home'));
// const Profile import './components/profile/Profile';
// // const Forget import './components/forgot/Forget';
const Checkout = lazy(() => import('./components/checkout/Checkout'));
const Contact = lazy(() => import('./components/contectUs/Contect'));
const Search = lazy(() => import('./components/search/Search'));
const Product = lazy(() => import('./components/products/Products'));
const ProductDetail = lazy(() => import('./components/products/ProductDetail'));
const NotFound = lazy(() => import('./components/404/NotFound'));
const MyAccount = lazy(
  () => import('./components/profile/myAccount/MyAccount')
);
const PasswordReset = lazy(() => import('./components/forgot/PasswordReset'));
// import
import Aos from 'aos';
import Loader from './components/loading/Loader';
import OrderSuccess from './components/orderStatus/orderSucess/OrderSuccess';
import OrderCancel from './components/orderStatus/orderCancel/OrderCancel';
import AdminLogin from './components/adminPanel/adminLogin/AdminLogin';
import AdminSignup from './components/adminPanel/adminSignup/AdminSignup';
import AdminForget from './components/adminPanel/adminForgot/AdminForget';
import AdminPasswordReset from './components/adminPanel/adminForgot/AdminPasswordReset';
import { FaLongArrowAltUp } from 'react-icons/fa';
import style from './App.module.css';
import { MdRateReview } from 'react-icons/md';
import UserReview from './components/popupModels/UserReviewModel';
import UserReviewModel from './components/popupModels/UserReviewModel';
const App = () => {
  const [userReviewModel, setUserReviewModel] = useState(false);
  const role = localStorage.getItem('role');
  const isAdminLogin = JSON.parse(sessionStorage.getItem('isAdminLogin'));
  const [scrollHeight, setScrollHeight] = useState(0);
  useEffect(() => {
    const Interval = setInterval(() => setScrollHeight(window.scrollY), 0);
    Aos.init({
      duration: 300,
    });
    return () => clearInterval(Interval);
  }, [role, scrollHeight]);

  const modelToggle = () => {
    setUserReviewModel(!userReviewModel);
  };

  return (
    <Suspense fallback={<Loader />}>
      {scrollHeight >= 800 && (
        <div className={style.reviewModel} data-aos="zoom-in">
          <UserReviewModel model={userReviewModel} toggle={modelToggle} />
        </div>
      )}

      {scrollHeight >= 800 && (
        <div
          className={style.scrollTop}
          data-aos="zoom-in"
          onClick={() => window.scrollTo(0, 0)}
        >
          <FaLongArrowAltUp />
        </div>
      )}

      <Routes>
        {role === 'admin' ? (
          <>
            {isAdminLogin?.isVerified ? (
              <Route path="/" element={<Admin />} />
            ) : (
              <>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/reset/:token" element={<AdminPasswordReset />} />
                <Route path="/forgot" element={<AdminForget />} />
              </>
            )}
            <Route path="/admin/signup" element={<AdminSignup />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/ragister" element={<Ragister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forget />} />
            <Route path="/reset/:id" element={<PasswordReset />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Card />} />
            <Route path="/search" element={<Search />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/api/success" element={<OrderSuccess />} />
            <Route path="/api/cancel" element={<OrderCancel />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
