import axios from 'axios';

export const searchProductByInput = (input, page, limit) => {
  return axios.get(
    `api/products/search?search=${input}&page=${page}&limit=${limit}`
  );
};

export const getProductById = (id) => {
  return axios.get(`api/product/${id}`);
};

export const getProducts = (page, limit, sort) => {
  return axios.get(
    `api/product?page=${page}&limit=${limit}&sort=${sort}`
  );
};

export const getProductsByCategory = (
  category,
  price,
  rating,
  size,
  sort,
  page,
  limit
) => {
  return axios.get(`api/products/filters/?category=${
    category || ''
  }&price=${price || ''}&rating=${rating || ''}&size=${size || ''}&sort=${
    sort || ''
  }&page=${page || ''}&limit=${limit || ''}
  `);
};

export const getNewProducts = () => {
  return axios.get(`https://main--monumental-sunburst-da27eb.netlify.app/api/products/new`);
};

export const addProductReview = (reviewData) => {
  return axios.post(`api//product/review`, reviewData);
};

export const getProductReview = (id) => {
  return axios.get(`api/product/review/${id}`);
};

export const getProductBySubCategory = (subCategory, page, limit) => {
  return axios.get(
    `api/products/subcategory?subCategory=${subCategory}&page=${page}&limit=${limit}`
  );
};
