
import {useEffect, useState} from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from "axios";



function AreaChart({all, using, dispose}) {



const date_n = (n) => {
  const today = new Date();
  let today_n = new Date();
  today_n.setDate(today.getDate() - n);
  return (today_n.getMonth()+1)+"/"+today_n.getDate().toString();
}
const month_n = (n) => {
  const today = new Date();
  let today_n = new Date();
  today_n.setMonth(today.getMonth() - n);
  return today_n.getMonth() + 1 + "월";
}


   const xxx = {

     series: [{
       name: '총 자산',
       data: [all.day6, all.day5, all.day4, all.day3, all.day2, all.day1, all.today]
       //data: [day6, day6, 70, 50, 42, 60, 65]
     }, {
       name: '사용중인 자산',
       data: [using.day6, using.day5, using.day4, using.day3, using.day2, using.day1, using.today]
     },
     {
       name: '폐기된 자산',
       data: [dispose.day6, dispose.day5, dispose.day4, dispose.day3, dispose.day2, dispose.day1, dispose.today]
     },

   ],

     options: {
       chart: {
         height: 250,
         type: 'area'
       },
       dataLabels: {
         enabled: true,

       },
       stroke: {
         curve: 'smooth'
       },
       xaxis: {
         type: 'text',
         categories: [date_n(6),date_n(5), date_n(4), date_n(3), date_n(2), date_n(1), date_n(0)]
         //categories: [month_n(6),month_n(5), month_n(4), month_n(3), month_n(2), month_n(1), month_n(0)]
       },
       tooltip: {
         x: {
           format: 'yy/MM/dd'
         },
       },
     },


   };

  const [datas, setDatas] = useState(xxx);
  useEffect(() => {
    setDatas(xxx);
  }, []);








  return (
    <div className="app">

      <div id="chart">
         <ReactApexChart options={datas.options} series={datas.series} type="area" height={315} />
      </div>


    </div>
  )




}

export default AreaChart;