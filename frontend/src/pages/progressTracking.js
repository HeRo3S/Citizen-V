import React, {useEffect, useState} from 'react'
import userServices from '../services/user.services'
import Layout from './layout'
import './progressTracking.css'

function ProgressTracking() {
    const [requestedData, setRequestedData] = useState([
        {
            id: 1,
            name: "Test city",
            code:"01",
            finish_status: true,
            fullcode: "01010101",
        }
    ])

    //first load of the site
    useEffect(() => {
        userServices.getProgressTrackingData().then(response => {
            setRequestedData(response.data);
        })
    }, [])

    //render text data for finish_status
    const finishStatusRender = (finish_status) => {
        return finish_status ? "Hoan tat" : "Chua hoan tat"
    }

    const render = () => {
        return requestedData.map(item => {
            return (
                <tr>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{finishStatusRender(item.finish_status)}</td>
                </tr>
            )
        })
    }
    return (
        <div>
            <Layout />
            <div className="main" id="population-page">
                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <th>Ma vung</th>
                                <th>Ten vung</th>
                                <th>Tien do</th>
                            </tr>
                        </thead>
                        <tbody>
                                {render()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProgressTracking
