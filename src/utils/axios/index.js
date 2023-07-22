import axios from 'axios';
import * as helper from '../auth';
import { urlMap } from '../url';

export const login = async (data) => {
  try {
    const response = await axios.post(urlMap.login, data);
    console.log(response.data);
    helper.login(response.data.token);
    helper.setUserType(response.data.user.userType);
    return response.data;
  } catch (err) {
    return {
      success: err.response.data.success,
      message: err.response.data.error,
    };
  }
};

export const getData = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${helper.getToken()}` },
    });
    return response.data;
  } catch (err) {
    return {
      success: err.response.data.success,
      message: err.response.data.error,
    };
  }
};

export const postData = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${helper.getToken()}` },
    });
    return response.data;
  } catch (err) {
    return {
      success: err.response.data.success,
      message: err.response.data.error,
    };
  }
};
