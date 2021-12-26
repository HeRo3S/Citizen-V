import React from "react";
import './login.css'
import {Link, Outlet} from 'react-router-dom'    

function LoginBar() {
    return(
        <>
        <div className="login-div">
            <div id="login">
                <p>Để sử dụng trang web, trước tiên bạn cần&nbsp;</p>
                <Link to="/loginView">Đăng Nhập</Link>
            </div>

            
            <label id='login-bar-btn' for='login-bar-input'>
                <i className='ti-user'></i>
            </label>

            <input type={'checkbox'} id='login-bar-input'></input>

            <label className='login-overlay' for='login-bar-input'></label>

            <div id='login-bar-res'>
                <label for='login-bar-input' className='close-login'>
                    <i className='ti-close'></i>
                </label>
                <div id="login-res">
                    <p>Để sử dụng trang web, trước tiên bạn cần&nbsp;</p>
                    <Link to="/loginView">Đăng Nhập</Link>
                </div>
             </div>
        </div>
        </>
    )
}

export default LoginBar;