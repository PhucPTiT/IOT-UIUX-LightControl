import { cn } from "@/lib/utils";
import { SunDim } from "lucide-react";

interface BrightnessProps {
    data: string,
}

const Brightness = ({ data }: BrightnessProps) => {
    const brightness = +data;

    let gradientColor = "from-gray-400 to-yellow-400"; // Default color for brightness >= 50 lux
    let gradientVia = ""; // Default, no "via" color

    if (brightness > 200) {
        gradientColor = "from-yellow-400 to-orange-400 animate-pulse";
    } else if (brightness > 50) {
        gradientColor = "from-yellow-400 via-yellow-400 to-orange-300";
        gradientVia = "via-yellow-400";
    }

    return (
        <div className={cn(
            "flex flex-col items-center gap-2 px-2 py-4 cursor-pointer rounded-xl hover-zoom",
            "bg-gradient-to-r " + gradientColor + " " + gradientVia
        )}>
            <SunDim width={120} height={120} color="#FFFF99" />
            <p className="text-5xl font-bold">{data} lux</p>
            <p className="text-lg">Độ Sáng</p>
        </div>
    );
}

export default Brightness;
