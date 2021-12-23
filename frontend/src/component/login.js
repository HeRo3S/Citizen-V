import React from "react";
import './login.css'
import {Link, Outlet} from 'react-router-dom'    

function LoginBar() {
    return(
        <>
        <div id="login">
            <p>Để sử dụng trang web, trước tiên bạn cần&nbsp;</p>
            <Link to="/loginView">Đăng Nhập</Link>
        </div>
        </>
    )
}

export default LoginBar;