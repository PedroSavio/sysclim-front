import axios, { AxiosInstance } from 'axios';
import Cookies from "universal-cookie";


export function getAPIClient(_ctx = undefined) {
   const cookies = new Cookies();

   const { sysclim_token: token } = cookies.getAll();
   
   const api: AxiosInstance = axios.create({
      baseURL:
         process.env.REACT_APP_AMBIENTE === 'dev'
            ? process.env.REACT_APP_BASE_URL_DEV
            : process.env.REACT_APP_BASE_URL_PROD,
   });

   api.interceptors.request.use((config) => {
      return config;
   });
   if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   }

   return api;
}