"use client"

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
import { ToastAction } from "@/components/ui/toast";

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

export interface Hust {
  id: number | null;
  dust: number;
  time: string | null;
}

const ChartControl = () => {
  const[data, setData] = useState<DataItem[]>([]);
  const[listHust, setListHust] = useState<Hust[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get('https://java-iot-be-production.up.railway.app/chartSSE/first');
        response.data && setData(response.data)
      }
      catch(error) {
        toast({
          variant: "destructive",
          title: "Some thing went wrong",
          description: "Error connect get datasensor first",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
    fetchData();

    return () => {

    }
  }, [])

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get('https://java-iot-be-production.up.railway.app/dust');
        const data = response.data;
        setListHust(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Error call api get listHust"
        })
      }
    }
    fetchData(); 
  }, [])

  useEffect(() => {
    const eventSource = new EventSource('https://java-iot-be-production.up.railway.app/chartSSE/data');
    eventSource.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);
        setData(newData)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Some thing went wrong",
          description: "Error connect get datasensor",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
     }
     return () => {
      eventSource.close();
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
        data: data.map((item) => (parseFloat(item.brightness)).toFixed(2)),
        backgroundColor: [
          "#FFFF33"
        ],
        borderColor: "#FFFF33",
        borderWidth: 2,
      },
    ],
  }
  

  const hustChartData = {
    labels: listHust.map((data) => data.time?.split(" ")[1] || "00:00:00"),
    datasets: [
      {
        label: "Hust",
        data: listHust.map((item) => ""+item.dust),
        backgroundColor: [
          "#00FF00"
        ],
        borderColor: "#00BB00",
        borderWidth: 2,
      }
    ]
  }
  return (
       <div className="grid grid-cols-1 lg:grid-cols-2 h-[600px] lg:h-full gap-4">
         <div className="h-[290px] lg:h-full"><LineChart str = "Data Sensor" chartData={chartData}/></div>
         <div className="h-[290px] lg:h-full"><LineChart str = "Hust Sensor" chartData={hustChartData}/></div>
       </div>

  );
};
 
export default ChartControl;
