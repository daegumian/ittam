import { useState } from "react";

import ReactApexChart from "react-apexcharts";

function GPUChart({GPUNum}) {
  const x = {
    series: [GPUNum.NVIDIA, GPUNum.AMD, GPUNum.Intel],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['NVIDIA GeForce', 'AMD Radeon', 'Intel Arc'],
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
        <ReactApexChart options={data.options} series={data.series} type="donut" width={385}/>
      </div>
  )
}

export default GPUChart;