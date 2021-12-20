import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import authService from '../services/auth.service'
import './login.css'


function LoginBar() {
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
        <div id="login">
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className='form-group'>
                    <label htmlFor="login-ID">ID: </label>
                    <input id="login-ID" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}` }  />
                    <div className='invalid-feedback'>{errors.username?.message}</div>
                </div>

                <div className='form-group'>
                    <label htmlFor="login-password">Password: </label>
                    <input id="login-password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}` }  />
                    <div className='invalid-feedback'>{errors.password?.message}</div>
                </div>

                <button type='Submit'>
                    <i className="ti-angle-right"></i>
                </button>
            </form>
        </div>
    )
}

export default LoginBar;