"use client"
import { Switch } from "@/components/ui/switch";
import {LucideLightbulb } from "lucide-react";
import { useState } from "react";

const LightControl = () => {
    const [isOn, setIsOn] = useState<boolean>(false)

    const toggleSwitch = () => {
        setIsOn((prevValue) => !prevValue)
    }

    return (
        <div className="
            flex-1
            px-2 
            py-4
            flex 
            items-center 
            gap-4
            cursor-pointer
            rounded-xl
            bg-primary/10
        ">
            <div className="text-5xl font-bold flex-1 text-center text-[32px] md:text-5xl">
                Control Light
            </div>
            <div className="flex flex-col items-center gap-2">
                <LucideLightbulb width={120} height={120} color={isOn? "pink" : "gray"}/>
                <Switch onClick={toggleSwitch}/>
            </div>
        </div>
    );
}
 
export default LightControl;