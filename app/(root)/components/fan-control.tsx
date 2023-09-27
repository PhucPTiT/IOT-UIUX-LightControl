"use client"
import { Switch } from "@/components/ui/switch";
import { Fan } from "lucide-react";
import { useState } from "react";

interface FanControlProps {
    status: boolean,
    onHandle: () => void
}

const FanControl = ({status, onHandle}:FanControlProps) => {
    // const [isOn, setIsOn] = useState<boolean>(status)

    // const toggleSwitch = () => {
    //     setIsOn((prevValue) => !prevValue)
    // }
    return (
        <div className="
            flex-1
            px-2 
            py-4
            flex 
            items-center 
            justify-center
            gap-4
            cursor-pointer
            rounded-xl
            bg-primary/10
        ">
            <div className="flex flex-col items-center gap-2">
                <Fan width={120} height={120} color={status ? "Salmon" : "gray"} className={status ? "fan-rotating" : ""}/>
                <Switch checked={status} onClick={onHandle}/>
            </div>
        </div>
    );
}
 
export default FanControl;