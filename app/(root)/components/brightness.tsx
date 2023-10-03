import { cn } from "@/lib/utils";
import { SunDim } from "lucide-react";
interface BrightnessProps {
    data: string,
}

const Brightness = ({data} : BrightnessProps) => {
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
                +data > 1000 
                ? "bg-red-400 animate-pulse" 
                : +data > 500
                ? "bg-orange-400 animate-pulse" 
                : ""
            )}
        >
            <SunDim width={120} height={120} color="#FFFF99"/>
            <p className="text-5xl font-bold">{data} lux</p>
            <p className="text-lg"> Độ Sáng</p>
        </div>
    );
}
 
export default Brightness;
