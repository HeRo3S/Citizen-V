import React from 'react'
import FilterBar from '../component/filter.js'
import AgeChart from '../component/chart/age-chart.js';
import EducationChart from '../component/chart/education-chart'
import GenderChart from '../component/chart/gender-chart'
import ReligionChart from '../component/chart/religion-chart'
import JobChart from '../component/chart/job-chart'


function AnalysisView() {
    return(
        <>
            <div className="main" id="population-page">
                <div className="container">
                   <AgeChart />
                   <EducationChart />
                   <GenderChart />
                   <ReligionChart />
                   <JobChart />
                </div>
            </div>
           <FilterBar/>
        </>
    )
}

export default AnalysisView;