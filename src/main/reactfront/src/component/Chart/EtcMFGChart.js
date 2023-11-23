import { useState } from "react";

import ReactApexChart from "react-apexcharts";

function EtcMFGChart({EtcMFGNum}) {
  const x = {
    series: [EtcMFGNum.Logitech, EtcMFGNum.Samsung, EtcMFGNum.LG, EtcMFGNum.Sony, EtcMFGNum.Microsoft, EtcMFGNum.Corsair, EtcMFGNum.Razer, EtcMFGNum.AOC, EtcMFGNum.Dell, EtcMFGNum.HP],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Logitech', 'Samsung', 'LG', 'Sony', 'Microsoft', 'Corsair', 'Razer', 'AOC', 'Dell', 'HP'],
      colors:['#4b0082', '#6a5acd', '#9C27B0', '#dda0dd', '#4a6fc3', '#AFEEEE', '#00BFFF', '#20B2AA', '#BA55D3', '#DB7093'],
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

export default EtcMFGChart;