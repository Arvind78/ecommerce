import { toast } from 'react-toastify';

export const isValid = (ragisterData) => {
  // Regular expressions for validation
  const nameRegex = /\d/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  // Validate name
  if (!ragisterData.name.trim()) {
    toast.error('Name is required', { theme: 'colored' });
    return false;
  } else if (ragisterData.name.trim().length < 3) {
    toast.error('Name should be at least 3 characters long', {
      theme: 'colored',
    });
    return false;
  } else if (nameRegex.test(ragisterData.name)) {
    toast.error('Name should not contain digits', { theme: 'colored' });
    return false;
  }

  // Validate email
  if (!ragisterData.email.trim()) {
    toast.error('Email is required', { theme: 'colored' });
    return false;
  } else if (!emailRegex.test(ragisterData.email.trim())) {
    toast.error('Invalid email format', { theme: 'colored' });
    return false;
  }

  // Validate phone
  if (!ragisterData.phone.trim()) {
    toast.error('Phone number is required', { theme: 'colored' });
    return false;
  } else if (!phoneRegex.test(ragisterData.phone.trim())) {
    toast.error('Invalid phone number format', { theme: 'colored' });
    return false;
  }

  // Validate password
  if (!ragisterData.password.trim()) {
    toast.error('Password is required', { theme: 'colored' });
    return false;
  } else if (ragisterData.password.trim().length < 8) {
    toast.error('Password should be at least 8 characters.', {
      theme: 'colored',
    });
    return false;
  }

  // Validate confirmPassword
  if (ragisterData.confirmPassword.trim() !== ragisterData.password.trim()) {
    toast.error('Passwords do not match', { theme: 'colored' });
    return false;
  }

  // Validate checkbox
  if (!ragisterData.checkbox) {
    toast.error('Please check the checkbox to proceed.', { theme: 'colored' });
    return false;
  }

  return true;
};

export const isValidateLogin = (loginData) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!loginData.email.trim()) {
    toast.error('Email is required', { theme: 'colored' });
    return false;
  } else if (!emailRegex.test(loginData.email.trim())) {
    toast.error('Invalid email format', { theme: 'colored' });
    return false;
  } else {
    if (!loginData.password.trim()) {
      toast.error('Password is required', { theme: 'colored' });
      return false;
    }

    return true;
  }
};

export const isValidateForgetMail = (forgetPasswordData) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!forgetPasswordData.trim()) {
    toast.error('Email is required', { theme: 'colored' });
    return false;
  } else if (!emailRegex.test(forgetPasswordData.trim())) {
    toast.error('Invalid email format', { theme: 'colored' });
    return false;
  } else {
    return true;
  }
};

export const isValidateForgetPassword = (forgetPasswordData) => {
  console.log(forgetPasswordData);
  if (!forgetPasswordData.password.trim()) {
    toast.error('Password is required', { theme: 'colored' });
    return false;
  } else if (forgetPasswordData.password.trim().length < 8) {
    toast.error('Password mus be at least 8 characters.', { theme: 'colored' });
    return false;
  } else {
    if (!forgetPasswordData.confirmPassword.trim()) {
      toast.error('Confirm Password is required', { theme: 'colored' });
      return false;
    } else if (
      forgetPasswordData.password.trim() !==
      forgetPasswordData.confirmPassword.trim()
    ) {
      toast.error('Password and Confirm Password does not match', {
        theme: 'colored',
      });
      return false;
    } else {
      return true;
    }
  }
};

export const isValidateContectInput = (data) => {
  if (!data.name.trim()) {
    toast.error('Name is required', { theme: 'colored' });
    return false;
  } else if (!data.email.trim()) {
    toast.error('Email is required', { theme: 'colored' });
    return false;
  } else if (!data.phone.trim()) {
    toast.error('Phone is required', { theme: 'colored' });
    return false;
  } else if (!data.phone.trim().length < 10 || !data.phone.trim().length > 10) {
    toast.error('Phone number must be 10 digit', { theme: 'colored' });
    return false;
  } else if (!data.subject.trim()) {
    toast.error('Subject is required', { theme: 'colored' });
    return false;
  } else if (!data.message.trim()) {
    toast.error('Message is required', { theme: 'colored' });
    return false;
  } else {
    return true;
  }
};

export const isAddressValidate = (data) => {
  if (!data.title.trim()) {
    toast.error('Title is required', { theme: 'colored' });
    return false;
  } else if (!data.address.trim()) {
    toast.error('Address is required', { theme: 'colored' });
    return false;
  } else if (!data.country.trim()) {
    toast.error('Country is required', { theme: 'colored' });
    return false;
  } else if (!data.state.trim()) {
    toast.error('State is required', { theme: 'colored' });
    return false;
  } else if (!data.city.trim()) {
    toast.error('City is required', { theme: 'colored' });
    return false;
  } else if (!data.pincode.trim()) {
    toast.error('Pincode is required', { theme: 'colored' });
    return false;
  } else if (isNaN(data.pincode.trim())) {
    toast.error('Pincode is only digit', { theme: 'colored' });
    return false;
  } else if (!data.phone.trim()) {
    toast.error('Phone is required', { theme: 'colored' });
    return false;
  } else if (isNaN(data.phone.trim())) {
    toast.error('Phone is required only digit', { theme: 'colored' });
    return false;
  } else {
    return true;
  }
};

export const isValidateSubscribeMail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    toast.error('Email is required', { theme: 'colored' });
    return false;
  } else if (!emailRegex.test(email.trim())) {
    toast.error('Invalid email format', { theme: 'colored' });
    return false;
  } else {
    return true;
  }
};
