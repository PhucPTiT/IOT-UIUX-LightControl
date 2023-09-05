import ControlLog from "./components/controlLog";
import DataLog from "./components/dataLog";

const Log = () => {
    return ( 
        <div className="flex flex-col w-full px-4 md:px-12 py-8">
            <DataLog/>
            <ControlLog/>
        </div>
    );
}
 
export default Log;