
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen">
      <div className="h-[90%] flex">
        <Sidebar />
        <div
          className="w-full m-2 px-6 pt-4 rounded bg-[#121212] 
                      text-white overflow-auto lg:w-[75%] lg:ml-0"
        >
          <Navbar />
          {children}
        </div>
      </div>
      <Player />
    </div>
  );
};

export default Layout;
