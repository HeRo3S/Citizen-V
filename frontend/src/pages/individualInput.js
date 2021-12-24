import React, { useState } from 'react'
import userServices from '../services/user.services';
import './individualInput.css'
import Layout from './layout';

function IndividualInput(){
    const [data, setData] = useState({
        id: 1234567890,
        name:"Nguyễn Văn A",
        birthday: "06/09/1969",
        gender: "Name",
        profession: "Streamer",
        religion: "",
        education:"",
        origin:"",
        temporary_address:"",
        permanent_address:""
    })

    //form data change function
    const handleFormDataChange = (event) => {
        const fieledName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const addData = {...data};
        addData[fieledName] = fieldValue;
        setData(addData);
    }

    //submit data click function
    const handleFormSubmitClick = () => {
        userServices.postIndividualInputData(data).then(() => {
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
                                    <td>  <input type="text" name='id' placeholder="Nhập CCCD/CMND" onChange={handleFormDataChange} />  </td>
                                    <td>  <input type="text" name='name' placeholder="Nhập họ và tên" onChange={handleFormDataChange}/>  </td>
                                    <td>  <input type="date" name='birthday' placeholder="Nhập ngày/tháng/năm"/>  </td>
                                </tr>

                                <tr>
                                    <th>Giới tính</th>
                                    <th>Nghề nghiệp</th>
                                    <th>Tôn giáo</th>
                                    <th>Trình độ học vấn</th>
                                </tr>

                                <tr>
                                    <td>
                                        <select type="text" name='gender' placeholder="Nhập giới tính" onChange={handleFormDataChange}>
                                            <option value="nam">Nam</option>
                                            <option value="nu">Nữ</option>
                                        </select>
                                    </td>
                                    <td>  <input type="text" name='profession' placeholder="Nhập nghề nghiệp" onChange={handleFormDataChange} />  </td>
                                    <td>  
                                        <select name='religion' placeholder="Nhập tôn giáo" onChange={handleFormDataChange} >
                                            <option value="Phat giao">Phật giáo</option>
                                            <option value="Thien chua giao">Thiên chúa giáo</option>
                                            <option value="Kito giao">Kitô giáo</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select name='education' placeholder="Nhập trình độ học vấn" onChange={handleFormDataChange}>
                                            <option value="12/12">12/12</option>
                                            <option value="Dai hoc">Đại học</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <th>Quê quán</th>
                                    <th>Địa chỉ tạm trú</th>
                                    <th>Địa chỉ thường trú</th>
                                </tr>

                                <tr>
                                    <td>  <input type="text" name='origin' placeholder="Nhập quê quán" onChange={handleFormDataChange}/>  </td>
                                    <td>  <input type="text" name='temporary_address' placeholder="Nhập địa chỉ tạm trú" onChange={handleFormDataChange}/>  </td>
                                    <td>  <input type="text" name='permanent_address' placeholder="Nhập địa chỉ thường trú" onChange={handleFormDataChange}/>  </td>
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