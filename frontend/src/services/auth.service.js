import axios from 'axios'

const API_KEY = "http://localhost:3001/api/auth/"

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