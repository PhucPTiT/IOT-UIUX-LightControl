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
  dust: string;
  time: string | null;
}


const ChartControl = () => {
  const[data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get('http://localhost:5000/chartSSE/first');
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

  const connectSSE = () => {
    const eventSource = new EventSource('http://localhost:5000/chartSSE/data');
  
    eventSource.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);
        setData(newData);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Error connecting to get data sensor",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        eventSource.close();
        connectSSE(); // Reconnect when there's an error
      }
    };
  
    eventSource.onerror = (event) => {
      if ((event.target as EventSource).readyState === EventSource.CLOSED) {
        // The connection has been closed. Attempt to reconnect.
        connectSSE();
      }
    };
  
    return () => {
      eventSource.close();
    };
  };
  
  // useEffect(connectSSE, []);
  connectSSE()

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
    labels: data.map((data) => data.time?.split(" ")[1] || "00:00:00"),
    datasets: [
      {
        label: "Hust",
        data: data.map((item) => item.dust),
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
