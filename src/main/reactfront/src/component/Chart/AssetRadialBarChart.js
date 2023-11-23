import { useState } from 'react';
import ReactApexChart from "react-apexcharts";

function AssetRadialBarChart({categoryNum}) {
  const pcAvg = Math.round(categoryNum.using[0].usingCat/categoryNum.all[0].allCat * 100 * 10)/10;
  const swAvg = Math.round(categoryNum.using[1].usingCat/categoryNum.all[1].allCat * 100 * 10)/10;
  const etcAvg = Math.round(categoryNum.using[2].usingCat/categoryNum.all[2].allCat * 100 * 10)/10;
  const serverAvg = Math.round(categoryNum.using[3].usingCat/categoryNum.all[3].allCat * 100 * 10)/10;


  const value = {

    series: [pcAvg, swAvg, etcAvg, serverAvg],
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: '평균사용률',
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return Math.round((pcAvg+swAvg+etcAvg+serverAvg)/4 * 10)/10
              }
            }
          }
        }
      },
      labels: ['PC/노트북', '소프트웨어', '주변기기', '서버'],
    },


  };

  const [data, setData] = useState(value);




  return (
      <div id="chart">
        <ReactApexChart options={data.options} series={data.series} type="radialBar" height={350} />
      </div>

  )
}

export default AssetRadialBarChart;