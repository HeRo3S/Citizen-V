import React from "react";
import './logout.css'

function LoginBar() {
    return(
        <>
        <div id="logout">
            <p>Welcome,&nbsp;</p> 
            <p>Username&nbsp;</p>
            <p>to Citizen V.&emsp;</p>
            <link to="/home">
                <i class="ti-power-off"></i>
                Đăng xuất?
            </link>
        </div>
        </>
    )
}

export default LogoutBar;