"use client"

import { cn } from "@/lib/utils";
import { ThermometerSnowflakeIcon } from "lucide-react";

interface TemperatureProps {
    data: string,
}

const Temperature = ({ data }: TemperatureProps) => {
    const temperature = +data;

    let gradientColor = "from-indigo-500 to-indigo-500"; // Default color for temperatures below 0°C

    if (temperature > 0 && temperature <= 30) {
        gradientColor = "from-blue-500 via-purple-500 to-pink-500";
    } else if (temperature > 30 && temperature <= 40) {
        gradientColor = "from-blue-500 via-yellow-500 to-red-500";
    } else if (temperature > 40) {
        gradientColor = "from-red-500 via-orange-500 to-yellow-500";
    }

    return (
        <div className={cn(
            "flex flex-col items-center gap-2 px-2 py-4 cursor-pointer rounded-xl hover-zoom",
            "bg-gradient-to-r " + gradientColor
        )}
        >
            <ThermometerSnowflakeIcon width={120} height={120} color="green" />
            <p className="text-5xl font-bold">{data} °C</p>
            <p className="text-lg">Nhiệt độ</p>
        </div>
    );
}

export default Temperature;
