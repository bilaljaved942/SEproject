import API from '../axios';

// Customer auth functions
export const customerLogin = (credentials) => {
  return API.post('/users/login', {
    ...credentials,
    userType: 'customer'
  });
};

export const customerSignup = (userData) => {
  return API.post('/users/register', {
    ...userData,
    userType: 'customer'
  });
};

// Admin auth functions
export const adminLogin = (credentials) => {
  return API.post('/users/login', {
    ...credentials,
    userType: 'admin'
  });
};

export const adminSignup = (userData) => {
  return API.post('/users/register', {
    ...userData,
    userType: 'admin'
  });
};

// Staff auth functions
export const staffLogin = (credentials) => {
  return API.post('/users/login', {
    ...credentials,
    userType: 'staff'
  });
};

export const staffSignup = (userData) => {
  return API.post('/users/register', {
    ...userData,
    userType: 'staff'
  });
};