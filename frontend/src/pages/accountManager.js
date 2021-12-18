import React from 'react'
import './accountManager.css'

function AccountManager() {
    return (
        <>
            <div className="main" id="acc-page">
                <div className="container">
                    <div className="acc-page-heading">
                        <p className="heading-id">Mã</p>
                        <p className="heading-name">Tên</p>
                        <p className="heading-acc">Tài khoản</p>
                        <p className="heading-declare">Khai báo</p>
                    </div>

                    <div className="acc-page-content">
                        <table>
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