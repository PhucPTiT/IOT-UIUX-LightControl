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
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import axios from "axios";

Chart.register(
  CategoryScale, 
  Tooltip,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  );
export interface DataItem {
  id: number | null;
  brightness: string;
  temp: string;
  humidity: string;
  time: string | null;
}

const ChartControl = () => {
  const[data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get('http://localhost:8081/chartSSE/first');
      response.data && setData(response.data)
    }
    fetchData();
  }, [])
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8081/chartSSE/data');
    eventSource.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);
        setData(newData)
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Error connect get datasensor",
        });
      }
     }

  }, [])

  const chartData = {
    labels: data.map((data) => data.time?.split(" ")[1] || "00:00:00"), // Convert 'year' to string
    datasets: [
      {
        label: "Temperature",
        data: data.map((item) => item.temp),
        backgroundColor: [
          "#0066FF"
        ],
        borderColor: "#0066FF",
        borderWidth: 2,
      },
      {
        label: "Humidity",
        data: data.map((item) => item.humidity),
        backgroundColor: [
          "#FF33CC"
        ],
        borderColor: "#FF33CC",
        borderWidth: 2,
      },
      {
        label: "Brighness",
        data: data.map((item) => item.brightness),
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
