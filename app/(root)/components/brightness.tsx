"use client"

import { getRandomBrightness } from "@/app/utils/random";
import { cn } from "@/lib/utils";
import { SunDim } from "lucide-react";
import { useEffect, useState } from "react";
interface BrightnessProps {
    data: string,
}
const Brightness = ({data} : BrightnessProps) => {
    const [brightness, setBrightness] = useState<number>(+data)

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setBrightness(getRandomBrightness());
    //     },5000)
    //     return () => clearInterval(interval);
    // },[])
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
                brightness >1000 
                ? "bg-red-400 animate-pulse" 
                : brightness >500
                ? "bg-orange-400 animate-pulse" 
                : ""
            )}
        >
            <SunDim width={120} height={120} color="#FFFF99"/>
            <p className="text-5xl font-bold">{brightness} lux</p>
            <p className="text-lg"> Độ Sáng</p>
        </div>
    );
}
 
export default Brightness;