import React from 'react'
import Layout from './layout'
import './progressTracking.css'

function ProgressTracking() {
    return (
        <div>
            <Layout />
            <div className='main-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Ma vung</th>
                            <th>Ten vung</th>
                            <th>Tien do</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProgressTracking
