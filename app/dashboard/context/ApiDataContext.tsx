import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "@/utils/axiosConfig";
import { IDocumentData } from "@/interfaces/DocumentData";

// Create the context
export const ApiDataContext = createContext<IDocumentData[] | null>(null);

// Custom hook to use the context
// export const useApiData = () => useContext(ApiDataContext);

// Context Provider to fetch and provide the data
export const ApiDataProvider = ({ children }: { children: ReactNode }) => {
  const [apiData, setApiData] = useState<IDocumentData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/document/all_document");

        const transformedData: IDocumentData[] = response.data.map(
          (item: any) => {
            const cv_id = Object.keys(item)[0];
            const cv_name = item[cv_id];
            return { cv_id, cv_name };
          }
        );
        setApiData(transformedData);
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ApiDataContext.Provider value={apiData}>
      {children}
    </ApiDataContext.Provider>
  );
};
