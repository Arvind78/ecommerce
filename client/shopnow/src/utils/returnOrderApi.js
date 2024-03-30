import axios from 'axios';

const baseUrl = `https://shopnow-073b.onrender.com`;

export const getReturnOrderRequest = (userId) => {
  return axios.get(`${baseUrl}/api/return/order/${userId}`);
};

export const createReturnOrderRequest = (returnOrder) => {
  return axios.post(`${baseUrl}/api/return/order`, {
    ...returnOrder,
  });
};
