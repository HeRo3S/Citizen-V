import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import authService from '../services/auth.service'
import './loginView.css'
import Navbar from '../component/navbar'


function LoginView() {
    const validationSchema = Yup.object().shape({
            username: Yup.string()
                .required('Username is required'),
            password: Yup.string()
                .required('Password is required'),
        });

    const {register, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(validationSchema)});

    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);
        // user authentication
        authService.login(data).then(
            () => {
                //insert check user statement here
                navigate("/");
            }
        );
    }

    return (
        <>
        <Navbar />
        <div class="main" id="login-page">
            <div class="container">
                <div id="login-form">
                    <div class="login-header">
                        Đăng nhập
                    </div>
                    <div class="login-body">
                        <div class="login-body-group">
                            <label for=""><h4>Tên đăng nhập</h4></label>
                            <input type="text" placeholder="Nhập tên đăng nhập" />
                        </div>
                        <div class="login-body-group">
                            <label for=""><h4>Mật khẩu</h4></label>
                            <input type="text" placeholder="Nhập mật khẩu" />
                        </div>
                    </div>
                    <div class="login-footer">
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default LoginView;