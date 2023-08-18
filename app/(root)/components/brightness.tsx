import { SunDim } from "lucide-react";

const Brightness = () => {
    return (
        <div className="
            flex 
            flex-col 
            items-center 
            gap-2 
            bg-primary/10 
            px-2 
            py-4 
            cursor-pointer
            rounded-xl
        ">
            <SunDim width={120} height={120} color="#FFFF99"/>
            <p className="text-6xl font-bold">100 lux</p>
            <p className="text-lg"> Độ Sáng</p>
        </div>
    );
}
 
export default Brightness;