import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div>
        <div className="" style={{ display: "flex", overflow: "hidden" }}>
          <div className="" style={{ width: open ? "200px" : "100px", marginRight: open ? "40px" : "0px" }}>
            <Sidebar open={open} setOpen={setOpen} />
          </div>
          <div className="flex flex-col w-full ml-10">
            <div className="">
              <Navbar />
            </div>
            <div>
              <Outlet />
            </div>
          </div>

        </div>
      </div>
    </>

  );
};

export default Layout;
