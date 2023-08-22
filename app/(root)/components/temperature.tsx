"use client"

import { getRandomTemple } from "@/app/utils/random";
import { cn } from "@/lib/utils";
import {ThermometerSnowflakeIcon } from "lucide-react";
import {useState,useEffect} from "react"

const Temperature = () => {
    const [temperature, setTemperature] = useState<number>(60)
    useEffect(() => {
        const interval = setInterval(() => {
            setTemperature(getRandomTemple());
        },5000)
        return () => clearInterval(interval);
    },[])
    return ( 
        <div className={cn(
            "flex flex-col items-center gap-2 bg-primary/10 px-2 py-4 cursor-pointer rounded-xl",
            temperature > 90
              ? "bg-red-400 animate-pulse" 
              : temperature > 40
              ? "bg-orange-400 animate-pulse" 
              : temperature < 0
              ? "bg-blue-300 animate-pulse" : ""
          )}>
            <ThermometerSnowflakeIcon width={120} height={120} color="green"/>
            <p className="text-6xl font-bold">{temperature} *C</p>
            <p className="text-lg"> Nhiệt độ</p>
        </div>
    );
}
 
export default Temperature;