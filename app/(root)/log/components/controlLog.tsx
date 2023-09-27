"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";

interface ControlLogItem {
  id: number;
  lightStatus: boolean;
  fanStatus: boolean;
  time: string;
}

const ControlLog = () => {
  const [controlLog, setControlLog] = useState<ControlLogItem[]>([]);
  const [displayedLog, setDisplayedLog] = useState<ControlLogItem[]>([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/controllog");
        setControlLog(response.data);
        setDisplayedLog(response.data.slice(0, 5))
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          description: "Something went wrong",
        });
        setControlLog([]);
      }
    };

    fetchData();
  }, []);


  const handleShowMoreClick = () => {
    setDisplayedLog(controlLog.slice(0,  displayedLog.length + itemsPerPage));
  };
  return (
    <div>
      <Table>
        <TableCaption className="text-4xl font-bold">Control Log</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Light</TableHead>
            <TableHead>Fan</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedLog.length > 0 ? (
            displayedLog.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.lightStatus ? "On" : "Off"}</TableCell>
                <TableCell>{item.fanStatus ? "On" : "Off"}</TableCell>
                <TableCell className="text-right">
                  {format(new Date(item.time), "dd/MM/yyyy HH:mm:ss")}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>Không có dữ liệu</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
        <div className="w-full flex justify-center mt-1 text-gray-400">
          {controlLog.length > displayedLog.length && (
            <button onClick={handleShowMoreClick} className="flex flex-row  hover:text-gray-300">
              <span>Xem thêm</span>
              <ChevronDown />
            </button>
          )}
        </div>
    </div>
  );
};

export default ControlLog;
