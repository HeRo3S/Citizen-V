import React from 'react'
import FilterBar from '../component/filter.js'
import './populationView.css'

function PopulationView() {
    return(
        <>
            <div className="main" id="population-page">
                <div className="container">
                    <div className="population-page-breadscrumb">
                        <ul>
                            <li><a href="">One</a></li>
                            <li><a href="">Two</a></li>
                            <li><a href="">Three</a></li>
                            <li><a href="">Four</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <FilterBar />
        </>
    )
}

export default PopulationView;