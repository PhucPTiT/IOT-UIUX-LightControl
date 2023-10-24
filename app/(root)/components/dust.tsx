"use client"

import { cn } from "@/lib/utils";
import { TreeDeciduous } from "lucide-react";

interface DustProps {
    data: string;
}

const Dust = ({data} : DustProps) => {
    let gradientColor = "from-gray-400 via-gray-400 to-gray-500"; 
    if(+data > 80) {
        gradientColor = "from-gray-600 via-gray-800 to-gray-800 animate-pulse";
    }
    else if (+data > 60) {
        gradientColor = "from-gray-500 via-gray-600 to-gray-600";
    } else if (+data < 40) {
        gradientColor = "from-gray-200 via-gray-300 to-gray-300";
    }

    return (
        <div className={cn(
            "flex flex-col items-center gap-2 px-2 py-4 cursor-pointer rounded-xl hover-zoom",
            "bg-gradient-to-r " + gradientColor
        )}>
            <TreeDeciduous width={120} height={120} color="#6EC2F7" />
            <p className="text-5xl font-bold">{data} %</p>
            <p className="text-lg">Độ Bụi</p>
        </div>
    );
}

export default Dust;
