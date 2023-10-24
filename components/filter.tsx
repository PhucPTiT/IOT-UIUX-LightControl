"use client"

import * as React from "react"
import { FilterIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect } from "react"

export interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {
  onHandle: (datechange: DateRange | undefined) => void;
}

export function Filter({ onHandle,className, ...props }: FilterProps) {
  const [date, setDate] = React.useState<DateRange | undefined>()
  useEffect(()=> {
    onHandle(date)}
  , [date])
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
            <FilterIcon className={date && "text-primary"} />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
      
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

