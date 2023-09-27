"use client"
import { useEffect, useState } from "react";
import FanControl from "./fan-control";
import LightControl from "./light-control";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
interface ControlData {
    id: number;
    lightStatus: boolean;
    fanStatus: boolean;
    time: string;
}

const Control = () => {
    const router = useRouter();
    const [control, setControl] = useState<ControlData>()
    const [lightStatus, setLightStatus] = useState<boolean>(control?.lightStatus ?? false);
    const [fanStatus, setFanStatus] = useState<boolean>(control?.fanStatus ?? false);
    
    useEffect(() => {
        const fetchData = async() =>  {
            const response = await axios.get("http://localhost:8081/api/controllog/first")
            const data = response.data;
            setControl(data)
            setLightStatus(data?.lightStatus || false);
            setFanStatus(data?.fanStatus || false);
        }
        fetchData();
    }, [])

    const handleClickToggleLight = async() => {
        setLightStatus((prevValue) => !prevValue)
        // call api patch 
        try{
            const values : object = {
                lightStatus: !lightStatus,
                fanStatus: fanStatus,
            }
            await axios.post("http://localhost:8081/api/controllog", values)
            toast({
                description: "Success."
            })
            // router.refresh();
            // router.push("/");
        } catch(error) {
            console.error(error)
            toast({
                variant: "destructive",
                description: "Something went wrong",
            })
        }
    }

    const handleCLickToggleFan = async() => {
        setFanStatus((prevValue) => !prevValue)
        try{
            const values : object = {
                lightStatus: lightStatus,
                fanStatus: !fanStatus,
            }
            await axios.post("http://localhost:8081/api/controllog", values)
            toast({
                description: "Success."
            })
            // router.refresh();
            // router.push("/");
        } catch(error) {
            console.error(error)
            toast({
                variant: "destructive",
                description: "Something went wrong",
            })
        }
    } 

    return ( 
        <>
            <LightControl status = {lightStatus} onHandle = {handleClickToggleLight}/>
            <FanControl status = {fanStatus} onHandle = {handleCLickToggleFan}/>
        </>
    );
}
 
export default Control;