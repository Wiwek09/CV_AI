import React from "react";
import SideNavBar from "./components/SideNavBar";
import SearchFields from "./components/SearchFields";
import ToogleView from "./components/ToogleView";
import { ViewProvider } from "../context/ViewContext"

export default function DashboardLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewProvider>
    <div className=" w-full flex space-x-6 ">
      <div className="w-[20%]">
        <SideNavBar />
      </div>
      <div className="w-[80%] flex flex-col space-y-3 ">
        <SearchFields />
        <ToogleView  />
        <div>{children}</div>
      </div>
    </div>
    </ViewProvider>
  );
}
