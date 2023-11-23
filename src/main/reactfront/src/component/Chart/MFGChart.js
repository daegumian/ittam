import { useState } from "react";

import ReactApexChart from "react-apexcharts";

function MFGChart({MFGNum}) {
  const x = {
    series: [MFGNum.Samsung, MFGNum.Dell, MFGNum.HP, MFGNum.Lenovo, MFGNum.Apple],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Samsung', 'Dell', 'HP', 'Lenovo', 'Apple'],
      colors:['#4b0082', '#6a5acd', '#9C27B0', '#dda0dd', '#4a6fc3'],
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

export default MFGChart;