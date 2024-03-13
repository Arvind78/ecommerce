import axios from 'axios';

export const getReturnOrderRequest = (userId) => {
  return axios.get(`http://localhost:5173/api/return/order/${userId}`);
};

export const createReturnOrderRequest = (returnOrder) => {
  return axios.post('http://localhost:5173/api/return/order', {
    ...returnOrder,
  });
};
