import React from "react";
import Chart from "react-google-charts"

function EducationChart() {
    return(
        <>
            <Chart
                  chartType="BarChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Cấp học', 'Tổng'],
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