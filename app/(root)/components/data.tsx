"use client";

import Brightness from "./brightness";
import Humidity from "./humidity";
import Temperature from "./temperature";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

interface DataLog {
    temp: string,
    humidity: string,
    brightness: string,
}

const Data = () => {
    // const [reconnecting, setReconnecting] = useState<boolean>(false);
    const [dataLog, setDataLog] = useState<DataLog>({
        temp: "0",
        humidity: "0",
        brightness: "0",
    }) ;
    useEffect(() => {
      const fetchAPI = async() => {
        const response = await axios.get("http://localhost:8081/api/data/first")
        const data = response.data;
        setDataLog(data)
      }
      fetchAPI();
    }, [])
    useEffect(() => {
      const eventSource = new EventSource('http://localhost:8081/sse/connect');
      eventSource.onmessage = (event) => {
        try {
          const newData = JSON.parse(event.data);
          setDataLog(newData);
          // Kiểm tra nếu nhận được thông báo kết nối lại từ máy chủ
          // if (newData === 'RECONNECT') {
          //   setReconnecting(true);
          //   eventSource.close(); 
          //   const newEventSource = new EventSource('http://localhost:8081/sse/connect');
          //   newEventSource.onmessage = (newEvent) => {
          //     try {
          //       const newData = JSON.parse(newEvent.data);
          //       setDataLog(newData);
          //       setReconnecting(false); 
          //     } catch (error) {

          //     }
          //   };
          // }
        } catch (error) {
          toast({
            variant: "destructive",
            description: "Error connect get datasensor",
          });
        }
      };
    }, []);
    return ( 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          <Temperature data = {dataLog?.temp || "0"}/>
          <Humidity data = {dataLog?.humidity || "0"}/>
          <Brightness data = {dataLog?.brightness || "0"}/>
        </div>
    );
}
 
export default Data;