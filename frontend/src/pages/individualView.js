import React from 'react'
import './individualView.css'

function IndividualView(){
    return(
        <>
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
                                    <td>696969696</td>
                                    <td>Nguyễn Văn A</td>
                                    <td>06/09/1969</td>
                                </tr>

                                <tr>
                                    <th>Giới tính</th>
                                    <th>Nghề nghiệp</th>
                                    <th>Tôn giáo</th>
                                    <th>Trình độ học vấn</th>
                                </tr>

                                <tr>
                                    <td>Nam</td>
                                    <td>Streamer</td>
                                    <td>Không</td>
                                    <td>Đại học</td>
                                </tr>

                                <tr>
                                    <th>Quê quán</th>
                                    <th>Địa chỉ tạm trú</th>
                                    <th>Địa chỉ thường trú</th>
                                </tr>

                                <tr>
                                    <td>Hà Nội</td>
                                    <td>Khu đô thị A, Tố Hữu, La Khê, Hà Đông, Hà Nội</td>
                                    <td>Khu đô thị A, Tố Hữu, La Khê, Hà Đông, Hà Nội</td>
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
                                <label for="cccd-input">
                                    <h3>Tìm kiếm theo CCCD/CMND: </h3>
                                </label>
                                <input type="text" id="cccd-input" />
                            </div>

                            <div className="normal-search">
                                <h3>Tìm kiếm theo thông tin khác: </h3>
                                <table>
                                    <tr>
                                        <td>
                                            <label for="">Họ và tên: </label>
                                            <input type="text" />
                                        </td>
                                        <td>
                                            <label for="">Giới tính: </label>
                                            <input type="text" />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label for="">Nghề nghiệp: </label>
                                            <input type="text" />
                                        </td>
                                        <td>
                                            <label for="">Tôn giáo: </label>
                                            <input type="text" />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label for="">Ngày/Tháng/Năm sinh: </label>
                                            <input type="text" />
                                        </td>

                                        <td>
                                            <label for="">Trình độ học vấn: </label>
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