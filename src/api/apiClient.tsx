import axios from 'axios';

const apiclient = axios.create({
    baseURL: 'http://dummyjson.com',
    timeout: 50000,
});

apiclient.interceptors.request.use(
    async config => {
        return config;
    },
    error => Promise.reject(error)
);

apiclient.interceptors.response.use(
    Response => Response,
    error => {
        console.error('Error', error);
        return Promise.reject(error);
    }
);

export default apiclient;