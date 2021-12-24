import React from "react";
import { useNavigate } from "react-router-dom";
import authService from '../services/auth.service'
import './logout.css'

function LogoutBar({user}) {
    const navigate = useNavigate();
    //handle logout button function
    const handleLogoutClick = () => {
        authService.logout();
        window.location.reload(false);
    }

    return(
        <>
        <div id="logout">
            <p>Welcome,&nbsp;</p> 
            <p>{user.username}&nbsp;</p>
            <p>to Citizen V.&emsp;</p>
            <button onClick={handleLogoutClick}>
                <i className="ti-power-off"></i>
                Đăng xuất?
            </button>
        </div>
        </>
    )
}

export default LogoutBar;