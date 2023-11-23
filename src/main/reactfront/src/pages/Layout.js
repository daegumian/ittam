import { useState } from "react";

import Chart from "react-apexcharts";
import axios from "axios";

function Layout() {
  const x = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  const [message, setMessage] = useState("");
  axios.get("/test").then(res => setMessage(res.data)).catch(err => console.log(err));


  const [data, setData] = useState(x);
  return (
    <main id="main" className="main">
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={data.options}
              series={data.series}
              type="bar"
              width="500"
            />
          </div>

          <div>
            <Chart
              options={data.options}
              series={data.series}
              type="line"
              width="500"
            />
          </div>
        </div>
      </div>
      <div>{message}</div>
    </main>
  );
}

export default Layout;
