import React, {useEffect, useState} from 'react'
import userServices from '../services/user.services'
import './individualView.css'
import Layout from './layout';

function IndividualView(){
    const [requestedData, setRequestedData] = useState({
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
    });

    useEffect(() => {
        userServices.getIndividualViewData().then(resp => {
            setRequestedData(resp.data);
        })
    })

    return(
        <>
            <Layout />
            <div className="main" id="information-page">
                <div className="container" id="information-container">
                    <div className="information-form">
                        <div className="information-form-container">
                            <h3>Thông tin cá nhân</h3>

                            <table>
                                <tr>
                                    <th>Mã CCCD/CMND</th>
                                    <th>Họ và tên</th>
                                    <th>Ngày/Tháng/Năm sinh</th>
                                </tr>

                                <tr>
                                    <td>{requestedData.id}</td>
                                    <td>{requestedData.name}</td>
                                    <td>{requestedData.birthday}</td>
                                </tr>

                                <tr>
                                    <th>Giới tính</th>
                                    <th>Nghề nghiệp</th>
                                    <th>Tôn giáo</th>
                                    <th>Trình độ học vấn</th>
                                </tr>

                                <tr>
                                    <td>{requestedData.gender}</td>
                                    <td>{requestedData.profession}</td>
                                    <td>{requestedData.religion}</td>
                                    <td>{requestedData.education}</td>
                                </tr>

                                <tr>
                                    <th>Quê quán</th>
                                    <th>Địa chỉ tạm trú</th>
                                    <th>Địa chỉ thường trú</th>
                                </tr>

                                <tr>
                                    <td>{requestedData.origin}</td>
                                    <td>{requestedData.permanent_address}</td>
                                    <td>{requestedData.temporary_address}</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="search-form">
                    <div className="search-form-container">
                            <button type="submit">
                                <i className="ti-search"></i>
                            </button>

                            <div className="cccd-search">
                                <label htmlFor="cccd-input">
                                    <h3>Tìm kiếm theo CCCD/CMND: </h3>
                                </label>
                                <input type="text" id="cccd-input" />
                            </div>

                            <div className="normal-search">
                                <h3>Tìm kiếm theo thông tin khác: </h3>
                                <table>
                                    <tr>
                                        <td>
                                            <label htmlFor="">Họ và tên: </label>
                                            <input type="text" />
                                        </td>
                                        <td>
                                            <label htmlFor="">Giới tính: </label>
                                            <input type="text" />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label htmlFor="">Nghề nghiệp: </label>
                                            <input type="text" />
                                        </td>
                                        <td>
                                            <label htmlFor="">Tôn giáo: </label>
                                            <input type="text" />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label htmlFor="">Ngày/Tháng/Năm sinh: </label>
                                            <input type="text" />
                                        </td>

                                        <td>
                                            <label htmlFor="">Trình độ học vấn: </label>
                                            <input type="text" />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IndividualView;