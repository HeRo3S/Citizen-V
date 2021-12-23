import React from "react";
import Chart from "react-google-charts"

function EducationChart() {
    return(
        <>
            <Chart
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['string', 'number'],
                    ['Cấp 1', 21],
                    ['Cấp 2', 14],
                    ['Cấp 3', 9],
                    ['Đại học', 4],
                    ['Không', 5],
                  ]}
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
                  }}
            />
        </>
    )
}

export default EducationChart;