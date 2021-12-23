import React from "react";
import Chart from "react-google-charts"

function GenderChart() {
    return(
        <>
            <Chart
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['string', 'number'],
                    ['Nam', 21],
                    ['Nữ', 14],
                    ['Khác', 2]
                  ]}
                  options={{
                    title: 'Giới tính',
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

export default GenderChart;