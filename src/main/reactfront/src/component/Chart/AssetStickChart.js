import { useState } from 'react';
import ReactApexChart from "react-apexcharts";
function AssetStickChart({stickNum}) {

  const time = (n) => {
    const today = new Date();
    let month = new Date();
    month.setMonth(today.getMonth() - n);
    return month.getMonth() + 1 + "월";
  }


  const value = {

    series: [{
      name: 'PC/노트북',
      data: [stickNum.pc6, stickNum.pc5, stickNum.pc4, stickNum.pc3, stickNum.pc2, stickNum.pc1, stickNum.pc0]
    }, {
      name: '소프트웨어',
      data: [stickNum.sw6, stickNum.sw5, stickNum.sw4, stickNum.sw3, stickNum.sw2, stickNum.sw1, stickNum.sw0]
    }, {
      name: '주변기기',
      data: [stickNum.etc6, stickNum.etc5, stickNum.etc4, stickNum.etc3, stickNum.etc2, stickNum.etc1, stickNum.etc0]
    }, {
      name: '서버',
      data: [stickNum.ser6, stickNum.ser5, stickNum.ser4, stickNum.ser3, stickNum.ser2, stickNum.ser1, stickNum.ser0]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%'
      },
      plotOptions: {
        bar: {
          horizontal: true,
          
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'Fiction Books Sales'
      },
      xaxis: {
        categories: [time(6), time(5), time(4), time(3), time(2), time(1), time(0)],
        labels: {
          formatter: function (val) {
            return val
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    },
  

  };

  const [data, setData] = useState(value);



  return (
    <div id="chart">
    <ReactApexChart options={data.options} series={data.series} type="bar" height={315}/>
  </div>

  )
}
export default AssetStickChart