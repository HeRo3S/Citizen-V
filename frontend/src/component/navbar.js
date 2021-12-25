import React, {useEffect, useState} from 'react'
import {Link, Outlet} from 'react-router-dom'
import jwt from 'jwt-decode'
import './navbar.css'

function Navbar() {
    const [user, setUser] = useState({});

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(jwt(localStorage.getItem('user')));
        }
    },[]);

    /**
    try {
        if (localStorage.getItem("user")) setUser(authService.getCurrentUser());   
    } catch (e) {
        console.log(e);
    }
    */

    const showNavBar = () => {
        if (user === null) {
            return (<></>);
        } else {
        if (user.access_level <= 2) {
                return (
                    <>
                        <li>
                            <Link to="/regionCodeManager" >Khai báo và cấp mã</Link>
                        </li>
                        <li>
                            <Link to="/accountManager" >Quản lý tài khoản</Link>
                        </li>
                        <li>
                            <Link to="/progressTracking" >Theo dõi tiến độ</Link>
                        </li>
                        <li>
                            <Link to="/analysisView" >Tổng hợp và phân tích</Link>
                        </li>
                        <li>
                            <Link to="/populationView" >Xem danh sách dân số</Link>
                        </li>
                        <li>
                            <Link to="/individualView" >Thông tin cá nhân</Link>
                        </li>
                    </>
                )
            } else if (user.access_level === 3) {
                return (
                    <>
                        <li>
                            <Link to="/regionCodeManager" >Khai báo và cấp mã</Link>
                        </li>
                        <li>
                            <Link to="/accountManager" >Quản lý tài khoản</Link>
                        </li>
                        <li>
                            <Link to="/progressTracking" >Theo dõi tiến độ</Link>
                        </li>
                        <li>
                            <Link to="/analysisView" >Tổng hợp và phân tích</Link>
                        </li>
                        <li>
                            <Link to="/populationView" >Xem danh sách dân số</Link>
                        </li>
                        <li>
                            <Link to="/individualView" >Thông tin cá nhân</Link>
                        </li>
                        <li>
                            <Link to="/individualInput" >Nhập liệu dữ liệu</Link>
                        </li>
                        <li>
                            <a href="/Resources/survey.pdf" >Tạo phiếu</a>
                        </li>
                        <li>
                            <Link to="/progressReport" >Báo cáo tiến độ</Link>
                        </li>
                    </>
                )
            } else if (user.access_level === 4) {
                return (
                    <>
                        <li>
                            <Link to="/individualInput" >Nhập liệu dữ liệu</Link>
                        </li>
                    </>
                )
            }
        }
    }

    return (
        <>
        <div className='navbar'>
            <div id="brand">
                <Link to="/">CITIZEN V</Link>
            </div>
            <ul id="nav">
                {showNavBar()}
            </ul>

            <label id='nav-bar-btn' for='nav-bar-input'>
                <i className='ti-list'></i>
            </label>

            <input type={'checkbox'} id='nav-bar-input'></input>

            <label className='nav-overlay' for='nav-bar-input' ></label>

            <div id='nav-res'>
                <label for='nav-bar-input' className='close-label'>
                    <i className='ti-close'></i>
                </label>
                <ul>
                    {showNavBar()}
                </ul>
            </div>
        </div> 
        </>     
    )
}

export default Navbar;