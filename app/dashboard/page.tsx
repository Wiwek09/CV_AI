"use client";
import React, { useContext } from "react";
import ListView from "@/components/ListView";
import GridView from "@/components/GridView";
import { ViewContext } from "../context/ViewContext";

function Dashboard() {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("Dashboard must be used within a ViewProvider");
  }

  const { view } = context; 
  return (
    <div className="w-full">
      {view === "grid" ? <GridView /> : <ListView />}
    </div>
  );
}

export default Dashboard;
