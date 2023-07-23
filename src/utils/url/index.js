export const BACKEND_URL = 'https://threewaytask.onrender.com';
const userUrl = `${BACKEND_URL}/api/v1/user`;
const orderUrl = `${BACKEND_URL}/api/v1/order`;

export const urlMap = {
  login: `${userUrl}/login`,
  register: `${userUrl}/register`,
  getMyOrders: `${userUrl}/orders`,
  getTransporters: `${userUrl}/transporters/all`,
  createOrder: `${orderUrl}/create`,
  setPrice: `${orderUrl}/price/set`,
  getOrderMessages: `${orderUrl}/messages`,
};
