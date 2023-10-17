"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import axios from "axios";
import { useEffect, useState } from "react";
import { DataItem } from "../../components/chart-control";
import Pagination from "@/components/pagination";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, RefreshCcw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Filter } from "@/components/filter";
import { DateRange } from "react-day-picker";

const DataLog = () => {
    const [reload, setReload] = useState<boolean>(false)
    const [page,setPage] = useState<number>(1);
    const [data, setData] = useState<DataItem[]>([])
    const [totalPage, setTotalPage] = useState<number>(0);
    const [date, setDate] = useState<DateRange | undefined> (undefined);
    const [sortColumn, setSortColumn] = useState<string>("");
    const [sortDirection, setSortDirection] = useState<"asc"|"desc">("asc");

    const handleFilterClick = (datechange: DateRange | undefined) => {
      setDate(datechange)
    }    

    const handleSort = (column: string) => {
      if(sortColumn === column) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortDirection("asc");
      }
    }

    const handleSortedData = (data: DataItem[]) => {
      let sortedData = data;
      if (sortColumn === "temp") {
        sortedData = data.sort((a, b) => {
            if (sortDirection === "asc") {
                return parseFloat(a.temp) - parseFloat(b.temp);
            } else {
                return parseFloat(b.temp) - parseFloat(a.temp);
            }
        });
      } else if (sortColumn === "humidity") {
          sortedData = data.sort((a, b) => {
              if (sortDirection === "asc") {
                  return parseFloat(a.humidity) - parseFloat(b.humidity);
              } else {
                  return parseFloat(b.humidity) - parseFloat(a.humidity);
              }
          });
      } else if (sortColumn === "brightness") {
          sortedData = data.sort((a, b) => {
              if (sortDirection === "asc") {
                  return parseInt(a.brightness, 10) - parseInt(b.brightness, 10);
              } else {
                  return parseInt(b.brightness, 10) - parseInt(a.brightness, 10);
              }
          });
      }
      setData(sortedData);
    }

    useEffect(() => {
      const fetchData = async() => {
        if(!date || !date?.to || !date?.from) {
          try {
            const response = await axios.get(`https://java-iot-be-production.up.railway.app/api/data?page=${page - 1}&size=30`);
            setTotalPage(response?.data.totalPages)
            handleSortedData(response?.data.content)
          } catch(error) {
            console.error(error);
            toast({
              variant: "destructive",
              title: "Something went wrong",
              description: "Error call API get data sensor log",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
            setData([]);
          }
        } else {
          try {
            const sd = new Date(date.from);
            const ed = new Date(date.to);

            const formatSd = `${sd.getFullYear()}-${(sd.getMonth() + 1).toString().padStart(2, '0')}-${sd.getDate().toString().padStart(2, '0')} ${sd.getHours().toString().padStart(2, '0')}:${sd.getMinutes().toString().padStart(2, '0')}:${sd.getSeconds().toString().padStart(2, '0')}.${sd.getMilliseconds().toString().padStart(6, '0')}`; 
            const formatEd = `${ed.getFullYear()}-${(ed.getMonth() + 1).toString().padStart(2, '0')}-${(ed.getDate() + 1).toString().padStart(2, '0')} ${ed.getHours().toString().padStart(2, '0')}:${ed.getMinutes().toString().padStart(2, '0')}:${ed.getSeconds().toString().padStart(2, '0')}.${ed.getMilliseconds().toString().padStart(6, '0')}`; 
            
            const response = await axios.get(`https://java-iot-be-production.up.railway.app/api/data?page=${page - 1}&size=30&sd=${formatSd}&ed=${formatEd}`);
            setTotalPage(response?.data.totalPages)
            handleSortedData(response?.data.content)
          } catch(error) {
            console.error(error);
            toast({
              variant: "destructive",
              title: "Something went wrong",
              description: "Error call API get data sensor log",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
            setData([]);
          }
        }
        
      }

      fetchData();
      return () => {
      
      }
    }, [page, reload, date, sortColumn, sortDirection])

    const handleSwithPage = (pageswitch: number) => {
      setPage(pageswitch);
    }
    return (
        <>
          <Button className="w-10 m-0 p-0 h-8 md:w-24 md:h-10 fixed right-[60px] md:right-20 top-4 md:top-3 z-50 " onClick={() => {setReload(!reload)}}>
            <span className="md:block hidden mr-1">Cập nhật</span>
            <RefreshCcw/>
          </Button>
          <Table className="overflow-x-auto w-full">
            <TableCaption className="text-4xl font-bold">Data Log</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead
                  onClick={() => handleSort("temp")}
                  className="cursor-pointer"
                >
                  <div className="flex flex-row">
                    <p>Temp</p>
                    {sortColumn === "temp" && sortDirection === "asc" && <ChevronUp />}
                    {sortColumn === "temp" && sortDirection === "desc" && <ChevronDown />}
                  </div>
                </TableHead>
                <TableHead
                  onClick={() => handleSort("humidity")}
                  className="cursor-pointer"
                >
                  <div className="flex flex-row">
                    <p>Humidity</p>
                    {sortColumn === "humidity" && sortDirection === "asc" && <ChevronUp />}
                    {sortColumn === "humidity" && sortDirection === "desc" && <ChevronDown />}
                  </div>
                </TableHead>
                <TableHead
                  onClick={() => handleSort("brightness")}
                  className="cursor-pointer"
                >
                  <div className="flex flex-row">
                    <p>Brightness</p>
                    {sortColumn === "brightness" && sortDirection === "asc" && <ChevronUp />}
                    {sortColumn === "brightness" && sortDirection === "desc" && <ChevronDown />}
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
              {
                data.length > 0 ? 
                (
                  <>
                    {data.map((item) => (
                      <TableRow key = {item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell className="whitespace-nowrap">{item.temp} *C</TableCell>
                        <TableCell>{item.humidity} %</TableCell>
                        <TableCell>{item.brightness} lux</TableCell>
                        <TableCell className="text-right">
                          {item.time && format(new Date(item.time), "dd/MM/yyyy HH:mm:ss")}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={5}>
                          <Pagination totalPage={totalPage} handle={handleSwithPage} pageActive = {page}/>
                      </TableCell>
                    </TableRow>
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>Không có dữ liệu</TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </>
    );
}
 
export default DataLog;