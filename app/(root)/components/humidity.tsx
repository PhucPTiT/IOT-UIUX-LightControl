"use client"
import { getRandomHumity } from "@/app/utils/random";
import { cn } from "@/lib/utils";
import { DropletIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Humidity = () => {
    const [humidity, setHumidity] = useState<number>(57)

    useEffect(() => {
        const interval = setInterval(() => {
            setHumidity(getRandomHumity());
        },5000)
        return () => clearInterval(interval);
    },[])

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
            rounded-xl`,
            humidity <5 
              ? "bg-red-400 animate-pulse"
              : humidity < 20
              ? "bg-orange-400 animate-pulse" 
              : ""
          )}
        >
            <DropletIcon width={120} height={120} color="#6EC2F7"/>
            <p className="text-6xl font-bold">{humidity} %</p>
            <p className="text-lg"> Độ Ẩm</p>
        </div>
    );
}
 
export default Humidity;