import axios from 'axios';

const baseURL = (() => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8080/'
  } else if (process.env.NODE_ENV === 'production') {
    return '/'
  } else {
    return '/'
  }
})();

const defaultClient = axios.create({
  baseURL,
})

defaultClient.defaults.timeout = 3000;

defaultClient.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error);
});

defaultClient.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default defaultClient;