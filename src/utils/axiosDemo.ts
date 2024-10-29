import axios, { AxiosRequestConfig } from 'axios';

import { RANDOMTUTOR_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstanceDemo = axios.create({ baseURL: RANDOMTUTOR_API });

axiosInstanceDemo.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstanceDemo;

// ----------------------------------------------------------------------

export const fetcherDemo = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstanceDemo.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpointsDemo = {
  randomuser: {
    user: '/api/1.4/',
    users20: '/api/1.4/?results=20',
  },
};
