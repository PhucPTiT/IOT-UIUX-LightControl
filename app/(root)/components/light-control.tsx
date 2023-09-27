"use client"
import { Switch } from "@/components/ui/switch";
import {LucideLightbulb } from "lucide-react";
import { useState } from "react";

interface LightControlProps {
    status: boolean,
    onHandle: () => void
}

const LightControl = ({status, onHandle}: LightControlProps) => {
    const [isOn, setIsOn] = useState<boolean>(status)

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
                <LucideLightbulb width={120} height={120} color={status? "Tan" : "gray"}/>
                <Switch checked={status} onClick={onHandle}/>
            </div>
        </div>
    );
}
 
export default LightControl;