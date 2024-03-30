import axios from 'axios';

const baseUrl = `https://shopnow-073b.onrender.com`;

export const createPayment = (
  userId,
  orderItem,
  subTotal,
  tax,
  shipping,
  total,
  deliveryAddress
) => {
  return axios.post(
    `${baseUrl}/api/pay`,
    {
      userId,
      orderItem,
      subTotal,
      tax,
      shipping,
      total,
      deliveryAddress,
    },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    }
  );
};

export const getCountOrder = (userId) => {
  return axios.get(`${baseUrl}/api/order/user/${userId}`);
};

export const trackOrder = (trackingId) => {
  return axios.get(`${baseUrl}/api/order/track/${trackingId}`);
};

export const getAllUserOrder = (userId) => {
  return axios.get(`${baseUrl}/api/order/users/${userId}`);
};
