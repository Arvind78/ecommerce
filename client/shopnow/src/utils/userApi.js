import axios from 'axios';

// Function to handle user login
const baseUrl = `https://shopnow-073b.onrender.com`;
export const userLogin = (data) => {
  return axios.post(`${baseUrl}/api/user/login`, data);
};

// Function to handle user registration
export const userRegistration = (data) => {
  return axios.post(`${baseUrl}/api/user/ragister`, data);
};

// Function to send password reset email
export const userForgetSendMail = (email) => {
  return axios.post(`${baseUrl}/api/user/reset`, { email });
};

// Function to handle password reset
export const userForgetPassword = (data, token) => {
  return axios.post(`${baseUrl}/api/user/reset/${token}`, {
    ...data,
  });
};

// Function to update user details
export const updateUserDetails = (data, id) => {
  return axios.put(`${baseUrl}/api/user/${id}`, data);
};

// Function to update user profile image
export const userUpdateProfileImage = (data, id) => {
  return axios.put(`${baseUrl}/api/user/profile/${id}`, data);
};

// Function to handle contact form submission
export const contactUsHandler = (data) => {
  return axios.post(`${baseUrl}/api/enquiry`, data);
};

// Function to handle email subscription
export const subscribeEmailHandler = (data) => {
  return axios.post(
    `${baseUrl}/api/subscribe`,
    { email: data },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    }
  );
};

export const logoutHandler = () => {
  return axios.post(`${baseUrl}/api/user/logout`);
};

export const createRevieHandler = (data) => {
  return axios.post(`${baseUrl}/api/review`, data);
};

export const getRevieHandler = () => {
  return axios.get(`${baseUrl}/api/review`);
};
