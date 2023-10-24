import NavBar from "@/components/navbar";
import  Sidebar  from "@/components/sidebar";

const RootLayout = (
    {children} : {children: React.ReactNode}
) => {
    return ( 
        <div className="h-full">
            <NavBar/>
            <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
                <Sidebar/>
            </div>
            <main className="pt-16 h-full md:pl-20">
                <div className="flex h-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
 
export default RootLayout;