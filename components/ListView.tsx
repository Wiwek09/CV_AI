"use client";
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { FaUser, FaPhoneAlt, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { Button } from "./ui/button";
import { IDocumentData } from "@/interfaces/DocumentData";
import axios from "@/utils/axiosConfig";

interface ListViewProps {
  data: IDocumentData[];
}

const ListView = ({ data }: ListViewProps) => {
  const [individualData, setIndividualData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (data.length > 0) {
  //     // Clear individualData before fetching to avoid duplicates
  //     setIndividualData([]);

  //     // Fetch data only once for each item
  //     data.forEach((item) => {
  //       fetchIndividualData(item.id);
  //     });
  //   }
  // }, [data]); // Dependency array should include 'data'

  // console.log("ListViewData", individualData);

  // const fetchIndividualData = async (id: string) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`/cv/${id}`);
  //     setIndividualData((prevData): any => [
  //       ...prevData,
  //       response.data.parsed_cv,
  //     ]);
  //   } catch (error) {
  //     console.error("Error fetching indiviudal document data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (data.length > 0 && individualData.length === 0) {
      fetchAllData();
    }
  }, [data]);

  const fetchAllData = async () => {
    setLoading(true);

    try {
      const fetchedData = await Promise.all(
        data.map(async (item) => {
          const response = await axios.get(`/cv/${item.id}`);
          return response.data.parsed_cv;
        })
      );

      setIndividualData(fetchedData);
    } catch (error) {
      console.error("Error fetching individual document data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-5">
      {data.length === 0 ? (
        <p>No Document Available</p>
      ) : (
        individualData.map((item: any) => (
          <Card className="px-3 py-4 flex justify-between w-full ">
            {/* Basic Information */}
            <div className="flex flex-col gap-1 w-[25%] overflow-clip">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">
                  {item?.title ? item.title : "User Details"}
                </h1>
                <p className="flex items-center text-2xl gap-2">
                  <span className="flex items-center ">
                    <IoLocation className="text-[20px]" />
                    <span className="text-gray-700 text-sm">
                      {item?.address ? item?.address : "Not Given"}
                    </span>
                  </span>
                </p>
                <p className="flex gap-2 text-[20px]">
                  <span>
                    {item?.linkedin_url && item?.linkedin_url != null ? (
                      <FaLinkedin
                        className="cursor-pointer"
                        href={item?.linkedin_url}
                        target="_blank"
                      />
                    ) : (
                      ""
                    )}
                  </span>
                  <span>
                    {item?.github_url && item?.github_url != null ? (
                      <FaGithub
                        className="cursor-pointer"
                        href={item?.github_url}
                        target="_blank"
                      />
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
                <span className="text-gray-700">{item?.name}</span>
              </p>
              <p className="flex items-center gap-2">
                <span>
                  <FaPhoneAlt />
                </span>
                <span className="text-gray-700">{item?.phone_number}</span>
              </p>
              <p className="flex items-center gap-2">
                <span>
                  <MdEmail />
                </span>
                <span>
                  <a
                    href={`mailto:${item?.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700"
                  >
                    {item?.email}
                  </a>
                </span>
              </p>
            </div>

            {/*Previous Experience */}
            <div className="flex flex-col gap-6 w-[25%] overflow-clip ">
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-xl">Experience :</h1>
                <p className="text-gray-700 ">
                  {item?.years_of_experience} years
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-md">Backend Developer</p>
                <p className="flex gap-2 text-sm text-gray-700">
                  <span>BrandBuilder Np</span>
                  <span>2023, Present</span>
                </p>
                <p className="flex gap-1 items-center">
                  <span>
                    <GoDotFill />
                  </span>
                  <span className=" text-gray-700">description</span>
                </p>
              </div>
            </div>

            {/* Education and skills */}
            <div className="flex flex-col gap-2 w-[25%] overflow-clip">
              <div>
                <h1 className="font-bold text-xl">Education</h1>
                {item?.education?.length > 0 ? (
                  <span className="text-sm text-gray-700">
                    {item.education[0].degree}
                  </span>
                ) : (
                  <span className="text-sm text-red-700">
                    Education details not available
                  </span>
                )}
              </div>

              <div>
                <h1 className="font-bold text-xl">License & Certification</h1>
                <p className="text-sm text-gray-700">Azure Certificate</p>
              </div>

              <div className="">
                <h1 className="font-bold text-xl">Skills</h1>
                <div className="flex flex-col gap-2 justify-center">
                  <div className="flex space-x-2">
                    {item?.skills
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
                    {item?.skills?.length > 3 && (
                      <span>...{item.skills.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex self-end">
                <Button>View CV</Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default ListView;
