"use client";
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { FaUser, FaPhoneAlt, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { Button } from "./ui/button";
import { IDocumentData } from "@/interfaces/DocumentData";
import axiosInstance from "@/utils/axiosConfig";
import Link from "next/link";
import { IFormInputData } from "@/interfaces/FormInputData";
// import { RxCross2 } from "react-icons/rx";
// import { useToast } from "@/hooks/use-toast";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
import ListViewSkeletion from "./ui/Skeleton/ListViewSkeleton";

interface ListViewProps {
  data: IDocumentData[] | any;
  searchData: IFormInputData | null;
}

const ListView = ({ data, searchData }: ListViewProps) => {
  const [allData, setAllData] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);

  // const { toast } = useToast();

  const fetchAllData = async () => {
    const fetchedData: any[] = [];
    setLoading(true);

    try {
      if (data.length > 0) {
        for (const item of data) {
          try {
            const response = await axiosInstance.get(
              `/document/cv/${item.doc_id}`
            );
            if (response.status === 200) {
              fetchedData.push(response.data);
            }
          } catch (error) {
            // Stop fetching if an error occurs
            console.error("Error fetching document:", error);
            break;
          }
        }
        setAllData(fetchedData);
      }
    } catch (error) {
      // setErrorData(true);
      console.error("General error in fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSearching) {
      fetchAllData();
    }
  }, [data, isSearching]);

  useEffect(() => {
    if (searchData) {
      setIsSearching(true);
      fetchSearchData(searchData);
    }
  }, [searchData]);

  const fetchSearchData = async (searchData: IFormInputData) => {
    // setLoading(true);
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
        const searchIds = response.data;
        const fetchedData = await Promise.all(
          searchIds?.map(async (item: any) => {
            const response = await axiosInstance.get(
              `/document/cv/${item.doc_id}`
            );
            return response.data;
          })
        );
        setSearchResults(fetchedData.filter((item) => item !== null));
      }
    } catch (error) {
      console.log("Error fetching", error);
    } finally {
      setLoading(false);
    }
  };

  const displayedData = isSearching ? searchResults : allData;

  console.log("SearchData", displayedData);

  return (
    <div className="flex flex-col px-4 py-4 rounded-md bg-gray-100 h-[100vh] overflow-y-scroll space-y-5 scrollbar-thin ">
      {loading ? (
        <div className="flex flex-col gap-3">
          <ListViewSkeletion />
          <ListViewSkeletion />
        </div>
      ) : displayedData?.length === 0 ? (
        <p>No Document Available</p>
      ) : (
        displayedData?.map((item: any) => (
          <Card
            key={item._id}
            className="px-5 py-6 flex justify-between w-full shadow-lg transform mb-3  hover:border-[#7bf772]  transition duration-500 ease-in-out "
          >
            {/* Basic Information */}
            <div className="flex flex-col gap-1 w-[25%] overflow-clip">
              <div className="flex mb-0 flex-col">
                <h1 className="mb-1 text-base underline  underline-offset-2 font-bold">
                  {item?.parsed_cv.position
                    ? item?.parsed_cv.position.toUpperCase()
                    : ""}
                </h1>
                <p className="flex items-center gap-2">
                  {item?.parsed_cv.address && (
                    <span className=" flex items-center ">
                      <IoLocation className="text-base mr-2 " />
                      <span className="text-gray-500 text-sm">
                        {item?.parsed_cv.address}
                      </span>
                    </span>
                  )}
                </p>
              </div>

              <p className="flex items-center gap-2 mt-0  ">
                <span>
                  <FaUser className="text-sm" />
                </span>
                <span className="text-gray-500 font-normal text-sm">
                  {item?.parsed_cv.name}
                </span>
              </p>
              <p className="">
                {item?.parsed_cv.phone_number && (
                  <div className="flex item-center gap-2">
                    <span>
                      <FaPhoneAlt className="text-sm" />
                    </span>
                    <span className="text-gray-500 text-sm">
                      {item?.parsed_cv.phone_number}
                    </span>
                  </div>
                )}
              </p>
              <p className="">
                {item?.parsed_cv.email && (
                  <div className="flex items-center gap-2">
                    <span>
                      <MdEmail className="text-base" />
                    </span>
                    <span>
                      <a
                        href={`mailto:${item?.parsed_cv.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500"
                      >
                        {item?.parsed_cv.email}
                      </a>
                    </span>
                  </div>
                )}
              </p>
              <p className="flex gap-2">
                {item?.parsed_cv.linkedin_url && (
                  <div>
                    <Link
                      href={
                        item.parsed_cv.linkedin_url.startsWith("http")
                          ? item.parsed_cv.linkedin_url
                          : `https://${item.parsed_cv.linkedin_url}`
                      }
                      target="_blank"
                      className="flex gap-2 "
                    >
                      <span>
                        <FaLinkedin className="cursor-pointer" />
                      </span>
                      <span className="text-gray-500 text-sm">
                        {item?.parsed_cv?.linkedin_url}
                      </span>
                    </Link>
                  </div>
                )}
              </p>

              <p>
                {item?.parsed_cv.github_url && (
                  <div>
                    <Link
                      href={
                        item?.parsed_cv.github_url.startsWith("http")
                          ? item.parsed_cv.github_url
                          : `https://${item.parsed_cv.github_url}`
                      }
                      target="_blank"
                      className="flex gap-2"
                    >
                      <span>
                        <FaGithub className="cursor-pointer" />
                      </span>
                      <span className="text-gray-500 text-sm">
                        {item?.parsed_cv?.github_url}
                      </span>
                    </Link>
                    )
                  </div>
                )}
              </p>
            </div>

            {/*Previous Experience */}
            <div className="flex flex-col gap-6 w-[40%] overflow-clip ">
              <div className="flex items-center gap-2">
                <h1 className="font-medium text-base">Experience :</h1>
                <p className="text-gray-500 text-sm ">
                  {item?.parsed_cv.years_of_experience
                    ? item?.parsed_cv.years_of_experience + " years"
                    : ""}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold mb-3 ">
                  {item?.parsed_cv.work_experience?.length > 0
                    ? item?.parsed_cv.work_experience[0]?.job_title
                    : ""}
                </p>
                <p className="flex gap-2 text-sm text-black ">
                  <span className="font-medium text-gray-500 ">
                    {item?.parsed_cv.work_experience?.length > 0
                      ? item?.parsed_cv.work_experience[0]?.company_name + " : "
                      : ""}
                  </span>
                  <span className="text-gray-500">
                    {item?.parsed_cv.work_experience?.length > 0
                      ? item?.parsed_cv.work_experience[0]?.start_date +
                        " - " +
                        item?.parsed_cv.work_experience[0]?.end_date
                      : ""}
                  </span>
                </p>
                <p className="flex gap-[5px] items-start justify-start text-sm ">
                  <span className="mt-[2px] text-gray-800">
                    <GoDotFill />
                  </span>
                  <span className=" text-gray-500">
                    {item?.parsed_cv.work_experience?.length > 0
                      ? item?.parsed_cv.work_experience[0]?.responsibilities[0]?.slice(
                          0,
                          150
                        )
                      : ""}
                  </span>
                </p>
              </div>
            </div>

            {/* Education and skills */}
            <div className="flex flex-col gap-2 w-[25%] overflow-clip relative ">
              <div>
                <h1 className="font-bold text-base">Education</h1>
                {item?.parsed_cv.education?.length > 0 ? (
                  <span className="text-sm text-gray-500">
                    {item.parsed_cv.education[0].degree}
                  </span>
                ) : (
                  <span className="text-sm text-red-700">
                    Education details not available
                  </span>
                )}
              </div>

              <div>
                <h1 className=" mt-5 font-bold text-base">
                  License & Certification
                </h1>

                {item?.parsed_cv.certifications?.length > 0 ? (
                  <span className="text-sm text-gray-500">
                    {item.parsed_cv.certifications[0].certification_name}
                  </span>
                ) : (
                  <span className="text-sm text-red-700">
                    Certification details not available
                  </span>
                )}
              </div>

              <div className="">
                <h1 className="font-bold text-base mt-5">Skills</h1>
                <div className="flex flex-col gap-2 justify-center">
                  <div className="flex space-x-2">
                    {item?.parsed_cv.skills
                      ?.slice(0, 3)
                      .map((skill: any, index: number) => (
                        <Card
                          key={index}
                          className=" h-fit w-fit p-2 bg-slate-100 shadow-4xl rounded-lg text-sm overflow-hidden whitespace-nowrap text-ellipsis"
                          title={skill}
                        >
                          {skill}
                        </Card>
                      ))}
                  </div>
                  <div className="text-sm text-gray-500 hover:cursor-pointer">
                    {item?.parsed_cv.skills?.length > 3 && (
                      <span>...{item.parsed_cv.skills.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex self-end">
                <Button className="rounded-3xl">
                  <Link href={`/cv-detail/${item._id}`} target="_blank">
                    View CV
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default ListView;
