"use client";
import React, { useState, createContext, useContext } from "react";
import SideNavBar from "./components/SideNavBar";
import SearchFields from "./components/SearchFields";
import ToogleView from "./components/ToogleView";
import { ViewProvider } from "./context/ViewContext";
import { IFormInputData } from "@/interfaces/FormInputData";
import { ApiDataProvider } from "./context/ApiDataContext";

export const SearchContext = createContext<{
  listViewSearchData: IFormInputData | null;
  gridViewSearchData: IFormInputData | null;
  setListViewSearchData: React.Dispatch<React.SetStateAction<IFormInputData | null>>;
  setGridViewSearchData: React.Dispatch<React.SetStateAction<IFormInputData | null >>;
} | null >(null);


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [listViewSearchData, setListViewSearchData] =
    useState<IFormInputData | null>(null);
  const [gridViewSearchData, setGridViewSearchData] =
    useState<IFormInputData | null>(null);

  return (
    <ViewProvider>
      <SearchContext.Provider
        value={{
          listViewSearchData,
          gridViewSearchData,
          setListViewSearchData,
          setGridViewSearchData,
        }}
      >
        <ApiDataProvider>
          <div className=" w-full flex space-x-6 ">
            <div className="w-[20%]">
              <SideNavBar />
            </div>
            <div className="w-[80%] flex flex-col space-y-3 ">
              <SearchFields />
              <ToogleView />
              <div>{children}</div>
            </div>
          </div>
        </ApiDataProvider>
      </SearchContext.Provider>
    </ViewProvider>
  );
}
