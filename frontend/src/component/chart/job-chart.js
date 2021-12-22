import React from "react";
import Chart from "react-google-charts"

function JobChart() {
    return(
        <>
            <Chart
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['string', 'number'],
                    ['IT', 21],
                    ['Bác sĩ', 14],
                    ['Quân đội', 9],
                    ['Kinh doanh', 4],
                    ['Ngoại ngữ', 5],
                    ['Xây dựng', 1],
                    ['Dịch vụ',3],
                    ['Giáo viên',5],
                    ['Khác',10]
                  ]}
                  options={{
                    title: 'Nghề nghiệp',
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

export default JobChart;