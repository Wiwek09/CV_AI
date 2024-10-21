"use client";
import React, { useState, createContext, useContext } from "react";
import SideNavBar from "./components/SideNavBar";
import SearchFields from "./components/SearchFields";
import ToogleView from "./components/ToogleView";
import { ViewProvider } from "./context/ViewContext";
import { IFormInputData } from "@/interfaces/FormInputData";
import { ApiDataProvider } from "./context/ApiDataContext";

export const SearchContext = createContext<{
  searchData: IFormInputData | null;
  // setSearchData: (data: IFormInputData) => void;
} | null>(null);

// Create a hook for easy context usage
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchData, setSearchData] = useState<IFormInputData | null>(null);

  const handleSearchSubmit = (formData: any) => {
    setSearchData(formData);
  };
  return (
    <SearchContext.Provider value={{ searchData }}>
      <ApiDataProvider>
        <ViewProvider>
          <div className=" w-full flex space-x-6 ">
            <div className="w-[20%]">
              <SideNavBar />
            </div>
            <div className="w-[80%] flex flex-col space-y-3 ">
              <SearchFields onSubmit={handleSearchSubmit} />
              <ToogleView />
              <div>{children}</div>
            </div>
          </div>
        </ViewProvider>
      </ApiDataProvider>
    </SearchContext.Provider>
  );
}
