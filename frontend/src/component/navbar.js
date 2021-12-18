import React from 'react'
import ReactDOM from 'react-dom'
import {Link, Outlet} from 'react-router-dom'
import './navbar.css'

function Navbar() {
    return (
        <>
        <div className='navbar'>
            <div id="brand">
                CITIZEN V
            </div>
            <ul id="nav">
                <li>
                    <Link to="/regionCodeManager" >Khai báo và cấp mã</Link>
                </li>
                <li>
                    <Link to="/accountManager" >Quản lý tài khoản</Link>
                </li>
                <li>
                    <Link to="" >Theo dõi tiến độ</Link>
                </li>
                <li>
                    <Link to="" >Tổng hợp và phân tích</Link>
                </li>
                <li>
                    <Link to="/populationView" >Xem danh sách dân số</Link>
                </li>
                <li>
                    <Link to="/individualView" >Thông tin cá nhân</Link>
                </li>
                <li>
                    <Link to="" >Nhập liệu dữ liệu</Link>
                </li>
                <li>
                    <Link to="" >Tạo phiếu</Link>
                </li>
                <li>
                    <Link to="" >Báo cáo tiến độ</Link>
                </li>
            </ul>
        </div> 

        <Outlet />

        </>     
    )
}

export default Navbar;