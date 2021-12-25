import React from 'react'
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode'
import LoginBar from '../component/login';
import LogoutBar from '../component/logout';
import Navbar from '../component/navbar';

function Layout() {
    var user;

    const navigate = useNavigate();

    const userCheck = () => {
        if ( localStorage.getItem("user") ) {
            user = jwt(localStorage.getItem("user"));
            return (<LogoutBar user={user}/>)
        } else {
            navigate("/");
            return (<LoginBar />)
        }
    }

    return (
        <>
        {userCheck()}
        <Navbar />
        </>          
    )
}

export default Layout