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
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="main" id="login-page">
            <div className="container">
                    <div id="login-form">
                        <div className="login-header">
                            Đăng nhập
                        </div>
                        <div className="login-body">
                            <div className="login-body-group">
                                <label htmlFor=""><h4>Tên đăng nhập</h4></label>
                                <input type="text" placeholder="Nhập tên đăng nhập" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                                <div className='invalid-feedback'>{errors.username?.messages}</div>
                            </div>
                            <div className="login-body-group">
                                <label htmlFor=""><h4>Mật khẩu</h4></label>
                                <input type="password" placeholder="Nhập mật khẩu" {...register('password')} className={`form-control ${errors.password? 'is-invalid' : ''}`} />
                                <div className='is-invalid'>{errors.password?.messages}</div>
                            </div>
                        </div>
                        <div className="login-footer">
                            <button type="submit" >Submit</button>
                        </div>
                    </div>
            </div>
        </div>
        </form>
        </>
    )
}

export default LoginView;