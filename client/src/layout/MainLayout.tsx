import Navbar from "@/components/home/Navbar";
import Sidebar from "@/components/home/Sidebar";
import { useRedirect } from "@/hooks/useRedirect.ts";
import Cookies from "js-cookie";

import  { useEffect, useState} from "react";
import { Outlet } from "react-router-dom";



const MainLayout = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen((v) => !v);
  const handleClose = () => setIsOpen(false);
  const {redirect}=useRedirect()

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);


  useEffect(()=>{
    const token=Cookies.get("token")
    if (!token) redirect("/login")
  },[])



  return (
    <div className="relative md:h-screen flex flex-col bg-linear-to-r from-purple-50 to-indigo-50">
      {/* Top nav (mobile + desktop) */}
      <Navbar handleClick={handleClick} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden md:block md:w-72 md:flex-shrink-0 border-r bg-white">
          <Sidebar/>
        </div>

        {/* Mobile drawer */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <button
              aria-label="Close menu"
              onClick={handleClose}               
              className="fixed inset-0 z-30 bg-black/30 backdrop-blur-[1px] md:hidden"
            />
            {/* Drawer panel */}
            <div
              role="dialog"
              aria-modal="true"
               className={` fixed inset-y-0 left-0 z-40 w-72 bg-white border-r shadow-xl md:hidden
    transform transition-transform duration-700 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
              <Sidebar/>
            </div>
          </>
        )}

        {/* Main content */}
        <main className="flex-1  h-full overflow-y-auto">

          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
