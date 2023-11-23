import { useState } from 'react';
import ReactApexChart from "react-apexcharts";

function DepartChart({departNum}) {

  const value = {

    series: [departNum.design, departNum.rnd, departNum.eng, departNum.fin, departNum.pur, departNum.sales, departNum.dev, departNum.mark, departNum.hr, departNum.prod],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['디자인', '연구개발', '엔지니어링', '재무', '구매', '영업', '개발', '마케팅', '인사', ' 생산'],
      colors:['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', '#f48024', '#69d2e7'],
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

  const [data, setData] = useState(value);




  return (
    <div id="chart">
    <ReactApexChart options={data.options} series={data.series} type="pie" width={480} />
  </div>

  )
}

export default DepartChart;