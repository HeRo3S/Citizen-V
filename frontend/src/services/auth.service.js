import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const API_KEY = "http://localhost:3001/api/auth/"

axios.interceptors.response.use(response => {
    return response;
}, err => {
    if (err.response.status === 403) {
        if (localStorage.getItem("user")) {
            alert("Token expired! Please login again!")
            logout();
        }
    } else if (err.response.status === 401) {
        alert("Incorrect username and password! Please try again!");
        window.location.reload(false);
    }
})

const signup = (username, password) => {
    return axios
    .post(API_KEY + "signup", {
        username,
        password,
    });
};

const login = (data) => {
    return axios
    .post(API_KEY + "signin", data)
    .then(response => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
}

const logout = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

export default {
    signup,
    login,
    logout,
    getCurrentUser,
};