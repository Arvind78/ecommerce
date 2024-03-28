import axios from 'axios';

export const getReturnOrderRequest = (userId) => {
  return axios.get(`api/return/order/${userId}`);
};

export const createReturnOrderRequest = (returnOrder) => {
  return axios.post('api/return/order', {
    ...returnOrder,
  });
};
