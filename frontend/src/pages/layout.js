import React from 'react'
import jwt from 'jwt-decode'
import LoginBar from '../component/login';
import LogoutBar from '../component/logout';

function Layout() {
    var user;
    const userCheck = () => {
        if ( localStorage.getItem("user") ) {
            user = jwt(localStorage.getItem("user"));
            return (<LogoutBar user={user}/>)
        } else {
            return (<LoginBar />)
        }
    }

    return (
        <>
        {userCheck()}
        </>          
    )
}

export default Layout