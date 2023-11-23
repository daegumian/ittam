import { useState } from 'react';
import ReactApexChart from "react-apexcharts";

function DepartAssetChart({departAssetNum}) {

  const value = {

    series: [{
      data: [departAssetNum.Design, departAssetNum.Rnd, departAssetNum.Eng, departAssetNum.Fin, departAssetNum.Pur, departAssetNum.Sal, departAssetNum.Dev, departAssetNum.Mark, departAssetNum.Hr, departAssetNum.Prod]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 380
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: 'bottom'
          },
        }
      },
      colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
        '#f48024', '#69d2e7'
      ],
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#fff']
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: ['디자인', '연구개발', '엔지니어링', '재무', '구매', '영업', '개발',
          '마케팅', '인사', '생산'
        ],
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      // title: {
      //   text: 'Custom DataLabels',
      //   align: 'center',
      //   floating: true
      // },
      // subtitle: {
      //   text: 'Category Names as DataLabels inside bars',
      //   align: 'center',
      // },
      tooltip: {
        theme: 'dark',
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function () {
              return ''
            }
          }
        }
      }
    },


  };

  const [data, setData] = useState(value);




  return (
      <div id="chart">
        <ReactApexChart options={data.options} series={data.series} type="bar" height={316} />
      </div>

  )
}

export default DepartAssetChart;