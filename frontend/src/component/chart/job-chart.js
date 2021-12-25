import React from "react";
import Chart from "react-google-charts"

function JobChart({jobData}) {
    return(
        <>
            <Chart
                  chartType="ColumnChart"
                  loader={<div>Loading Chart</div>}
                  data={jobData}
                  options={{
                    title: 'Nghề nghiệp',
                    'width': 900,
                    'height': 600,
                    backgroundColor: '#DFE6E9',
                    pieSliceText: 'none',
                    fontSize: 20 ,
                    tooltip: {
                      showColorCode: true,
                      ignoreBounds: true,
                    },
                    legend: 'none',
                    vAxis: {
                      title: 'Số dân',
                    },
                    hAxis: {
                      title: 'Nghề nghiệp',
                      minValue: 0,
                    },
                  }}
            />
        </>
    )
}

export default JobChart;