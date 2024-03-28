import axios from 'axios';

// Function to handle user login
export const userLogin = (data) => {
  return axios.post('https://far-store.surge.sh/api/user/login', data);
};

// Function to handle user registration
export const userRegistration = (data) => {
  return axios.post('api/user/ragister', data);
};

// Function to send password reset email
export const userForgetSendMail = (email) => {
  return axios.post(`api/user/reset`, { email });
};

// Function to handle password reset
export const userForgetPassword = (data, token) => {
  return axios.post(`api/user/reset/${token}`, {
    ...data,
  });
};

// Function to update user details
export const updateUserDetails = (data, id) => {
  return axios.put(`api/user/${id}`, data);
};

// Function to handle user logout
export const userLogout = (data) => {
  return axios.post('api/user/logout', data);
};

// Function to update user profile image
export const userUpdateProfileImage = (data, id) => {
  return axios.put(`api/user/profile/${id}`, data);
};

// Function to handle contact form submission
export const contactUsHandler = (data) => {
  return axios.post('api/enquiry', data);
};

// Function to handle email subscription
export const subscribeEmailHandler = (data) => {
  return axios.post('api/subscribe', { email: data });
};

export const logoutHandler = () => {
  return axios.post('api/user/logout');
};

export const createRevieHandler = (data) => {
  return axios.post('api/review', data);
};

export const getRevieHandler = () => {
  return axios.get('api/review');
};
