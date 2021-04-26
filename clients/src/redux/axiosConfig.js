import axios from 'axios';
import { BASE_LOCAL_URL } from "../constants/urlconstants";
import { getAuthToken } from "../helpers/Authgetuser";

const instance = axios.create({
    baseURL: BASE_LOCAL_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

instance.interceptors.request.use(function (config) {
   const token = getAuthToken();
   config.headers.Authorization =  token ? `Bearer ${token}` : '';
   return config;
});


export default instance;