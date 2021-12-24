import React from 'react'
import userServices from '../services/user.services';
import './individualInput.css'
import Layout from './layout';

function IndividualInput(){
    //submit data click function
    const handleFormSubmitClick = (data) => {
        userServices.postPopulationRequested(data).then(() => {
            window.location.reload(false);
        })
    }

    return(
        <>
            <Layout />
            <div className="main" id="inputdata-page">
                <div className="container" id="inputdata-container">
                    <form onSubmit={handleFormSubmitClick}>
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
                                    <td>  <input type="date" placeholder="Nhập ngày/tháng/năm"/>  </td>
                                </tr>

                                <tr>
                                    <th>Giới tính</th>
                                    <th>Nghề nghiệp</th>
                                    <th>Tôn giáo</th>
                                    <th>Trình độ học vấn</th>
                                </tr>

                                <tr>
                                    <td>
                                        <select type="text" placeholder="Nhập giới tính">
                                            <option value="nam">Nam</option>
                                            <option value="nu">Nu</option>
                                        </select>
                                    </td>
                                    <td>  <input type="text" placeholder="Nhập nghề nghiệp"/>  </td>
                                    <td>  
                                        <select placeholder="Nhập tôn giáo">
                                            <option value="Phat giao">Phat giao</option>
                                            <option value="Thien chua giao">Thien chua giao</option>
                                            <option value="Kito giao">Kito giao</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select placeholder="Nhập trình độ học vấn">
                                            <option value="12/12">12/12</option>
                                            <option value="Dai hoc">Dai hoc</option>
                                        </select>
                                    </td>
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
                                <button type="submit">
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </form>    
                </div>
            </div>
        </>
    )
}

export default IndividualInput;