import prismadb from "@/lib/prismadb";
import Brightness from "./components/brightness";
import ChatControl from "./components/chart-control";
import FanControl from "./components/fan-control";
import Humidity from "./components/humidity";
import LightControl from "./components/light-control";
import Temperature from "./components/temperature";

export default async function Home() {
    const dataLog = await prismadb.dataLog.findFirst();
    return (
      <div className="flex flex-col w-full px-12 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          <Temperature data = {dataLog?.temp || "0"}/>
          <Humidity data = {dataLog?.humidity || "0"}/>
          <Brightness data = {dataLog?.brightness || "0"}/>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pb-10">
          <div className="lg:col-span-3 col-span-1">
              <ChatControl/>
          </div>
          <div className="flex flex-col gap-4 col-span-1">
              <LightControl/>
              <FanControl/>
          </div>
        </div>
      </div>
    )
}