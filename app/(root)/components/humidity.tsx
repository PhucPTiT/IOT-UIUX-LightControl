"use client"

import { cn } from "@/lib/utils";
import { DropletIcon } from "lucide-react";

interface HumidityProps {
    data: string,
}

const Humidity = ({ data }: HumidityProps) => {
    const humidity = +data;

    let gradientColor = "from-blue-400 via-blue-400 to-blue-500"; // Default color for humidity >= 0%
    if(humidity > 90) {
        gradientColor = "from-blue-600 via-blue-800 to-blue-800 animate-pulse";
    }
    else if (humidity > 60) {
        gradientColor = "from-blue-500 via-blue-600 to-blue-600";
    } else if (humidity < 40) {
        gradientColor = "from-blue-200 via-blue-300 to-blue-300";
    }

    return (
        <div className={cn(
            "flex flex-col items-center gap-2 px-2 py-4 cursor-pointer rounded-xl hover-zoom",
            "bg-gradient-to-r " + gradientColor
        )}>
            <DropletIcon width={120} height={120} color="#6EC2F7" />
            <p className="text-5xl font-bold">{data} %</p>
            <p className="text-lg">Độ Ẩm</p>
        </div>
    );
}

export default Humidity;
