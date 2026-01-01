import axios from 'axios';
import dotenv  from './dotenv.js';

const axiosInstance = axios.create({
    baseURL: `${dotenv.API_URL}`,
})

export default axiosInstance;