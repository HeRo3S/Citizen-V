import React from 'react'
import './individualInputView.css'
import Navbar from '../component/navbar';

function IndividualInputView(){
    return(
        <>
            <Navbar />
            <div className="main" id="inputdata-page">
                <div className="container" id="inputdata-container">
                    <div className="inputdata-form">
                            <div className='inputdata-heading'>
                                Nhập thông tin cá nhân
                            </div>

                            <table> 
                                <tr>
                                    <th>Mã CCCD/CMND</th>
                                    <th>Họ và tên</th>
                                    <th>Ngày/Tháng/Năm sinh</th>
                                </tr>

                                <tr>
                                    <td>  <input type="text" placeholder="Nhập CCCD/CMND" />  </td>
                                    <td>  <input type="text" placeholder="Nhập họ và tên"/>  </td>
                                    <td>  <input type="text" placeholder="Nhập ngày/tháng/năm"/>  </td>
                                </tr>

                                <tr>
                                    <th>Giới tính</th>
                                    <th>Nghề nghiệp</th>
                                    <th>Tôn giáo</th>
                                    <th>Trình độ học vấn</th>
                                </tr>

                                <tr>
                                    <td>  <input type="text" placeholder="Nhập giới tính"/>  </td>
                                    <td>  <input type="text" placeholder="Nhập nghề nghiệp"/>  </td>
                                    <td>  <input type="text" placeholder="Nhập tôn giáo"/>  </td>
                                    <td>  <input type="text" placeholder="Nhập trình độ học vấn"/>  </td>
                                </tr>

                                <tr>
                                    <th>Quê quán</th>
                                    <th>Địa chỉ tạm trú</th>
                                    <th>Địa chỉ thường trú</th>
                                </tr>

                                <tr>
                                    <td>  <input type="text" placeholder="Nhập quê quán"/>  </td>
                                    <td>  <input type="text" placeholder="Nhập địa chỉ tạm trú"/>  </td>
                                    <td>  <input type="text" placeholder="Nhập địa chỉ thường trú"/>  </td>
                                </tr>
                            </table>
                            <div className='inputdata-footer' >
                                <button>
                                    Xác nhận
                                </button>
                            </div>
                        </div>    
                </div>
            </div>
        </>
    )
}

export default IndividualInputView;