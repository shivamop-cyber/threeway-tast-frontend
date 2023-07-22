import axios from 'axios';
import * as helper from '../auth';
import { urlMap } from '../url';

export const login = async (data) => {
  try {
    const response = await axios.post(urlMap.login, data);
    console.log(response.data);
    helper.login(response.data.token);
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

export const plagCheck = async (content) => {
  const plagCheckerUrl =
    'https://plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com/plagiarism';

  const response = await axios.post(
    plagCheckerUrl,
    {
      text: content,
      language: 'en',
      includeCitations: false,
      scrapeSources: false,
    },
    {
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'f8e3b80fe1mshfefe43ce6946926p1d2017jsn00838df8bc50',
        'X-RapidAPI-Host':
          'plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com',
      },
    }
  );

  console.log(response);
  return response.data;
};
