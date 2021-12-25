import React from "react";
import Chart from "react-google-charts"

function ReligionChart() {
    return(
        <>
            <Chart
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Đạo', 'Tổng'],
                    ['Phật giáo', 21],
                    ['Kito giáo', 14],
                    ['Hồi giáo', 9],
                    ['Khác', 4],
                    ['Không', 5],
                  ]}
                  options={{
                    title: 'Tôn giáo',
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

export default ReligionChart;