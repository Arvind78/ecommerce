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
  return axios.post(`api/pay`, {
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
  return axios.get(`api/order/user/${userId}`);
};

export const trackOrder = (trackingId) => {
  return axios.get(`api/order/track/${trackingId}`);
};

export const getAllUserOrder = (userId) => {
  return axios.get(`api/order/users/${userId}`);
};
