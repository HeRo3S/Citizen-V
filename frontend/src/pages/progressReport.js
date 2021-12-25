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
            setRequestedData(response.data);
        }
    )}, [])

    const changeFinishStatus = (event) => {
        setPostData(requestedData);
        postData.finish_status = !postData.finish_status;
        userServices.postProgressReportData(postData).then(() => {
            window.location.reload(false);
        })
    }

    const render = () => {
        return (
            <div>
                <h3>{requestedData.name}</h3>
                {() => {
                        if (requestedData.finish_status){
                            return (
                                <>
                                    <i></i>
                                    <h3>Hoan tat</h3>
                                </>
                        )} else return (
                                <>
                                    <i></i>
                                    <h3>Chua hoan tat</h3>
                                </>
                        )
                }}
                <button onClick={changeFinishStatus}>Change status</button>
            </div>
        )
    }

    return (
        <div>
            <Layout />
            <div className="main" id="population-page">
                <div className="container">
                    {render()}
                </div>
            </div>
        </div>
    )
}

export default ProgressReport
