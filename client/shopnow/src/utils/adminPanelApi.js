import axios from 'axios';

export const dashboardData = () => {
  return axios.get('api/admin/dashboad');
};

export const adminSignup = (data) => {
  return axios.post('api/admin/ragister', data);
};

export const adminLogin = (data) => {
  return axios.post('api/admin/login', data);
};

export const adminUpdateImage = (id, image) => {
  return axios.put(`api/admin/${id}`, image);
};

export const adminForgetSendMail = (email) => {
  return axios.post(`api/admin/reset-password`, {
    email,
  });
};

export const adminForgetPassword = (data, token) => {
  return axios.put(
    `api/admin/reset-password/${token}`,
    data
  );
};

export const fetchUserOrder = (id) => {
  return axios.get(`api/order/${id}`);
};

export const fetchUpdateOrderStatus = (id, status) => {
  return axios.put(`api/order/${id}`, { status });
};

export const getUsers = () => {
  return axios.get('api/user');
};

export const fetchAdminOrders = () => {
  return axios.get('api/order');
};

export const fetchUserEnquiries = () => {
  return axios.get('api/enquiry');
};

export const updateEnquiries = (id, status) => {
  return axios.put(`api/enquiry/${id}`, { status });
};

export const deleteEnquiries = (id) => {
  return axios.delete(`api/enquiry/${id}`);
};

export const fetchAllProducts = () => {
  return axios.get('api/product');
};

export const addNewProduct = (data) => {
  return axios.post('api/product', data);
};

export const getProductById = (id) => {
  return axios.get(`api/product/${id}`);
};

export const updateProductById = (id, data) => {
  return axios.put(`api/product/${id}`, data);
};

export const deleteProductById = (id, data) => {
  return axios.delete(`api/product/${id}`, data);
};

export const deleteOrderId = (id) => {
  return axios.delete(`api/order/${id}`);
};
