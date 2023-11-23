import { useState } from "react";

import ReactApexChart from "react-apexcharts";

function CPUChart({CPUNum}) {
  const x = {
    series: [CPUNum.Intel, CPUNum.AMD],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Intel', 'AMD Ryzen'],
      colors:['#4b0082', '#6a5acd', '#9C27B0', '#dda0dd'],
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
        <ReactApexChart options={data.options} series={data.series} type="donut" width={360}/>
      </div>
  )
}

export default CPUChart;