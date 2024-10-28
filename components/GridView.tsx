"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "@/utils/axiosConfig";
import Image from "next/image";
import { ViewContext } from "@/app/dashboard/context/ViewContext";
import { IFormInputData } from "@/interfaces/FormInputData";
import { IDocumentData } from "@/interfaces/DocumentData";
import { useRouter } from "next/navigation";

interface GridViewProps {
  data: IDocumentData[];
  searchData: IFormInputData | null;
}

function GridView({ data, searchData }: GridViewProps) {
  const [imageDataID, setImageDataID] = useState([]);
  const [parsedData, setParsedData] = useState<any>([]);
  const contextValue = useContext(ViewContext);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  console.log(`SearchData-Grid ${searchData}`);

  // useEffect(() => {
  // }, []);

  useEffect(() => {
    if (data?.length > 0 && !searchData) {
      setInitialLoad(true); // Ensure initial load runs first when data is available
    } else {
      setInitialLoad(false); // Switch to searchData handling after initial load
    }

    if (contextValue?.view === "grid" && searchData !== null) {
      getFullImageData();
      getSkillSummary();
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
        setLoading(true);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Erro Fetching", error);
    } finally {
      setLoading(false);
    }
  };

  const getSkillSummary = async () => {
    try {
      const fetchedData = await Promise.all(
        data?.map(async (item: any) => {
          const response = await axios.get(`/document/cv/${item.doc_id}`);
          return response.data;
        })
      );
      setLoading(true);
      setParsedData(fetchedData);
    } catch (error) {
      console.log("Error fetching data", error);
    } finally {
      setLoading(true);
    }
  };

  console.log("parsedData", parsedData);

  return (
    <div className="masonry-container bg-gray-100">
      {initialLoad && data?.length > 0 ? (
        data?.map((item: any, index) => (
          <div
            onClick={() => router.push(`/cv-detail/${item.doc_id}`)}
            className="masonry-item relative group cursor-pointer"
          >
            <Image
              src={`http://localhost:8000/cv_images/${item.image_id}.webp`}
              alt={`Image ${index + 1}`}
              height={200}
              width={300}
              className="rounded-lg object-cover shadow-lg w-full h-auto"
              loading="lazy"
              layout="responsive"
            />

            {/* Overlay that appears on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm flex items-center justify-center">
              <div className="text-white text-center p-4">
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="spinner-tailwind" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm">
                    {
                      parsedData?.find(
                        (parsedId: any) => parsedId?._id == item.doc_id
                      )?.parsed_cv?.all_skills
                    }
                  </p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : searchData && imageDataID.length > 0 ? (
        imageDataID.map((item: any, index) => (
          <div
            key={index}
            onClick={() => router.push(`/cv-detail/${item.doc_id}`)}
            className="masonry-item relative group cursor-pointer"
          >
            <Image
              src={`http://localhost:8000/cv_images/${item.img_id}.webp`}
              alt={`Image ${index + 1}`}
              height={200}
              width={300}
              className="rounded-lg object-cover shadow-lg w-full h-auto"
              loading="lazy"
              layout="responsive"
            />
            {/* Overlay that appears on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm flex justify-center">
              <div className="text-white text-center p-4">
                <h3 className="text-lg font-bold mb-2">Overview</h3>
                <p className="text-sm">{item.skill_summary}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No Data Available....</div>
      )}
    </div>
  );
}

export default GridView;
