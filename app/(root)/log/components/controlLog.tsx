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
import { ChevronDown, CloudCog } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { Filter } from "@/components/filter";
import { DateRange } from "react-day-picker";
import { ComboboxDemo } from "./comboBox";
import Loading from "@/components/loading";
import Context from "@/components/context";
import PopupDelete from "./popupDelete";

export interface ControlLogItem {
  id: number;
  device: string;
  status: boolean;
  time: string;
}

const ControlLog = () => {
  const [controlLog, setControlLog] = useState<ControlLogItem[]>([]);
  const [displayedLog, setDisplayedLog] = useState<ControlLogItem[]>([]);
  const [filterLog, setFilterLog] = useState<ControlLogItem[]>([])
  const [date, setDate] = useState<DateRange | undefined> (undefined);
  const [status, setStatus] = useState<string> ("");
  const [device, setDevice] = useState<string> ("");
  const [isLoading, setIsLoading] = useState(true); 
  const initialContextMenu = {
    show: false,
    x: 0,
    y: 0,
    item: {}
  }
  const [contextMenu, setContextMenu]= useState(initialContextMenu);
  const [rowDelete, setRowDelete] = useState<ControlLogItem | {}>({})
  const itemsPerPage = 5;
  const frameworksDevice = [
    {
      value: "light",
      label:  "light"
    },
    {
      value: "fan",
      label: "fan",
    }
  ]
  const frameworksStatus = [
    {
      value: "on",
      label:  "on"
    },
    {
      value: "off",
      label: "off",
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setIsLoading(true);
        const response = await axios.get("http://localhost:5000/api/controllog");
        setControlLog(response.data);
        setDisplayedLog(response.data.slice(0, 5))
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Error get data control log",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setControlLog([]);
      }
    };

    fetchData();
    return () => {
      
    }
  }, [rowDelete]);


  const handleShowMoreClick = () => {
    setDisplayedLog(filterLog.slice(0,  displayedLog.length + itemsPerPage));
  };

  const handleFilterClick = (datechange: DateRange | undefined) => {
    setDate(datechange)
  }

  const handleDeviceChange = (status: string) => {
    setDevice(status)
  }

  const handleStatusChange = (status: string) =>  {
    setStatus(status)
  }
  
  const isLogWithinDateRange = (log: ControlLogItem) => {
    const logTime = new Date(log.time);
    
    // Kiểm tra nếu ngày không được chỉ định hoặc ngày không hợp lệ
    if (!date || !date.from || !date.to) {
      return (
        (device === "" || log.device === device) &&
        (status === "" || log.status === (status === "on"))
      );
    }
  
    const startDate = new Date(date.from);
    const endDate = new Date(date.to);
  
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
  
    if (startDate.getTime() === endDate.getTime()) {
      return (
        logTime >= startDate &&
        logTime <= new Date(endDate.setDate(endDay + 1)) &&
        (device === "" || log.device === device) &&
        (status === "" || log.status === (status === "on"))
      );
    }
  
    return (
      logTime >= startDate &&
      logTime < new Date(endDate.setDate(endDay + 1)) &&
      (device === "" || log.device === device) &&
      (status === "" || log.status === (status === "on"))
    );
  }
  
  useEffect(() => {
    setFilterLog(controlLog.filter((item) => isLogWithinDateRange(item)));
    setDisplayedLog(controlLog.filter((item) => isLogWithinDateRange(item)).slice(0, 5))
  }, [date, controlLog, device, status])

  const handleTableRowContextMenu = (item: ControlLogItem) => (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    e.preventDefault();
    const { pageX, pageY } = e;
    setContextMenu({ show: true, x: pageX, y: pageY, item: item});
  };
  const contextMenuClose = () => setContextMenu(initialContextMenu)

  const handlePopupDelete = (controlLog: ControlLogItem | {}) => {
    setRowDelete(controlLog)
  }
  return (
    <div className="h-full">
      {'id' in rowDelete && <PopupDelete data = {rowDelete} onHandle={handlePopupDelete}/>}
      {contextMenu.show && <Context onDelete={handlePopupDelete} item={contextMenu.item} x = {contextMenu.x} y = {contextMenu.y} closeContextMenu={contextMenuClose}/>}
      {isLoading ? 
        <Loading/>
      :
        <>
          <Table>
            <TableCaption className="text-4xl font-bold">Control Log</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <p>Device</p>
                    <ComboboxDemo frameworks={frameworksDevice} onHandle={handleDeviceChange}/>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <p>Status</p>
                    <ComboboxDemo frameworks={frameworksStatus} onHandle={handleStatusChange}/>
                  </div>
                </TableHead>
                <TableHead className="text-right">
                  <div className="flex justify-end items-center gap-1">
                    <span className="">Time</span>
                    <Filter onHandle={handleFilterClick}/>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedLog.length > 0 ? (
                displayedLog.map((item) => (
                  <TableRow onContextMenu={handleTableRowContextMenu(item)}  key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.device}</TableCell>
                    <TableCell>{item.status ? "On" : "Off"}</TableCell>
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
              {filterLog.length > displayedLog.length && (
                <button onClick={handleShowMoreClick} className="flex flex-row  hover:text-gray-300">
                  <span>Xem thêm</span>
                  <ChevronDown />
                </button>
              )}
            </div>
        </>
      }
    </div>
  );
};

export default ControlLog;
