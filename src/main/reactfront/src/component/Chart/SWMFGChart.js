import { useState } from "react";

import ReactApexChart from "react-apexcharts";

function SWMFGChart({SWMFGNum}) {
  const x = {
    series: [SWMFGNum.Microsoft, SWMFGNum.한글과컴퓨터, SWMFGNum.JetBrain],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Microsoft', '한글과컴퓨터', 'JetBrain'],
      colors:['#4b0082', '#6a5acd', '#9C27B0'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },

  };

  const [data, setData] = useState(x);

  return (
      <div id="chart" style={{height: '190px'}}>
        <ReactApexChart options={data.options} series={data.series} type="donut" width={366}/>
      </div>
  )
}

export default SWMFGChart;