import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authService from '../services/auth.service'
import './logout.css'

function LogoutBar({user}) {
    const navigate = useNavigate();
    //handle logout button function
    const handleLogoutClick = () => {
        authService.logout();
        navigate("/");
    }

    return(
        <>
        <div id="logout">
            <p>Welcome,&nbsp;</p> 
            <p>{user.username}&nbsp;</p>
            <p>to Citizen V.&emsp;</p>
            <button onClick={handleLogoutClick}>
                <i className="ti-power-off">&nbsp;</i>
                Đăng xuất?
            </button>
        </div>

        <Outlet />
        </>
    )

}

export default LogoutBar;