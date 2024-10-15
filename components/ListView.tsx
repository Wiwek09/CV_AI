import React from "react";
import { Card } from "./ui/card";
import { FaUser, FaPhoneAlt, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { Button } from "./ui/button";

const ListView = () => {
  return (
    <div>
      <Card className="px-3 py-4 flex justify-between ">
        {/* Basic Information */}
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">FullStack Developer</h1>
            <p className="flex items-center text-2xl gap-2">
              <span className="flex items-center ">
                <IoLocation className="text-[20px]" />
                <span className="text-gray-700 text-sm">Pokhara,Nepal</span>
              </span>
            </p>
            <p className="flex gap-2 text-[20px]">
              <span>
                <FaLinkedin />
              </span>
              <span>
                <FaGithub />
              </span>
            </p>
          </div>

          <p className="flex items-center gap-2 mt-4 ">
            <span>
              <FaUser />
            </span>
            <span className="text-gray-700">John Doe</span>
          </p>
          <p className="flex items-center gap-2">
            <span>
              <FaPhoneAlt />
            </span>
            <span className="text-gray-700">+977-9846032438</span>
          </p>
          <p className="flex items-center gap-2">
            <span>
              <MdEmail />
            </span>
            <span>
              <a
                href="mailto:test@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700"
              >
                test@gmail.com
              </a>
            </span>
          </p>
        </div>

        {/*Previous Experience */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-xl">Experience :</h1>
            <p className="text-gray-700 ">4 years</p>
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
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="font-bold text-xl">Education</h1>
            <span className="text-sm text-gray-700">
              Bachloers in Computer Engineering
            </span>
          </div>

          <div>
            <h1 className="font-bold text-xl">License & Certification</h1>
            <p className="text-sm text-gray-700">Azure Certificate</p>
          </div>

          <div>
            <h1 className="font-bold text-xl">Skills</h1>
            <Card className="h-fit w-fit p-2 bg-slate-100 shadow-4xl rounded-lg text-sm">
              React
            </Card>
          </div>

          <div className="flex self-end">
            <Button>View CV</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ListView;
