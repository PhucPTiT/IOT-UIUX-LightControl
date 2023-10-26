"use client"
import { useEffect, useState } from "react";
import FanControl from "./fan-control";
import LightControl from "./light-control";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@radix-ui/react-toast";
interface ControlData {
    id: number;
    device: string;
    status: boolean;
    time: string;
}

const Control = () => {
    // const router = useRouter();
    // const [control, setControl] = useState<ControlData>()
    // const [lightStatus, setLightStatus] = useState<boolean>(false);
    // const [fanStatus, setFanStatus] = useState<boolean>(false);
    
    // useEffect(() => {
    //     const fetchData = async() =>  {
    //         try {
    //             const response = await axios.get("http://localhost:5000/api/controllog/first")
    //             const data = response.data;
    //             setControl(data)
    //             setLightStatus(data?.lightStatus || false);
    //             setFanStatus(data?.fanStatus || false);
    //         } catch (error) {
    //             toast({
    //                 variant: "destructive",
    //                 title: "Something went wrong",
    //                 description: "Error call api control first status"
    //             })
    //         }
            
    //     }
    //     fetchData();
    //     return () => {
      
    //     }
    // }, [])

    // const handleClickToggleLight = async() => {
    //     setLightStatus((prevValue) => !prevValue)
    //     try{
    //         const values : object = {
    //             lightStatus: !lightStatus,
    //             fanStatus: fanStatus,
    //         }
    //         await axios.post("http://localhost:5000/api/controllog", values)
    //         toast({
    //             description: "Success."
    //         })
    //     } catch(error) {
    //         console.error(error)
    //         toast({
    //             variant: "destructive",
    //             title: "Something went wrong",
    //             description: "Error call api control light"
    //         })
    //     }
    // }

    // const handleCLickToggleFan = async() => {
    //     setFanStatus((prevValue) => !prevValue)
    //     try{
    //         const values : object = {
    //             lightStatus: lightStatus,
    //             fanStatus: !fanStatus,
    //         }
    //         await axios.post("http://localhost:5000/api/controllog", values)
    //         toast({
    //             description: "Success."
    //         })
    //     } catch(error) {
    //         console.error(error)
    //         toast({
    //             variant: "destructive",
    //             title: "Something went wrong",
    //             description: "Error call api control fan",
    //             action: <ToastAction altText="Try again">Try again</ToastAction>,
    //         })
    //     }
    // } 

    return ( 
        <>
            <LightControl/>
            <FanControl/>
        </>
    );
}
 
export default Control;