"use client";
import React, { useContext } from "react";
import ListView from "@/components/ListView";
import GridView from "@/components/GridView";
import { ViewContext } from "./context/ViewContext";
import { ApiDataContext } from "./context/ApiDataContext";
import { SearchContext } from "./layout";

function Dashboard() {
  const apiContext = useContext(ApiDataContext);
  const apiData = apiContext?.apiData ?? [];
  // const setApiData = apiContext?.setApiData;

  const searchContext = useContext(SearchContext);

  console.log("UseApiContext", apiData);

  if (!searchContext) {
    throw new Error("Error occured");
  }

  const { listViewSearchData, gridViewSearchData } = searchContext;

  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("Dashboard must be used within a ViewProvider");
  }

  const { view } = context;
  return (
    <div className="w-full py-2 pb-6">
      {view === "grid" ? (
        <GridView searchData={gridViewSearchData} />
      ) : (
        <ListView searchData={listViewSearchData} data={apiData} />
      )}
    </div>
  );
}

export default Dashboard;
