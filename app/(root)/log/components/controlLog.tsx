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

const ControlLog = () => {
    return ( 
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
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>On</TableCell>
              <TableCell>Off</TableCell>
              <TableCell className="text-right">00:00:23</TableCell>
            </TableRow>
          </TableBody>
        </Table>
    );
}
 
export default ControlLog;