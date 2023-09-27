"use client"
import {usePathname, useRouter} from "next/navigation"
import { Database, FileText, Home, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
    {
        icon: Home,
        href: "/",
        label: "Home"
    },
    {
        icon: FileText,
        href: "/log",
        label: "Log"
    },
    {
        icon: Database,
        href: "/data",
        label: "Data",
    },
    {
        icon: UserCircle2,
        href: "/user",
        label: "User",
    },
]

const Sidebar = () => {
    const pathname = usePathname()
    const router = useRouter()
    return (
        <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
            <div className="p-3 flex-1 justify-center">
                <div className="space-y-2">
                {routes.map((route) => (
                        <div key = {route.href}
                            className={cn(
                                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition"
                            , pathname ===route.href && "bg-primary/10 text-primary")}
                            onClick={() => (router.push(route.href))}
                        >
                            <div className="flex flex-col gap-y-2 items-center flex-1">
                                <route.icon className="h-5 w-5"/>
                                {route.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default Sidebar;