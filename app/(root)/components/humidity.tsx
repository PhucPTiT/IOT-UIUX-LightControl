"use client"

import { cn } from "@/lib/utils";
import { DropletIcon } from "lucide-react";

interface HumidityProps {
    data: string,
}

const Humidity = ({ data }: HumidityProps) => {
    const humidity = +data;

    let gradientColor = "from-indigo-500 to-indigo-500"; // Default color for humidity >= 0%

    if (humidity > 60) {
        gradientColor = "from-blue-500 via-purple-500 to-pink-500";
    } else if (humidity < 40) {
        gradientColor = "from-blue-500 via-yellow-500 to-red-500";
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
