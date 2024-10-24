"use client";
import React, { useState, createContext, useContext } from "react";
import SideNavBar from "./components/SideNavBar";
import SearchFields from "./components/SearchFields";
import ToogleView from "./components/ToogleView";
import { ViewProvider } from "./context/ViewContext";
import { IFormInputData } from "@/interfaces/FormInputData";
import { ApiDataProvider } from "./context/ApiDataContext";
import { ViewContext } from "./context/ViewContext";

// export const SearchContext = createContext<{
//   searchData: IFormInputData | null;
// } | null>(null);

export const SearchContext = createContext<{
  listViewSearchData: IFormInputData | null;
  gridViewSearchData: IFormInputData | null;
  setListViewSearchData: React.Dispatch<
    React.SetStateAction<IFormInputData | null>
  >;
  setGridViewSearchData: React.Dispatch<
    React.SetStateAction<IFormInputData | null>
  >;
} | null>(null);

// Create a hook for easy context usage
// export const useSearch = () => {
//   const context = useContext(SearchContext);
//   if (!context) {
//     throw new Error("useSearch must be used within a SearchProvider");
//   }
//   return context;
// };

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // if (!context) {
  //   throw new Error("DashboardLayout must be used within a ViewProvider");
  // }

  const [listViewSearchData, setListViewSearchData] =
    useState<IFormInputData | null>(null);
  const [gridViewSearchData, setGridViewSearchData] =
    useState<IFormInputData | null>(null);

  // const handleSearchSubmit = (formData: IFormInputData) => {
  //   if (view === "list") {
  //     setListViewSearchData(formData);
  //   } else if (view === "grid") {
  //     setGridViewSearchData;
  //     formData;
  //   }
  // };

  // const context = useContext(ViewContext);
  // const { view, setView } = context;
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
