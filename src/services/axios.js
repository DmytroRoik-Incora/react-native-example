import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import environment from '../constants/environment'

const API_URL = environment.API_URL;
const NGROK_URL = environment.NGROK_URL;

// (async function() {
//   AUTH_TOKEN = await AsyncStorage.getItem('accessToken');
//   if (AUTH_TOKEN) {
//     http.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
//   } else {
//     http.defaults.headers.common['Authorization'] = null;
//     /*if setting null does not remove `Authorization` header then try     
//       delete axios.defaults.headers.common['Authorization'];
//     */
//   }
// })();

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTU5NDIxMjAxOSwiZXhwIjoxNTk0NTM2MDE5fQ.aspwslpiM2h5ZtIA2GBcv7rQu1VLTyd3jf4fxHAmokg',
  }
});

export const makeGetRequest = async (url, params) => {
  return http
    .get(url, params || {})
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

export const makePostRequest = async (url, params) => {
  return http
    .post(url, params || {})
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

export const makePutRequest = async (url, params) => {
  return http
    .put(url, params || {})
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

export const makePatchRequest = async (url, params) => {
  return http
    .patch(url, params || {})
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

export const makeDeleteRequest = async (url, params) => {
  return http
    .delete(url, params || {})
    .then(response => ({ response }))
    .catch(error => ({ error }))
}
