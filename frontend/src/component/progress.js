import React, {useEffect, useState} from 'react'
import userServices from '../services/user.services'
import './progress.css'

function ProgressBar(){
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
    return(
        <div id="inv-bar" className="bar">
            <div className="bar-container">
                <div className="bar-heading">
                    <h1>Theo dõi tiến độ</h1>
                </div>

                <div className="inv-bar-content">
                    <table>
                        <thead>
                            <tr>
                                <th style={{width: '20%'}}></th>
                                <th style={{width: '50%'}}></th>
                                <th style={{width: '30%'}}></th>
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

export default ProgressBar;