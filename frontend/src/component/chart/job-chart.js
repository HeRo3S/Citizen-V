import React from "react";
import Chart from "react-google-charts"

function JobChart() {
    return(
        <>
            <Chart
                  chartType="ColumnChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Nghè', 'Tổng'],
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