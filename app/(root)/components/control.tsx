"use client"
import { useEffect, useState } from "react";
import FanControl from "./fan-control";
import LightControl from "./light-control";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { DataLog } from "./data";
interface ControlData {
    id: number;
    device: string;
    status: boolean;
    time: string;
}

const Control = () => {
    const [dataLog, setDataLog] = useState<DataLog>({
        temp: "0",
        humidity: "0",
        brightness: "0",
        dust: "0",
    }) ;

    return ( 
        <>
            <LightControl dust = {dataLog.dust}/>
            <FanControl dust = {dataLog.dust}/>
        </>
    );
}
 
export default Control;