"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "@/utils/axiosConfig";
import Image from "next/image";
import { ViewContext } from "@/app/dashboard/context/ViewContext";
import { IFormInputData } from "@/interfaces/FormInputData";

function GridView({ searchData }: { searchData: IFormInputData | null }) {
  // const { searchData } = useSearch();
  const [imageDataID, setImageDataID] = useState([]);
  const contextValue = useContext(ViewContext);

  // console.log("BIBIB", searchData);
  console.log("BIBView", contextValue?.view);

  useEffect(() => {
    if (contextValue?.view === "grid" && searchData !== null) {
      getFullImageData();
    } else {
      setImageDataID([]);
    }
  }, [searchData]);

  const getFullImageData = async () => {
    try {
      const response = await axios.post(
        `/document/search_by_query`,
        searchData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setImageDataID(response.data);
        // setIsImageFullDataCall(true);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Erro Fetching");
    }
  };

  console.log("CheckIMG", imageDataID);

  return (
    // <div className="bg-gray-200 rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
    <div className="masonry-container bg-gray-100">
      {imageDataID.length > 0 ? (
        imageDataID.map((item: any, index) => (
          <div className="masonry-item">
            <Image
              src={`http://localhost:8000/cv_images/${item.img_id}.webp`}
              alt={`Image ${index + 1}`}
              height={200}
              width={300}
              className="rounded-lg object-cover shadow-lg w-full h-auto "
              loading="lazy"
              layout="responsive"
            />
          </div>
        ))
      ) : (
        <div>No Data Available....</div>
      )}
    </div>
  );
}

export default GridView;
