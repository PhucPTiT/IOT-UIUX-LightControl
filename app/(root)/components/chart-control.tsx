"use client"

import { Data } from "@/app/utils/Data";
import Chart from "chart.js/auto";
import { CategoryScale, LinearScale,
  PointElement,
  LineElement,
  Title, 
  Legend,
  Tooltip
} from "chart.js";
import LineChart from "./linechart";

Chart.register(
  CategoryScale, 
  Tooltip,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  );

const ChartControl = () => {
  const chartData = {
    labels: Data.map((data) => data.time), // Convert 'year' to string
    datasets: [
      {
        label: "Temperature",
        data: Data.map((data) => data.temperature),
        backgroundColor: [
          "#0066FF"
        ],
        borderColor: "#0066FF",
        borderWidth: 2,
      },
      {
        label: "Humidity",
        data: Data.map((data) => data.humidity),
        backgroundColor: [
          "#FF33CC"
        ],
        borderColor: "#FF33CC",
        borderWidth: 2,
      },
      {
        label: "Brighness",
        data: Data.map((data) => data.brightness),
        backgroundColor: [
          "#FFFF33"
        ],
        borderColor: "#FFFF33",
        borderWidth: 2,
      },
    ],
  }

  return (
       <LineChart chartData={chartData}/>
  );
};
 
export default ChartControl;
