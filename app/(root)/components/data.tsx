"use client";

import Brightness from "./brightness";
import Humidity from "./humidity";
import Temperature from "./temperature";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { ToastAction } from "@/components/ui/toast";
import Dust from "./dust";
import { getRandomDust } from "../utils/random";

export interface DataLog {
    temp: string,
    humidity: string,
    brightness: string,
    dust: string,
}

const Data = () => {
    // const [reconnecting, setReconnecting] = useState<boolean>(false);
    const [dataLog, setDataLog] = useState<DataLog>({
        temp: "0",
        humidity: "0",
        brightness: "0",
        dust: "0",
    }) ;
    useEffect(() => {
      const fetchAPI = async() => {
        try {
          const response = await axios.get("http://localhost:5000/api/data/first")
          const data = response.data;
          setDataLog(data)
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: "Error call api data first"
          })
        }
      }
      fetchAPI();
    }, [])
    useEffect(() => {
      const eventSource = new EventSource('http://localhost:5000/sse/connect');
      eventSource.onmessage = (event) => {
        try {
          const newData = JSON.parse(event.data);
          setDataLog(newData);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Some thing went wrong",
            description: "Error connect get datasensor",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      };
      return () => {
        eventSource.close();
      }
    }, []);

    //random dust
    return ( 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
          <Temperature data = {dataLog?.temp || "0"}/>
          <Humidity data = {dataLog?.humidity || "0"}/>
          <Brightness data = {dataLog?.brightness || "0"}/>
          <Dust data = {dataLog?.dust || "0"}/>
        </div>
    );
}
 
export default Data;