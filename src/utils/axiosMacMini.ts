import axios, { AxiosRequestConfig } from 'axios';

import { RANDOMTUTOR_API_MacMini } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstanceMacMini = axios.create({ baseURL: RANDOMTUTOR_API_MacMini });

axiosInstanceMacMini.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstanceMacMini;

// ----------------------------------------------------------------------

export const fetcherMacMini = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstanceMacMini.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------
// https://randomuser.me/documentation#format  API參數使用說明
export const endpointsMacMini = {
  randomuserMacMini: {
    root: '/',
    api: {
      products: '/api/products',
      rdmUser20: '/api/randomUser20',
    },
  },
};
