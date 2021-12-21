import axios from 'axios';
import authHeader from './auth-header';

const API_KEY = "http://localhost:3001/api/"

const getPublicContent = () => {
    return axios.get(API_KEY + "default");
}

const getAccountManagerData = () => {
    return axios.get(API_KEY + "accountManager", {headers: authHeader() });
}

const postAccountManagerData = (data) => {
    return axios.post(API_KEY + "accountManager", 
    {headers: authHeader()},
    data
    );
}

export default {
    getPublicContent,
    getAccountManagerData,
    postAccountManagerData,
};