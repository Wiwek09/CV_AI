import React from "react";
import SideNavBar from "./components/SideNavBar";
import SearchFields from "./components/SearchFields";
import ToogleView from "./components/ToogleView";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" w-full flex space-x-6 p-4 ">
      <div className="w-[20%]">
        <SideNavBar />
      </div>
      <div className="w-[80%] flex flex-col space-y-3 ">
        <SearchFields/>
        <ToogleView/>
        <div>{children}</div>
      </div>
    </div>
  );
}
