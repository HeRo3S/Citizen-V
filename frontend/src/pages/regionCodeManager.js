import React from 'react'
import ProgressBar from '../component/progress'
import './regionCodeManager.css'

function RegionCodeManager() {
    return(
        <>
            <ProgressBar />
            <div className="main" id="declare-page">
                <div className="container">
                    <div className="declare-page-heading">
                        <p className="heading-id">Mã</p>
                        <p className="heading-name">Tên</p>
                    </div>

                    <div className="declare-page-input">
                        <input type="text" className="text-id" />
                        <input type="text" className="text-region" />
                        <i className="ti-plus"></i>
                    </div>

                    <div className="declare-page-button">
                        <button id="declare-page-button-add">Add</button>
                        <button id="declare-page-button-edit">Edit</button>
                    </div>

                    <div className="declare-page-content">
                        <table>
                            <tr>
                                <td style={{width: "10%"}}>01</td>
                                <td style={{width: "70%"}}>Thành phố Hà Nội</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td style={{width: "10%"}}>02</td>
                                <td style={{width: "70%"}}>Tỉnh Bắc Giang</td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegionCodeManager;