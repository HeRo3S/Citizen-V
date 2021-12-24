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

const getPopulationData = () => {
    return axios.get(API_KEY + "population_view", {headers: authHeader() });
}

const postPopulationRequested = (data) => {
    return axios.post(API_KEY + "population_view",
    data,
    {headers: authHeader()},
    );
}

const getIndividualViewData = () => {
    return axios.get(API_KEY + "individual_view",
    {headers: authHeader()},
    );
}

const postIndividualInputData = (data) => {
    return axios.post(API_KEY + "individual_input",
    data,
    {headers: authHeader()},
    );
}

const getAnalysisData = () => {
    return axios.get(API_KEY + "analysis_view",
    {headers: authHeader()},
    );
}

const filterAnalysisData = (data) => {
    return axios.post(API_KEY + "analysis_view",
    data,
    {headers: authHeader()},
    )
}

export default {
    getPublicContent,
    getRegionCodeData,
    postRegionCodeData,
    getAccountManagerData,
    postAccountManagerData,
    getPopulationData,
    postPopulationRequested,
    getIndividualViewData,
    postIndividualInputData,
    getAnalysisData,
    filterAnalysisData,
};