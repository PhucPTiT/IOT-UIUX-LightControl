"use client"
import { Switch } from "@/components/ui/switch";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import {LucideLightbulb } from "lucide-react";
import { useEffect, useState } from "react";


const LightControl = () => {
    const [isOn, setIsOn] = useState<boolean>(false)

    
    // lấy giá trị lúc mount lại
    useEffect(() => {
        const fetchData = async() =>  {
            try {
                const response = await axios.get("http://localhost:5000/api/controllog/first/light")
                const data = response.data;
                setIsOn(data?.status ||false)
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Something went wrong",
                    description: "Error call api control first status light"
                })
            }
            
        }
        fetchData();
        return () => {
        
        }
    }, [])
    // cập nhật thời gian bật tắt thiết bị
    const handleCLickToggleLight = async() => {
        setIsOn((prevValue) => !prevValue)
        try{
            const values : object = {
                device: "light",
                status: !isOn,
            }
            await axios.post("http://localhost:5000/api/controllog", values)
            toast({
                description: "Success."
            })
        } catch(error) {
            console.error(error)
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: "Error call api control Light",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    } 

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
                <LucideLightbulb width={120} height={120} color={isOn? "Tan" : "gray"}/>
                <Switch checked={isOn} onClick={handleCLickToggleLight}/>
            </div>
        </div>
    );
}
 
export default LightControl;