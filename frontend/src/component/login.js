import React from 'react'
import './login.css'

function LoginBar() {
    return (
        <div id="login">
            <label htmlFor="login-ID">ID: </label>
            <input id="login-ID" type="text"/>
            <label htmlFor="login-password">Password: </label>
            <input id="login-password" type="password"/>
            <button>
                <i className="ti-angle-right"></i>
            </button>
        </div>
    )
}

export default LoginBar;