import { Filter } from "@/components/filter";
import ChatControl from "./components/chart-control";
import Control from "./components/control";
import Data from "./components/data";

export default async function Home() {
    
    return (
      <div className="flex flex-col w-full px-12 py-8">
        <Data/>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pb-10">
          <div className="lg:col-span-3 col-span-1">
              <ChatControl/>
          </div>
          <div className="flex flex-col gap-4 col-span-1">
              <Control/>
          </div>
        </div>
      </div>
    )
}