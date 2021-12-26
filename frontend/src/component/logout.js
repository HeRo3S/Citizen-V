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
        window.location.reload(false);
    }

    return(
        <>
        <div id="logout-div">
            <div id="logout">
                <p>Welcome,&nbsp;</p> 
                <p>{user.username}&nbsp;</p>
                <p>to Citizen V.&emsp;</p>
                <button onClick={handleLogoutClick}>
                    <i className="ti-power-off">&nbsp;</i>
                    Đăng xuất?
                </button>
            </div>

            <label id='logout-bar-btn' htmlFor='logout-bar-input'>
                <i className='ti-user'></i>
            </label>

            <input type={'checkbox'} id='logout-bar-input'></input>

            <label className='logout-overlay' htmlFor='logout-bar-input'></label>

            <div id='logout-bar-res'>
                <label htmlFor='logout-bar-input' className='close-logout'>
                    <i className='ti-close'></i>
                </label>
                <div id="logout-res">
                    <p>Welcome,&nbsp;</p> 
                    <p>{user.username}&nbsp;</p>
                    <p>to Citizen V.&emsp;</p>
                    <button onClick={handleLogoutClick}>
                        <i className="ti-power-off">&nbsp;</i>
                        Đăng xuất?
                    </button>
                </div>
            </div>
        </div>
        <Outlet />
        </>
    )

}

export default LogoutBar;