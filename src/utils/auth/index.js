export const logout = () => {
  console.log('Logging out');
  localStorage.removeItem('authToken');
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
