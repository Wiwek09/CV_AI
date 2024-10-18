"use client";
import React, { useState, useEffect, useContext } from "react";
import ListView from "@/components/ListView";
import GridView from "@/components/GridView";
import { ViewContext } from "../context/ViewContext";
import { AxiosResponse } from "axios";
import axios from "@/utils/axiosConfig";
import { IDocumentData } from "@/interfaces/DocumentData";

function Dashboard() {
  const [data, setData] = useState<IDocumentData[]>([]);

  useEffect(() => {
    getImage();
  }, []);

  useEffect(() => {
    console.log("Data", data);
    console.log("TypeOf", typeof data);
  }, [data]);

  const getImage = async () => {
    try {
      const response: AxiosResponse<any> = await axios.get("/all_document");

      // Transform the API response into the expected structure
      const transformedData: IDocumentData[] = response.data.map(
        (item: any) => {
          const id = Object.keys(item)[0]; // Get the first key as ID
          const fileName = item[id]; // Get the value as fileName
          return { id, fileName }; // Return the transformed object
        }
      );
      setData(transformedData);
    } catch (error) {
      console.error(error);
    }
  };
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("Dashboard must be used within a ViewProvider");
  }

  const { view } = context;
  return (
    <div className="w-full">
      {view === "grid" ? <GridView data={data} /> : <ListView data={data} />}
    </div>
  );
}

export default Dashboard;
