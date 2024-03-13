import axios from 'axios';

export const searchProductByInput = (input, page, limit) => {
  return axios.get(
    `http://localhost:5173/api/products/search?search=${input}&page=${page}&limit=${limit}`
  );
};

export const getProductById = (id) => {
  return axios.get(`http://localhost:8080/api/product/${id}`);
};

export const getProducts = (page, limit, sort) => {
  return axios.get(
    `http://localhost:8080/api/product?page=${page}&limit=${limit}&sort=${sort}`
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
  return axios.get(`http://localhost:8080/api/products/filters/?category=${
    category || ''
  }&price=${price || ''}&rating=${rating || ''}&size=${size || ''}&sort=${
    sort || ''
  }&page=${page || ''}&limit=${limit || ''}
  `);
};

export const getNewProducts = () => {
  return axios.get(`http://localhost:5173/api/products/new`);
};

export const addProductReview = (reviewData) => {
  return axios.post(`http://localhost:5173/api//product/review`, reviewData);
};

export const getProductReview = (id) => {
  return axios.get(`http://localhost:5173/api/product/review/${id}`);
};

export const getProductBySubCategory = (subCategory, page, limit) => {
  return axios.get(
    `http://localhost:5173/api/products/subcategory?subCategory=${subCategory}&page=${page}&limit=${limit}`
  );
};
