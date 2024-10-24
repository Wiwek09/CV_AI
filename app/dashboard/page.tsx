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

  if (!searchContext) {
    throw new Error("Error occured");
  }

  const { listViewSearchData, gridViewSearchData } = searchContext;
  // const { view } = useContext(ViewContext);
  // const apiData = useContext(ApiDataContext);

  // const [data, setData] = useState<IDocumentData[]>([]);

  // useEffect(() => {
  //   getImage();
  // }, []);

  // const getImage = async () => {
  //   try {
  //     const response: AxiosResponse<any> = await axios.get(
  //       "/document/all_document"
  //     );

  //     // Transform the API response into the expected structure
  //     const transformedData: IDocumentData[] = response.data.map(
  //       (item: any) => {
  //         const id = Object.keys(item)[0];
  //         const fileName = item[id];
  //         return { id, fileName };
  //       }
  //     );
  //     setData(transformedData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("Dashboard must be used within a ViewProvider");
  }

  const { view } = context;
  return (
    <div className="w-full py-2 pb-6">
      {view === "grid" ? (
        <GridView searchData={gridViewSearchData} /> // Pass grid-specific search data
      ) : (
        <ListView searchData={listViewSearchData} data={apiData} /> // Pass list-specific search data
      )}
    </div>
  );
}

export default Dashboard;
