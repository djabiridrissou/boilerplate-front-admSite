import { useState, useEffect } from "react";
import Register from "../auth/Register";
import Users from "./Users";

const IndexUser = () => {
  const storedActiveTab = localStorage.getItem("activeTabUsers");
  const initialActiveTab = storedActiveTab
    ? JSON.parse(storedActiveTab)
    : "usersList";
  const [activeTab, setActiveTab] = useState<string>(initialActiveTab);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    localStorage.setItem("activeTabUsers", JSON.stringify(activeTab));
  }, [activeTab]);

  return (
    <>
      <section className=" shadow-sm">
        <div className="flex gap-8">
          <button
            className={`border-b-2 ${activeTab === "usersList" ? "border-b-[#303e8a]" : ""
              } hover:bg-gray-400 hover:font-medium transition-all duration-600`}
            onClick={() => handleTabClick("usersList")}
          >
           <span className={`text-[#303e8a] ${activeTab === "usersList" ? "text-[14px]" : "text-[12px]"}`}>Users List</span> 
          </button>
          <button
            className={`border-b-2 ${activeTab === "addUsers" ? "border-b-[#303e8a]" : ""
              } hover:bg-gray-400 hover:font-medium transition-all duration-600`}
            onClick={() => handleTabClick("addUsers")}
          >
           <span className={`text-[#303e8a] ${activeTab === "addUsers" ? "text-[14px]" : "text-[12px]"}`}>Add Users</span> 
          </button>
        </div>
      </section>
      {activeTab === "usersList" && <Users />}
      {activeTab === "addUsers" && <Register />}
    </>
  );
};

export default IndexUser;
