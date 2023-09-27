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
import { RefreshCcw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const DataLog = () => {
    const [reload, setReload] = useState<boolean>(false)
    const [page,setPage] = useState<number>(1);
    const [data, setData] = useState<DataItem[]>([])
    const [totalPage, setTotalPage] = useState<number>(0);

    useEffect(() => {
      const fetchData = async() => {
        try {
          const response = await axios.get(`http://localhost:8081/api/data?page=${page - 1}&size=30`);
          setTotalPage(response?.data.totalPages)
          setData(response?.data.content)
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

      fetchData();
      return () => {
      
      }
    }, [page, reload])

    const handleSwithPage = (pageswitch: number) => {
      setPage(pageswitch);
    }
    console.log(data)
    return (
        <>
          <Button className="fixed right-20 top-3 z-50" onClick={() => {setReload(!reload)}}>
            <span className="mr-1">Cập nhật</span>
            <RefreshCcw/>
          </Button>
          <Table className="overflow-x-auto w-full">
            <TableCaption className="text-4xl font-bold">Data Log</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Temp</TableHead>
                <TableHead>Humidity</TableHead>
                <TableHead>Brightness</TableHead>
                <TableHead className="text-right">Time</TableHead>
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
                        <TableCell>{item.brightness}K lux</TableCell>
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