import axios from 'axios';
import authHeader from './auth-header';

const API_KEY = "http://localhost:3001/api/"

const getPublicContent = () => {
    return axios.get(API_KEY + "default");
}

const getRegionCodeData = () => {
    return axios.get(API_KEY + "region_code", {headers: authHeader() });
}

const postRegionCodeData = (data) => {
    return axios.post(API_KEY + "region_code",
    data,
    {headers: authHeader() });
}

const getAccountManagerData = () => {
    return axios.get(API_KEY + "accountManager", {headers: authHeader() });
}

const postAccountManagerData = (data) => {
    return axios.post(API_KEY + "accountManager",
    data,
    {headers: authHeader()},
    );
}

export default {
    getPublicContent,
    getRegionCodeData,
    postRegionCodeData,
    getAccountManagerData,
    postAccountManagerData,
};