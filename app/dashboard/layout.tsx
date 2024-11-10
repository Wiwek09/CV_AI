import SideNavBar from "./components/SideNavBar";
import SearchFields from "./components/SearchFields";
import ToogleView from "./components/ToogleView";
import { ViewProvider } from "./context/ViewContext";
import { ApiDataProvider } from "./context/ApiDataContext";
import { SearchProvider } from "./context/SearchContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewProvider>
      <SearchProvider>
        <ApiDataProvider>
          <div className=" w-full flex space-x-1 ">
            <div className="w-[20%] bg-black">
              <SideNavBar />
            </div>
            <div className="w-[80%] px-5 flex flex-col space-y-3 ">
              <SearchFields />
              <ToogleView />
              <div>{children}</div>
            </div>
          </div>
        </ApiDataProvider>
      </SearchProvider>
    </ViewProvider>
  );
}
