import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token');
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export default instance;
