import React from "react";
import Chart from "react-google-charts"

function AgeChart() {
    return(
        <>
            <Chart
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['string', 'number'],
                    ['0->6', 21],
                    ['6->18', 14],
                    ['18->24', 9],
                    ['24->60', 4],
                    ['60->100', 5],
                    ['100+', 1],
                  ]}
                  options={{
                    title: 'Độ tuổi',
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

export default AgeChart;