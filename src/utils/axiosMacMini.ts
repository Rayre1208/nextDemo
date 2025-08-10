import axios, { AxiosRequestConfig } from 'axios';

import { RANDOMTUTOR_API_MacMini } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstanceDemo = axios.create({ baseURL: RANDOMTUTOR_API_MacMini });

axiosInstanceDemo.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstanceDemo;

// ----------------------------------------------------------------------

export const fetcherMacMini = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstanceDemo.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------
// https://randomuser.me/documentation#format  API參數使用說明
export const endpointsMacMini = {
  randomuserMacMini: {
    root: '/',
  },
};
