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

interface FrameworkItem {
  value: string;
  label: string;
}

interface ComboboxDemoProps {
  onHandle: (a : string) => void;
  frameworks: FrameworkItem[];
}

export function ComboboxDemo({onHandle, frameworks} : ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string>("")
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
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
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
