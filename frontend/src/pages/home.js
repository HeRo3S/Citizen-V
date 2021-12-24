import React from "react";
import Navbar from "../component/navbar";
import LoginBar from "../component/login";
import LogoutBar from "../component/logout";
import jwt from "jwt-decode";
import authService from "../services/auth.service";
import './home.css'

function Home() {
    var user;
    const userCheck = () => {
        if ( localStorage.getItem("user") ) {
            user = jwt(localStorage.getItem("user"));
            return (<LogoutBar user={user}/>)
        } else {
            return (<LoginBar />)
        }
    }

    return(
        <>
            {userCheck()}           
            <Navbar />
            <div className="main" id="home-page">
            </div>
        </>
    )
}

export default Home;