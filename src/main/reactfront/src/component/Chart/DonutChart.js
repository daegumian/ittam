
import { useState } from "react";

import ReactApexChart from "react-apexcharts";

function DounutChart_user({myAssetChartCnt}) {
  const x = {
    series: [myAssetChartCnt.pcCnt, myAssetChartCnt.swCnt, myAssetChartCnt.etcCnt, myAssetChartCnt.serverCnt],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['PC', '소프트웨어', '주변기기', '서버'],
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

      <div id="chart">
        {
          (myAssetChartCnt.pcCnt === 0 && myAssetChartCnt.swCnt === 0 && myAssetChartCnt.etcCnt ===0 && myAssetChartCnt.serverCnt === 0)  ? <img src="../assets/img/ittam3.png" alt="ddd" style={{width: "250px"}}/>
              :
        <ReactApexChart options={data.options} series={data.series} type="donut" width={365}/>
        }
      </div>
  )
}

export default DounutChart_user;
