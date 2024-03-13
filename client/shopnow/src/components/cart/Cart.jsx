import React from 'react';
import styles from './Style.module.css';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import productData from '../../product.json';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { IoMdReturnLeft } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import emptyCart from '../../assets/image/empty-items.svg';
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
} from '../../store/cartSlice';
const Cart = () => {
  const { carts } = useSelector((state) => state.cart);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const { subTotal, tax, shipping, total } = carts.reduce(
    (acc, item) => {
      const priceWithoutCommas = parseInt(item.price.replace(/,/g, ''));

      const updatedSubTotal = acc.subTotal + priceWithoutCommas * item.quantity;
      const updatedTax = updatedSubTotal * 0.1;
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

  console.log(subTotal, tax, shipping, total);

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.cartHeading}>
        <h2>Cart</h2>
        <div onClick={() => Navigate('/')}>
          <FaHome size={24} />
          Home
        </div>
      </div>
      {carts.length === 0 ? (
        <div className={styles.emptyCartContainer}>
          <img src={emptyCart} alt="empty-card-img" />
          <h1>Your cart is empty</h1>
          <button onClick={() => Navigate('/')}>Go to Home</button>
        </div>
      ) : (
        <div className={styles.cartContainer}>
          <div className={styles.cart}>
            {carts.map((item) => (
              <>
                <div className={styles.item}>
                  <img src={item?.image} alt="product image error" />
                  <div className={styles.title}>
                    <h2>{item?.name}</h2>
                    <span>{`Unit: ${1}`}</span>
                  </div>
                  <div className={styles.price}>
                    <h2>Price</h2>
                    <span>{`$ ${item?.price}.00`}</span>
                  </div>
                  <div className={styles.quantity}>
                    <h2>Quantity</h2>
                    <div className={styles.qtyBtn}>
                      <button
                        onClick={() => dispatch(decreaseItemQuantity(item))}
                      >
                        &#8722;
                      </button>
                      <span>{item?.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseItemQuantity(item))}
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                  <div className={styles.del}>
                    <h2>Remove</h2>
                    <IconButton
                      aria-label="delete"
                      rounded={80}
                      size={'sm'}
                      className={styles.delete}
                      onClick={() => dispatch(removeItemFromCart(item._id))}
                    >
                      <MdDelete size={18} className={styles.delIcon} />
                    </IconButton>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className={styles.summary}>
            <h2>Order Summary</h2>
            <hr />
            <div>
              <h4>Subtotal</h4>
              <span>$ {subTotal}</span>
            </div>
            <div>
              <h4>Shipping</h4>
              <span>$ {shipping}</span>
            </div>
            <div>
              <h4>Tax</h4>
              <span>$ {tax}</span>
            </div>
            <hr />
            <div className={styles.total}>
              <h3>Total</h3>
              <span>$ {total}</span>
            </div>
            <div>
              <button
                className={styles.Checkout}
                onClick={() => Navigate('/checkout')}
              >
                Process To Checkout
              </button>
            </div>
            <div>
              <button
                className={styles.returnToShop}
                onClick={() => Navigate('/')}
              >
                <IoMdReturnLeft />
                Return To Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;
