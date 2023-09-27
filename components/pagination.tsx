import { cn } from "@/lib/utils";
import { ChevronLeftSquare, ChevronRightSquare } from "lucide-react";

interface PaginationProps {
    totalPage: number;
    pageActive: number;
    handle: (x:number) => void;
}


const Pagination = ({totalPage, pageActive, handle}: PaginationProps) => {
    return ( 
        <nav className="flex w-full justify-center mt-4">
            <ul className="flex flex-row gap-1 items-center">
                {pageActive > 1 && <li><ChevronLeftSquare size={16} onClick={() => {handle(pageActive - 1)}}/></li>}
                {
                [...Array(totalPage)].map((_, i) => {
                    return (
                    <li key={i + 1} className={cn("bg-primary/40 text-muted text-sm text-center w-5 h-5 rounded", pageActive === i + 1 && "bg-primary")} onClick={() => handle(i + 1)}>
                        {i + 1}
                    </li>)
                })
                }
                {pageActive < totalPage && <li><ChevronRightSquare size={16} onClick={() => {handle(pageActive + 1)}}/></li> }
            </ul>
        </nav>
    );
}
 
export default Pagination;