import { DropletIcon } from "lucide-react";

const Humidity = () => {
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
            <DropletIcon width={120} height={120} color="#6EC2F7"/>
            <p className="text-6xl font-bold">57%</p>
            <p className="text-lg"> Độ Ẩm</p>
        </div>
    );
}
 
export default Humidity;