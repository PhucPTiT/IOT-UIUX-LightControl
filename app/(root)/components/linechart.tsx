import { Cedarville_Cursive } from "next/font/google";
import { Line } from "react-chartjs-2";

interface LineChartProps {
    chartData: {
        labels: string[]; // Use string[] instead of label: string[]
        datasets: {
            label: string,
            data: number[];
            backgroundColor: string[];
            borderColor: string;
            borderWidth: number;
        }[];
    };
}
const font = Cedarville_Cursive({
  weight: "400",
  subsets: ["latin"]
})

const LineChart = ({chartData} : LineChartProps) => {
  const isMobile = window.innerWidth <= 1024;
  return (
      <Line
        className="bg-primary/10 rounded-xl"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Line Chart Follow Control",
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