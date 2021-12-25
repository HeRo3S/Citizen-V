import React from "react";
import Chart from "react-google-charts"

function AgeChart({ageData}) {
    return(
        <>
            <Chart className="age-chart"
                  chartType="ColumnChart"
                  loader={<div>Loading Chart</div>}
                  data={ageData}
                  options={{
                    title: 'Độ tuổi',
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
                      title: 'Tuổi',
                      minValue: 0,
                    },
                  }}
            />
        </>
    )
}

export default AgeChart;