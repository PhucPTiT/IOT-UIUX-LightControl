"use client"

import { cn } from "@/lib/utils";
import { ThermometerSnowflakeIcon } from "lucide-react";

interface TemperatureProps {
    data: string,
}

const Temperature = ({ data }: TemperatureProps) => {
    const temperature = +data;

    let gradientColor = "from-blue-300 to-blue-500"; // Default color for temperatures below 0°C

    if (temperature > 0 && temperature <= 30) {
        gradientColor = "from-green-300 via-green-500 to-green-500";
    }
    else if (temperature > 30 && temperature <= 35) {
        gradientColor = "from-green-500 via-green-500 to-green-600";
    }
    else if (temperature > 35 && temperature <= 40) {
        gradientColor = "from-green-500 via-red-500 to-green-500";
    } else if (temperature > 40) {
        gradientColor = "from-red-400 via-orange-500 to-red-500 animate-pulse";
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
