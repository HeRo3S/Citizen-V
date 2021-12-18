import React from 'react'
import ReactDOM from 'react-dom'
import './progress.css'

function ProgressBar(){
    return(
        <div id="inv-bar" className="bar">
            <div className="bar-container">
                <div className="bar-heading">
                    <h1>Theo dõi tiến độ</h1>
                </div>

                <div className="inv-bar-content">

                </div>
            </div>
        </div>
    )
}

export default ProgressBar;