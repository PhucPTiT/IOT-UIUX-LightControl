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

const DataLog = () => {
    return (
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
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell className="whitespace-nowrap">30 *C</TableCell>
              <TableCell>45%</TableCell>
              <TableCell>1220 lux</TableCell>
              <TableCell className="text-right">00:00:12</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell className="whitespace-nowrap">30 *C</TableCell>
              <TableCell>45%</TableCell>
              <TableCell>1220 lux</TableCell>
              <TableCell className="text-right">00:00:12</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell className="whitespace-nowrap">30 *C</TableCell>
              <TableCell>45%</TableCell>
              <TableCell>1220 lux</TableCell>
              <TableCell className="text-right">00:00:12</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell className="whitespace-nowrap">30 *C</TableCell>
              <TableCell>45%</TableCell>
              <TableCell>1220 lux</TableCell>
              <TableCell className="text-right">00:00:12</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell className="whitespace-nowrap">30 *C</TableCell>
              <TableCell>45%</TableCell>
              <TableCell>1220 lux</TableCell>
              <TableCell className="text-right">00:00:12</TableCell>
            </TableRow>          
          </TableBody>
        </Table>
    );
}
 
export default DataLog;