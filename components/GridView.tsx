"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
// import { ViewContext } from "@/app/dashboard/context/ViewContext";
import { IFormInputData } from "@/interfaces/FormInputData";
import { IDocumentData } from "@/interfaces/DocumentData";
import Link from "next/link";
import axiosInstance from "@/utils/axiosConfig";
import GridViewSkeleton from "./ui/Skeleton/GridViewSkeleton";

interface GridViewProps {
  data: IDocumentData[];
  searchData: IFormInputData | null;
}

function GridView({ data, searchData }: GridViewProps) {
  const [imageDataID, setImageDataID] = useState<any[]>([]);
  // const contextValue = useContext(ViewContext);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // useEffect(() => {
  //   const storedSearchData = sessionStorage.getItem("searchData");

  //   if (storedSearchData) {
  //     setInitialLoad(false);
  //     getFullImageData(JSON.parse(storedSearchData));
  //     // getSkillSummary();
  //   } else if (data?.length > 0 && !searchData) {
  //     setInitialLoad(true);
  //   } else {
  //     setInitialLoad(false);
  //   }
  // }, [data, searchData]);

  // Trigger loading state based on `data`

  useEffect(() => {
    if (!searchData) {
      setLoading(false);
      setIsSearching(false); // Reset search state when no search data is present
    }
  }, [data, searchData]);

  // useEffect(() => {
  //   if (data?.length > 0) {
  //     setLoading(false);
  //     setIsSearching(false);
  //   } else {
  //     setLoading(true);
  //   }
  // }, [data]);

  useEffect(() => {
    if (searchData) {
      setLoading(true);
      setIsSearching(true);
      fetchSearchResults(searchData);
    }
  }, [searchData]);

  // Handle search data and view changes
  // useEffect(() => {
  //   if (searchData) {
  //     setLoading(true);
  //     getFullImageData(searchData);
  //   } else if (data?.length === 0) {
  //     setImageDataID([]);
  //     setLoading(false);
  //   }
  // }, [searchData]);

  // useEffect(() => {
  //   if (imageDataID?.length > 0) {
  //   }
  // }, [imageDataID]);

  const fetchSearchResults = async (searchData: IFormInputData) => {
    try {
      const response = await axiosInstance.post(
        `/document/search_by_query`,
        searchData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setImageDataID(response.data || []);
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

  // const getSkillSummary = async () => {
  //   try {
  //     const fetchedData = await Promise.all(
  //       data?.map(async (item: any) => {
  //         const response = await axios.get(`/document/cv/${item.doc_id}`);
  //         return response.data;
  //       })
  //     );
  //     // setLoading(true);
  //     setParsedData(fetchedData);
  //   } catch (error) {
  //     console.log("Error fetching data", error);
  //   }
  //   // finally {
  //   //   setLoading(true);
  //   // }
  // };

  // if(data?.length){
  //   setLoading(false);
  // }

  return (
    <div className="masonry-container bg-gray-100">
      {loading ? (
        <div className="flex justify-between items-center">
          <GridViewSkeleton />
          <GridViewSkeleton />
          <GridViewSkeleton />
        </div>
      ) : isSearching ? (
        imageDataID.length > 0 ? ( // Show search results if available
          imageDataID.map((item, index) => (
            <div key={item.doc_id} className="mb-6 cursor-pointer">
              <Link href={`/cv-detail/${item.doc_id}`} target="_blank">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/cv_images/${item.img_id}.webp`}
                  alt={`Image ${index + 1}`}
                  height={500}
                  width={700}
                  className="rounded-lg object-cover shadow-lg w-full h-auto"
                  loading="lazy"
                  layout="responsive"
                />
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 mt-4">
            No Data Available...
          </div>
        )
      ) : data?.length > 0 ? ( // Show initial data if not searching
        data.map((item, index) => (
          <div key={item.doc_id} className="mb-6 cursor-pointer">
            <Link href={`/cv-detail/${item.doc_id}`} target="_blank">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/cv_images/${item.image_id}.webp`}
                alt={`Image ${index + 1}`}
                height={500}
                width={700}
                className="rounded-lg object-cover shadow-lg w-full h-auto"
                loading="lazy"
                layout="responsive"
              />
            </Link>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600 mt-4">
          No Data Available...
        </div>
      )}
    </div>
  );
}

export default GridView;
