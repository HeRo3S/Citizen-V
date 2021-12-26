import React from "react";
import Chart from "react-google-charts"

function EducationChart({educationData}) {
    return(
        <>
            <Chart
                  chartType="BarChart"
                  loader={<div>Loading Chart</div>}
                  data={educationData}
                  options={{
                    title: 'Trình độ văn hóa',
                    'width': 900,
                    'height': 600,
                    backgroundColor: '#DFE6E9',
                    pieSliceText: 'none',
                    fontSize: 25 ,
                    tooltip: {
                      showColorCode: true,
                      ignoreBounds: true,
                    },
                    legend: 'none',
                    vAxis: {
                      title: 'Cấp học',
                    },
                    hAxis: {
                      title: 'Số dân',
                      minValue: 0,
                    },
                  }}
            />
        </>
    )
}

export default EducationChart;