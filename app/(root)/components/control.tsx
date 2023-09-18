"use client"
import { useState } from "react";
import FanControl from "./fan-control";
import LightControl from "./light-control";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Control = () => {
    const router = useRouter();
    const [lightStatus, setLightStatus] = useState<boolean>(false)
    const [fanStatus, setFanStatus] = useState<boolean>(false)

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
            router.refresh();
            router.push("/");
        } catch(error) {
            console.error(error)
            toast({
                variant: "destructive",
                description: "Something went wrong",
            })
        }
    }

    const handleCLickToggleFan = () => {
        setFanStatus((prevValue) => !prevValue)
        console.log(lightStatus, !fanStatus)

        // call api patch
    } 

    return ( 
        <>
            <LightControl status = {lightStatus} onHandle = {handleClickToggleLight}/>
            <FanControl status = {fanStatus} onHandle = {handleCLickToggleFan}/>
        </>
    );
}
 
export default Control;