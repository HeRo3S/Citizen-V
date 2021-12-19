import React from 'react'
import ProgressBar from '../component/progress'
import './accountManager.css'

function AccountManager() {
    return (
        <>
            <ProgressBar />
            <div className="main" id="acc-page">
                <div className="container">
                    <div className="acc-page-content">
                        <table>
                            <tr>
                                <th style={{width: "10%"}}>Mã</th>
                                <th style={{width: "40%"}}>Tên</th>
                                <th style={{width: "25%"}}>Tài khoản</th>
                                <th style={{width: "15%"}}>Khai báo</th>
                                <th style={{width: "10%"}}>
                                </th>
                            </tr>      

                            <tr>
                                <td style={{width: "10%"}}>01</td>
                                <td style={{width: "40%"}}>Thành phố Hà Nội</td>
                                <td style={{width: "25%"}}>
                                *********
                                <i className="ti-layers"></i>
                                <i className="ti-reload"></i>
                                </td>
                                <td style={{width: "15%"}}>
                                <i className="ti-lock"></i>
                                </td>
                                <td style={{width: "10%"}}>
                                <i className="ti-trash"></i>
                                </td>
                            </tr>

                            <tr>
                                <td style={{width: "10%"}}>01</td>
                                <td style={{width: "40%"}}>Tỉnh Bắc Giang</td>
                                <td style={{width: "25%"}}></td>
                                <td style={{width: "15%"}}></td>
                                <td style={{width: "10%"}}>
                                    <i className="ti-plus"></i>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div className="acc-page-footer">
                    <button>Change</button>
                    <button>Remove all</button>
                    <button>Reset all</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountManager;