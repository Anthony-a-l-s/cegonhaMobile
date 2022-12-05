//File que cria uma api base em todas as files, facilitando mudanças
import axios from 'axios';
import { getToken } from "./auth2";

const api = axios.create({
  //baseURL: "https://pure-thicket-41731.herokuapp.com",
  baseURL:     "http://192.168.100.14:5000" || "https://cegonhaufjf.herokuapp.com/",
  headers: {
    'Access-Control-Allow-Origin': 'true',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${await token}`;
  }
  return config;
});

export default api;
