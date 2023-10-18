import { ChevronLeftSquare, ChevronRightSquare, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
    totalPage: number;
    pageActive: number;
    handle: (x:number) => void;
}


const Pagination = ({totalPage, pageActive, handle}: PaginationProps) => {
    return ( 
        <nav className="flex w-full justify-center mt-4">
            <ChevronsLeft className="mr-2" onClick={() => handle(1)}/>
            <ul className="flex flex-row gap-1 items-center">
                {pageActive > 1 && <li><ChevronLeftSquare size={16} onClick={() => {handle(pageActive - 1)}}/></li>}
                <li className="bg-primary text-muted text-sm text-center w-5 h-5 rounded">{pageActive}</li>
                /
                <li className="bg-primary text-muted text-sm text-center w-5 h-5 rounded">{totalPage}</li>
                {pageActive < totalPage && <li><ChevronRightSquare size={16} onClick={() => {handle(pageActive + 1)}}/></li> }
            </ul>
            <ChevronsRight className="ml-2" onClick={() => handle(totalPage)} />
        </nav>
    );
}
 
export default Pagination;