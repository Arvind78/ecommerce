import axios from 'axios';

const baseUrl = `https://shopnow-073b.onrender.com`;

export const dashboardData = () => {
  return axios.get(`${baseUrl}/api/admin/dashboad`);
};

export const adminSignup = (data) => {
  return axios.post(`${baseUrl}/api/admin/ragister`, data);
};

export const adminLogin = (data) => {
  return axios.post(`${baseUrl}/api/admin/login`, data);
};

export const adminUpdateImage = (id, image) => {
  return axios.put(`${baseUrl}/api/admin/${id}`, image);
};

export const adminForgetSendMail = (email) => {
  return axios.post(`${baseUrl}/api/admin/reset-password`, {
    email,
  });
};

export const adminForgetPassword = (data, token) => {
  return axios.put(`${baseUrl}/api/admin/reset-password/${token}`, data);
};

export const fetchUserOrder = (id) => {
  return axios.get(`${baseUrl}/api/order/${id}`);
};

export const fetchUpdateOrderStatus = (id, status) => {
  return axios.put(`${baseUrl}/api/order/${id}`, { status });
};

export const getUsers = () => {
  return axios.get(`${baseUrl}/api/user`);
};

export const fetchAdminOrders = () => {
  return axios.get(`${baseUrl}/api/order`);
};

export const fetchUserEnquiries = () => {
  return axios.get(`${baseUrl}/api/enquiry`);
};

export const updateEnquiries = (id, status) => {
  return axios.put(`${baseUrl}/api/enquiry/${id}`, { status });
};

export const deleteEnquiries = (id) => {
  return axios.delete(`${baseUrl}/api/enquiry/${id}`);
};

export const fetchAllProducts = () => {
  return axios.get(`${baseUrl}/api/product`);
};

export const addNewProduct = (data) => {
  return axios.post(`${baseUrl}/api/product`, data);
};

export const getProductById = (id) => {
  return axios.get(`${baseUrl}/api/product/${id}`);
};

export const updateProductById = (id, data) => {
  return axios.put(`${baseUrl}/api/product/${id}`, data);
};

export const deleteProductById = (id, data) => {
  return axios.delete(`${baseUrl}/api/product/${id}`, data);
};

export const deleteOrderId = (id) => {
  return axios.delete(`${baseUrl}/api/order/${id}`);
};
