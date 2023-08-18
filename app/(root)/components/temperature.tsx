import {ThermometerSnowflakeIcon } from "lucide-react";

const Temperature = () => {
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
            <ThermometerSnowflakeIcon width={120} height={120} color="green"/>
            <p className="text-6xl font-bold">60 *C</p>
            <p className="text-lg"> Nhiệt độ</p>
        </div>
    );
}
 
export default Temperature;