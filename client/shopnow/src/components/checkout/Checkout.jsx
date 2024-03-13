import React from 'react';
import styles from './Style.module.css';
import Header from '../../components/common/header/Header';
import Footer from '../../components/common/footer/Footer';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { VscLocation } from 'react-icons/vsc';
import productData from '../../product.json';
import ShippingAddressModal from '../popupModels/ShippingAddressModal';
import { createPayment } from '../../utils/paymentApi';
import { useDispatch, useSelector } from 'react-redux';
import { removeAddress } from '../../store/addressSlice';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Loading } from 'react-loading';

const Checkout = () => {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.shippingAddress);
  const { currentUser } = useSelector((state) => state.user);
  const { carts } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    title: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    phone: '',
  });

  const Navigate = useNavigate();

  const removeAddressHandler = (id) => {
    dispatch(removeAddress(id));
  };

  const selectAddressHandler = (address) => {
    setDeliveryAddress({
      title: address.title,
      address: address.address,
      city: address.city,
      state: address.state,
      country: address.country,
      pincode: address.pincode,
      phone: address.phone,
    });
  };

  const { subTotal, tax, shipping, total } = carts.reduce(
    (acc, item) => {
      const priceWithoutCommas = parseInt(item.price.replace(/,/g, ''));

      const updatedSubTotal = acc.subTotal + priceWithoutCommas * item.quantity;
      const updatedTax = updatedSubTotal * 0.01;
      const updatedShipping = updatedSubTotal * 0.02;
      const updatedTotal = updatedSubTotal + updatedTax + updatedShipping;

      return {
        subTotal: updatedSubTotal,
        tax: updatedTax.toFixed(2),
        shipping: updatedShipping.toFixed(2),
        total: updatedTotal.toFixed(2),
      };
    },
    { subTotal: 0, tax: 0, shipping: 0, total: 0 }
  );

  const validateAdress = () => {
    for (let key in deliveryAddress) {
      if (deliveryAddress[key] === '') {
        return false;
      }
    }
    return true;
  };

  const OrderHandler = () => {
    if (!validateAdress()) {
      return toast.error('Please select an address', { theme: 'colored' });
    } else {
      setIsLoading(true);
      createPayment(
        currentUser?._id,
        carts,
        subTotal,
        tax,
        shipping,
        total,
        deliveryAddress
      )
        .then((res) => {
          setIsLoading(false);

          window.open(res.data, '_blank');
        })
        .catch((err) => {
          return toast.error(err?.response?.data?.message, {
            theme: 'colored',
          });
        });
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.checkoutContainer}>
        <ToastContainer />
        <div className={styles.checkoutHeading}>
          <h2>Checkout</h2>
          <div onClick={() => Navigate('/')}>
            <FaHome size={24} />
            Home
          </div>
        </div>
        <div className={styles.checkoutBody}>
          <div className={styles.checkoutBodyDeteils}>
            <div className={styles.addressContainer}>
              <div className={styles.addressPopBtn}>
                <h3>Shipping Address</h3>
                <ShippingAddressModal />
              </div>
              <div className={styles.address}>
                {address.map((item, index) => {
                  return (
                    <div key={index} className={styles.addressItem}>
                      <div>
                        <input
                          type="radio"
                          name="address"
                          onChange={(e) => {
                            if (e.target.checked) {
                              selectAddressHandler(item);
                            }
                          }}
                        />
                        <span>{item.title}</span>

                        <span onClick={() => removeAddressHandler(index)}>
                          X
                        </span>
                      </div>

                      <section>
                        <span>Address :</span>
                        <span>{item.address}</span>
                      </section>

                      <section>
                        <span>City :</span>
                        <span>{item.city}</span>
                      </section>

                      <section>
                        <span>State :</span>
                        <span>{item.state}</span>
                      </section>

                      <section>
                        <span>Country :</span>
                        <span>{item.country}</span>
                      </section>

                      <section>
                        <span>Pincode :</span>
                        <span>{item.pincode}</span>
                      </section>

                      <section>
                        <span>Phone :</span>
                        <span>{item.phone}</span>
                      </section>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.deleveryOption}>
              <h2>Select Payment Mode</h2>
              <div className={styles.paymentMethod}>
                <div className={styles.cashOnDelevary}>
                  <input type="radio" disabled name="paymentMode" id="" />
                  <span>Cash on Delavary</span>
                </div>
                <div className={styles.paypal}>
                  <input
                    type="radio"
                    name="paymentMode"
                    defaultChecked={true}
                  />
                  <span>PayPal</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.checkoutSummary}>
            <h2>Checkout</h2>
            <div>
              {carts?.map((item) => (
                <>
                  <div className={styles.item}>
                    <img src={item?.image} alt="" />
                    <div>
                      <h4 className={styles.productName}>{item?.name}</h4>
                      <p>{`${item?.price} X ${item?.quantity}`}</p>
                    </div>
                    <div>
                      <h4>
                        {' '}
                        {`$${
                          parseInt(item.price.replace(/,/g, '')) *
                          Number(item?.quantity).toFixed(0)
                        }`}
                      </h4>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
              <div className={styles.CheckoutInfo}>
                <div>
                  <h4>Subtotal</h4>
                  <span>{`$ ${subTotal}`}</span>
                </div>
                <div>
                  <h4>Shipping</h4>
                  <span>{`$ ${shipping}`}</span>
                </div>
                <div>
                  <h4>Tax</h4>
                  <span>{`$ ${tax}`}</span>
                </div>
                <hr />
                <div>
                  <h4>Total</h4>
                  <span>{`$ ${total}`}</span>
                </div>
                <button onClick={OrderHandler}>
                  {isLoading ? (
                    <div>
                      <Loading
                        type="bubbles"
                        color="white"
                        width={30}
                        height={25}
                      />
                    </div>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
