import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosConfig";
import { FaFolder } from "react-icons/fa";

function FolderList({ updateFolderList }) {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const folderListCall = async () => {
      try {
        const response = await axiosInstance.get("/folder/getAllFolders");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };
    folderListCall();
  }, [updateFolderList]);

  console.log("DataListCall", data);
  return (
    <div className="text-white">
      {data.map((item: any, index) => (
        <div key={index} className="flex gap-2 items-center">
          <span>
            <FaFolder />
          </span>
          <span>{item.folder_name}</span>
        </div>
      ))}
    </div>
  );
}

export default FolderList;
