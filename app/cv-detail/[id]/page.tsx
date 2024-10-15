import React from "react";
import ReactPdfView from "./components/ReactPdfView";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CVDetailPage = () => {
  return (
    <div className="h-screen flex space-x-4 w-full">
      <Card className="w-[40%] bg-gray-100 ">
        <ReactPdfView />
      </Card>

      <Card className="px-3 py-5 w-[60%] bg-gray-100 flex flex-col gap-3 overflow-y-auto">
        {/* First Part */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-2xl">John doe</h1>
            <p className="font-semibold">UI / UX designer</p>
            <p></p>
            <p className="flex gap-2">
              <span>Linkedin :</span>
              <span>https://www.linkedin.com/feed/</span>
            </p>
            <p className="flex gap-2">
              <span>Github :</span>
              <span>https://github.com/</span>
            </p>

            <p className="flex gap-2">
              <span>Website :</span>
              <span>https://bibek-portfolio.vercel.app/</span>
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-20">QR</div>
            <div>
              <div>
                <span>Phone Number :</span>
                <span> +977-9840171483</span>
              </div>
              <div>
                <span>Email :</span>
                <span> kcbibekmail@gmail.com</span>
              </div>
              <div>
                <span>Address :</span>
                <span> Pokhara, Nepal</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <hr className="bg-slate-500 h-1 " />
        </div>

        {/* Second Part */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-xl flex gap-4 ">
              Experience
              <span>{`4 yrs`}</span>
            </p>
            <span>UI/UI Designer</span>
            <span className="flex items-center gap-3">
              <span>Company Name</span>
              <span className="text-sm">{`(Start Date - End Date)`}</span>
            </span>
            <span className="flex flex-col gap-1">
              <span>Description</span>
              <span className="text-sm">{`. Bullet points`}</span>
            </span>
          </div>

          <div>
            <span className=" flex flex-col gap-1">
              <span className="font-semibold text-xl">Skills</span>
              <span className="text-sm">{`. Bullet points`}</span>
            </span>
          </div>

          <div>
            <span className=" flex flex-col gap-1">
              <span className="font-semibold text-xl">Education</span>
              <span className="flex gap-2 items-center ">
                <span className="font-semibold">University Name</span>
                <span className="text-sm">{`(Start Date - End Date)`}</span>
              </span>
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CVDetailPage;
