"use client"

import useWindowSize from "@/app/hooks/useWindowSize";
import { Cedarville_Cursive } from "next/font/google";
import { Line } from "react-chartjs-2";

interface LineChartProps {
    chartData: {
        labels: string[]; // Use string[] instead of label: string[]
        datasets: {
            label: string,
            data: string[];
            backgroundColor: string[];
            borderColor: string;
            borderWidth: number;
        }[];
    };

    str: string;
}
const font = Cedarville_Cursive({
  weight: "400",
  subsets: ["latin"]
})

const LineChart = ({chartData, str} : LineChartProps) => {
  const sizeBrowser = useWindowSize();
  const isMobile: boolean = sizeBrowser.width !== undefined && sizeBrowser.width < 1024;
  return (
      <Line
        className="bg-primary/10 rounded-xl"
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: str,
              font: {
                size: isMobile ? 12 : 32,
                family: font.className,
                weight: "bold"
              }
            },
            legend: {
              display: isMobile? false : true
            }
          }
        }}
      />
  );
}
 
export default LineChart;