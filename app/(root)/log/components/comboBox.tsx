"use client"

import * as React from "react"
import { Check, MoreVertical } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "on",
    label: "on",
  },
  {
    value: "off",
    label: "off",
  }
]

interface ComboboxDemoProps {
  onHandle: (a : "" | "on" | "off") => void;
}

export function ComboboxDemo({onHandle} : ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<"" | "on" | "off">("")
  React.useEffect(() => {onHandle(value)}, [value])
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
          <MoreVertical className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={(currentValue) => {
                  if(currentValue === "on" || currentValue ==="off" || currentValue === "") {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
