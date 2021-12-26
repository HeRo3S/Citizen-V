import React, {useEffect, useState} from 'react'
import Layout from './layout'
import userServices from "../services/user.services"
import './progressReport.css'

function ProgressReport() {
    const [requestedData, setRequestedData] = useState({
        finish_status: false,
        name: "Test area",
        code: 1,
    });

    const [postData, setPostData] = useState({})

    useEffect(() => {
        userServices.getProgressReportData().then(response => {
            alert("OK!");
            setRequestedData(response.data);
        }
    )}, [])

    const changeFinishStatus = (event) => {
        const cloneData = {...requestedData};
        cloneData.finish_status = !cloneData.finish_status;
        console.log(cloneData);
        userServices.postProgressReportData(cloneData).then(() => {
            window.location.reload(false);
        })
    }

    const render = () => {
        return (
            <div id='report-form'>
                <div className='report-header'>
                    Báo cáo tiến độ
                </div>

                <div className='report-body'>
                    <div className='report-body-heading'>
                        <h3>{requestedData.name}</h3>
                    </div>
                        {
                                (requestedData.finish_status) ?
                                    (
                                        <>
                                            <i className='ti-face-smile'></i>
                                            <h3>Hoàn tất</h3>
                                        </>
                                ) : (
                                        <>
                                            <i className='ti-face-sad'></i>
                                            <h3>Chưa hoàn tất</h3>
                                        </>
                                )
                        }
                </div>

                <div className='report-footer'>
                    <button onClick={changeFinishStatus}>Change status</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Layout />
            <div className="main" id="report-page">
                <div className="container">
                    {render()}
                </div>
            </div>
        </div>
    )
}

export default ProgressReport
