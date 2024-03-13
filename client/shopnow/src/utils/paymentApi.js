import axios from 'axios';

export const createPayment = (
  userId,
  orderItem,
  subTotal,
  tax,
  shipping,
  total,
  deliveryAddress
) => {
  return axios.post(`http://localhost:5173/api/pay`, {
    userId,
    orderItem,
    subTotal,
    tax,
    shipping,
    total,
    deliveryAddress,
  });
};

export const getCountOrder = (userId) => {
  return axios.get(`http://localhost:5173/api/order/user/${userId}`);
};

export const trackOrder = (trackingId) => {
  return axios.get(`http://localhost:5173/api/order/track/${trackingId}`);
};

export const getAllUserOrder = (userId) => {
  return axios.get(`http://localhost:5173/api/order/users/${userId}`);
};
