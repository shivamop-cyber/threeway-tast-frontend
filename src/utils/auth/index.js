export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userType');
};

export const login = (token) => {
  localStorage.setItem('authToken', token);
};

export const isLoggedIn = () => {
  return localStorage.getItem('authToken') != null;
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const setUserType = (userType) => {
  localStorage.setItem('userType', userType);
};

export const getUserType = () => {
  return localStorage.getItem('userType');
};
