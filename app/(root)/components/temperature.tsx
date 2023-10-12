"use client"

import { cn } from "@/lib/utils";
import {ThermometerSnowflakeIcon } from "lucide-react";

interface TemperatureProps {
    data: string,
} 

const Temperature = ({data} : TemperatureProps) => {
    return ( 
        <div className={cn(
            "flex flex-col items-center gap-2 bg-primary/10 px-2 py-4 cursor-pointer rounded-xl hover-zoom",
            +data > 90
              ? "bg-red-400 animate-pulse" 
              : +data > 40
              ? "bg-orange-400 animate-pulse" 
              : +data < 0
              ? "bg-blue-300 animate-pulse" : ""
          )}>
            <ThermometerSnowflakeIcon width={120} height={120} color="green"/>
            <p className="text-5xl font-bold">{data} *C</p>
            <p className="text-lg"> Nhiệt độ</p>
        </div>
    );
}
 
export default Temperature;