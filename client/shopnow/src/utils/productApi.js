import axios from 'axios';

const baseUrl =`https://shopnow-073b.onrender.com`

export const searchProductByInput = (input, page, limit) => {
  return axios.get(
    `${baseUrl}/api/products/search?search=${input}&page=${page}&limit=${limit}`
  );
};

export const getProductById = (id) => {
  return axios.get(`${baseUrl}/api/product/${id}`);
};

export const getProducts = (page, limit, sort) => {
  return axios.get(
    `${baseUrl}/api/product?page=${page}&limit=${limit}&sort=${sort}`
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
  return axios.get(`${baseUrl}/api/products/filters/?category=${
    category || ''
  }&price=${price || ''}&rating=${rating || ''}&size=${size || ''}&sort=${
    sort || ''
  }&page=${page || ''}&limit=${limit || ''}
  `);
};

export const getNewProducts = () => {
  return axios.get(`${baseUrl}/api/products/new`);
};

export const addProductReview = (reviewData) => {
  return axios.post(`${baseUrl}/api/product/review`,reviewData,{
    headers:{
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    }
  });
};

export const getProductReview = (id) => {
  return axios.get(`${baseUrl}/api/product/review/${id}`);
};

export const getProductBySubCategory = (subCategory, page, limit) => {
  return axios.get(
    `${baseUrl}/api/products/subcategory?subCategory=${subCategory}&page=${page}&limit=${limit}`
  );
};
