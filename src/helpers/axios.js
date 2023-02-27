import axios from 'axios';
import { useSelector } from 'react-redux';
import { urlApi } from '../urlConfig/urlConfig';
const axiosInstance = (token) => {
    return axios.create({
        baseURL: urlApi,
        headers: { Authorization: `Bearer ${token}` },
    });
};

export default axiosInstance;
