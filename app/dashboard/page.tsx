import React from "react";
import SideNavBar from "./components/SideNavBar";
import SearchFields from "./components/searchFields";

function Dashboard() {
  return (
    <div className="flex p-4">
      <SideNavBar />
      <SearchFields />
    </div>
  );
}

export default Dashboard;
