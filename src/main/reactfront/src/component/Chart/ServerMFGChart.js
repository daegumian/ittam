import { useState } from "react";

import ReactApexChart from "react-apexcharts";

function ServerMFGChart({ServerMFGNum}) {
  const x = {
    series: [ServerMFGNum.Western, ServerMFGNum.Toshiba, ServerMFGNum.Seagate, ServerMFGNum.SanDisk , ServerMFGNum.Samsung, ServerMFGNum.Kingston, ServerMFGNum.Crucial],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Western Digital', 'Toshiba', 'Seagate', 'SanDisk ', 'Samsung', 'Kingston', 'Crucial'],
      colors:['#4b0082', '#6a5acd', '#9C27B0', '#dda0dd', '#4a6fc3', '#AFEEEE', '#00BFFF'],
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
        <ReactApexChart options={data.options} series={data.series} type="donut" width={346}/>
      </div>
  )
}

export default ServerMFGChart;