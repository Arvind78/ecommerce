import axios from 'axios';

export const dashboardData = () => {
  return axios.get('http://localhost:8080/api/admin/dashboad');
};

export const adminSignup = (data) => {
  return axios.post('http://localhost:8080/api/admin/ragister', data);
};

export const adminLogin = (data) => {
  return axios.post('http://localhost:8080/api/admin/login', data);
};

export const adminUpdateImage = (id, image) => {
  return axios.put(`http://localhost:8080/api/admin/${id}`, image);
};

export const adminForgetSendMail = (email) => {
  return axios.post(`http://localhost:8080/api/admin/reset-password`, {
    email,
  });
};

export const adminForgetPassword = (data, token) => {
  return axios.put(
    `http://localhost:8080/api/admin/reset-password/${token}`,
    data
  );
};

export const fetchUserOrder = (id) => {
  return axios.get(`http://localhost:5173/api/order/${id}`);
};

export const fetchUpdateOrderStatus = (id, status) => {
  return axios.put(`http://localhost:5173/api/order/${id}`, { status });
};

export const getUsers = () => {
  return axios.get('http://localhost:5173/api/user');
};

export const fetchAdminOrders = () => {
  return axios.get('http://localhost:8080/api/order');
};

export const fetchUserEnquiries = () => {
  return axios.get('http://localhost:8080/api/enquiry');
};

export const updateEnquiries = (id, status) => {
  return axios.put(`http://localhost:8080/api/enquiry/${id}`, { status });
};

export const deleteEnquiries = (id) => {
  return axios.delete(`http://localhost:8080/api/enquiry/${id}`);
};

export const fetchAllProducts = () => {
  return axios.get('http://localhost:8080/api/product');
};

export const addNewProduct = (data) => {
  return axios.post('http://localhost:8080/api/product', data);
};

export const getProductById = (id) => {
  return axios.get(`http://localhost:8080/api/product/${id}`);
};

export const updateProductById = (id, data) => {
  return axios.put(`http://localhost:8080/api/product/${id}`, data);
};

export const deleteProductById = (id, data) => {
  return axios.delete(`http://localhost:8080/api/product/${id}`, data);
};

export const deleteOrderId = (id) => {
  return axios.delete(`http://localhost:8080/api/order/${id}`);
};
