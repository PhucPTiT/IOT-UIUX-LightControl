import { Switch } from "@/components/ui/switch";
import {LucideLightbulb } from "lucide-react";

const LightControl = () => {
    return (
        <div className="
            px-2 
            py-4
            flex 
            items-center 
            gap-4
            cursor-pointer
            rounded-xl
            bg-primary/10
        ">
            <div className="text-5xl font-bold flex-1 text-center">
                Control Light
            </div>
            <div className="flex flex-col items-center gap-2">
                <LucideLightbulb width={120} height={120} color="pink"/>
                <Switch/>
            </div>
        </div>
    );
}
 
export default LightControl;