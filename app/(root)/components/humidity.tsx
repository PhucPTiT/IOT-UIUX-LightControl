"use client"
import { cn } from "@/lib/utils";
import { DropletIcon } from "lucide-react";

interface HumidityProps {
    data: string,
}
const Humidity = ({data} : HumidityProps) => {
    return ( 
        <div 
            className={cn(
            `flex 
            flex-col 
            items-center 
            gap-2 
            bg-primary/10 
            px-2 
            py-4 
            cursor-pointer
            rounded-xl
            hover-zoom`,
            +data <5 
              ? "bg-red-400 animate-pulse"
              : +data < 20
              ? "bg-orange-400 animate-pulse" 
              : ""
          )}
        >
            <DropletIcon width={120} height={120} color="#6EC2F7"/>
            <p className="text-5xl font-bold">{data} %</p>
            <p className="text-lg"> Độ Ẩm</p>
        </div>
    );
}
 
export default Humidity;