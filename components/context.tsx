import { DataItem } from "@/app/(root)/components/chart-control";
import { useOnClickOutside } from "@/app/hooks/useOnClickOutside";
import { Pencil, Trash2 } from "lucide-react";
import { useRef } from "react";

interface ContextProps {
    onDelete?: (a : DataItem | {}) => void;
    onUpdate?: () => void;
    x: number;
    y: number;
    closeContextMenu: () => void
    item: DataItem | {};
}

const Context = ({onDelete, onUpdate, x, y, closeContextMenu, item} : ContextProps) => {
    const contextMenuRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(contextMenuRef, closeContextMenu)
    return ( 
        <div 
            ref = {contextMenuRef} 
            onClick={() => closeContextMenu()}
            style={{top: `${y}px`, left: `${x}px`}} className="px-1 py-1 text-primary-foreground bg-primary absolute z-20 rounded-sm">
            <div className="px-2 py-1 flex w-40 justify-between border-b  hover:bg-primary-foreground/10 cursor-pointer mb-1 rounded-sm"
                onClick={() => 'id' in item && onDelete && onDelete(item)}
            >
                <span>Delete</span>
                <Trash2/>
            </div>
            {/* <div className="px-2 py-1 flex w-40 justify-between hover:bg-primary-foreground/10 cursor-pointer rounded-sm" onClick={onUpdate}>
                <span>Update</span>
                <Pencil/>
            </div> */}
        </div>
    );
}
 
export default Context;