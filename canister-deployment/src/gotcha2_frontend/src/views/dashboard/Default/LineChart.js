import React from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

import MainCard from "../../../ui-component/cards/MainCard";

function LineChart() {
  const [chartState, setChartState] = useState({
    series: [
      {
        name: "Earning",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 230, 180, 165],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Your Earnings",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  });

  return (
    <div id="chart">
      <MainCard>
        <ReactApexChart
          options={chartState.options}
          series={chartState.series}
          type="line"
          height={350}
        />
      </MainCard>
    </div>
  );
}

export default LineChart;
