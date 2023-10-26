import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
interface SearchProps {
    onSearch: (a:string) => void
}
const Search = ({onSearch} : SearchProps) => {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query:string = e.target.value;
        setSearchQuery(query);
    }
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const result = searchQuery.toLowerCase();
            onSearch(result);
        }, 500)
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery])

    return ( 
        <div className="flex flex-row bg-primary/10 p-1 w-full md:w-[fit-content] rounded-md gap-1">
            <input type="text" id="search" name="search" className="outline-none w-full md:w-auto border-none rounded text-sm" placeholder="Nhập vào đây để tìm kiếm..." 
                onChange={handleInputChange}
            />
            <label htmlFor="search">
                <SearchIcon/>
            </label>
        </div>
    );
}
 
export default Search;