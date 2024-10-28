"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { FaUser, FaPhoneAlt, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { Button } from "./ui/button";
import { IDocumentData } from "@/interfaces/DocumentData";
import axios from "@/utils/axiosConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IFormInputData } from "@/interfaces/FormInputData";

interface ListViewProps {
  data: IDocumentData[] | any;
  searchData: IFormInputData | null;
}

const ListView = ({ data, searchData }: ListViewProps) => {
  const [individualData, setIndividualData] = useState<any>([]);
  const [erroData, setErrorData] = useState(false);
  const [loading, setLoading] = useState(false);

  const prevSearchData = useRef<IFormInputData | null>(null);

  const router = useRouter();

  //Session of search
  // const sessionListData = sessionStorage.setItem("sessionListData",)

  useEffect(() => {
    const storedSearchData = sessionStorage.getItem("searchData");
    const storedIndividualData = sessionStorage.getItem("individualData");

    if (storedSearchData && data?.length === 0) {
      // Clear searchData from session storage on full reload
      sessionStorage.removeItem("searchData");
      sessionStorage.removeItem("individualData");
    }

    if (storedSearchData && storedIndividualData) {
      // If session storage has data, load it
      setIndividualData(JSON.parse(storedIndividualData));
      prevSearchData.current = JSON.parse(storedSearchData);
    } else if (data?.length > 0 && !searchData) {
      fetchAllData();
    }
  }, [data]);

  useEffect(() => {
    if (searchData && searchData !== prevSearchData.current) {
      prevSearchData.current = searchData;
      fetchSearchData();
    }
  }, [searchData]);

  console.log("ListData", searchData);

  // console.log("SearchData:", searchIDData);

  const fetchAllData = async () => {
    setLoading(true);

    try {
      const fetchedData = await Promise.all(
        data?.map(async (item: any) => {
          const response = await axios.get(`/document/cv/${item.doc_id}`);
          return response.data;
        })
      );

      setIndividualData(fetchedData);
      sessionStorage.setItem("individualData", JSON.stringify(fetchedData));
      setErrorData(false);
    } catch (error) {
      setErrorData(true);
      console.log("Error fetching individual document data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchData = async () => {
    setLoading(true);
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
        const searchIds = response.data;
        const fetchedData = await Promise.all(
          searchIds?.map(async (item: any) => {
            const response = await axios.get(`/document/cv/${item.doc_id}`);
            return response.data;
          })
        );
        setIndividualData(fetchedData);
        sessionStorage.setItem("searchData", JSON.stringify(searchData));
        sessionStorage.setItem("individualData", JSON.stringify(fetchedData));
      }
    } catch (error) {
      console.log("Error fetching", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("Json-Data", individualData);

  return (
    <div className="flex flex-col space-y-5">
      {individualData?.length === 0 || erroData ? (
        <p>No Document Available</p>
      ) : (
        individualData?.map((item: any) => (
          <Card className="px-3 py-4 flex justify-between w-full shadow-lg transform  hover:border-[#7bf772] hover-border-8 transition duration-500 ease-in-out ">
            {/* Basic Information */}
            <div className="flex flex-col gap-1 w-[25%] overflow-clip">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">
                  {item?.parsed_cv.position ? item?.parsed_cv.position : ""}
                </h1>
                <p className="flex items-center text-2xl gap-2">
                  <span className="flex items-center ">
                    <IoLocation className="text-[20px]" />
                    <span className="text-gray-700 text-sm">
                      {item?.parsed_cv.address
                        ? item?.parsed_cv.address
                        : "Not Given"}
                    </span>
                  </span>
                </p>
                <p className="flex gap-2 text-[20px]">
                  <span>
                    {item?.parsed_cv.linkedin_url &&
                    item?.parsed_cv.linkedin_url !== null ? (
                      <Link href={item.parsed_cv.linkedin_url} target="_blank">
                        <FaLinkedin className="cursor-pointer" />
                      </Link>
                    ) : (
                      ""
                    )}
                  </span>
                  <span>
                    {item?.parsed_cv.github_url &&
                    item?.parsed_cv.github_url != null ? (
                      <Link href={item?.parsed_cv.github_url} target="_blank">
                        <FaGithub className="cursor-pointer" />
                      </Link>
                    ) : (
                      ""
                    )}
                  </span>
                </p>
              </div>

              <p className="flex items-center gap-2 mt-4 ">
                <span>
                  <FaUser />
                </span>
                <span className="text-gray-700">{item?.parsed_cv.name}</span>
              </p>
              <p className="flex items-center gap-2">
                <span>
                  <FaPhoneAlt />
                </span>
                <span className="text-gray-700">
                  {item?.parsed_cv.phone_number}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span>
                  <MdEmail />
                </span>
                <span>
                  <a
                    href={`mailto:${item?.parsed_cv.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700"
                  >
                    {item?.parsed_cv.email}
                  </a>
                </span>
              </p>
            </div>

            {/*Previous Experience */}
            <div className="flex flex-col gap-6 w-[40%] overflow-clip ">
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-xl">Experience :</h1>
                <p className="text-gray-700 ">
                  {item?.parsed_cv.years_of_experience} years
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-md">
                  {item?.parsed_cv.work_experience?.length > 0
                    ? item?.parsed_cv.work_experience[0]?.job_title
                    : ""}
                </p>
                <p className="flex gap-2 text-sm text-gray-700">
                  <span className="font-semibold">
                    {item?.parsed_cv.work_experience?.length > 0
                      ? item?.parsed_cv.work_experience[0]?.company_name + " : "
                      : ""}
                  </span>
                  <span>
                    {item?.parsed_cv.work_experience?.length > 0
                      ? item?.parsed_cv.work_experience[0]?.start_date +
                        " - " +
                        item?.parsed_cv.work_experience[0]?.end_date
                      : ""}
                  </span>
                </p>
                <p className="flex gap-1 items-start justify-start">
                  <span className="mt-1">
                    <GoDotFill />
                  </span>
                  <span className=" text-gray-700">
                    {item?.parsed_cv.work_experience?.length > 0
                      ? item?.parsed_cv.work_experience[0]?.responsibilities[0].slice(
                          0,
                          150
                        )
                      : ""}
                  </span>
                </p>
              </div>
            </div>

            {/* Education and skills */}
            <div className="flex flex-col gap-2 w-[25%] overflow-clip">
              <div>
                <h1 className="font-bold text-xl">Education</h1>
                {item?.parsed_cv.education?.length > 0 ? (
                  <span className="text-sm text-gray-700">
                    {item.parsed_cv.education[0].degree}
                  </span>
                ) : (
                  <span className="text-sm text-red-700">
                    Education details not available
                  </span>
                )}
              </div>

              <div>
                <h1 className="font-bold text-xl">License & Certification</h1>

                {item?.parsed_cv.certifications?.length > 0 ? (
                  <span className="text-sm text-gray-700">
                    {item.parsed_cv.certifications[0].certification_name}
                  </span>
                ) : (
                  <span className="text-sm text-red-700">
                    Certification details not available
                  </span>
                )}
              </div>

              <div className="">
                <h1 className="font-bold text-xl">Skills</h1>
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
                  <div>
                    {item?.parsed_cv.skills?.length > 3 && (
                      <span>...{item.parsed_cv.skills.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex self-end">
                <Button onClick={() => router.push(`/cv-detail/${item._id}`)}>
                  View CV
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
