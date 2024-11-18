import React from "react";
import { Card } from "@/components/ui/card";

const DetailViewSkeleton = () => {
  return (
    <Card className="px-3 py-5 w-full h-full bg-gray-100 flex flex-col gap-3 animate-pulse">
      <div className="py-5 sticky top-0 bg-gray-100 z-10">
        <div className="flex justify-between w-[100%] items-start">
          <div className="flex flex-col w-full gap-2">
            <div className="h-8 bg-gray-300 rounded-md w-3/4"></div>
            <div className="h-5 bg-gray-300 rounded-md w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded-md w-1/3"></div>

            <div className="flex gap-2">
              <span className="h-4 w-20 bg-gray-300 rounded-md"></span>
              <span className="h-4 w-40 bg-gray-300 rounded-md"></span>
            </div>

            <div className="flex gap-2">
              <span className="h-4 w-20 bg-gray-300 rounded-md"></span>
              <span className="h-4 w-40 bg-gray-300 rounded-md"></span>
            </div>
          </div>
        </div>
        <hr className="bg-gray-400 h-1 mt-3" />
      </div>

      <div className="flex-grow flex-col space-y-3 overflow-y-auto scrollbar-thin">
        <div className="flex flex-col gap-2">
          <p className="h-6 bg-gray-300 rounded-md w-32"></p>
          <div className="flex flex-col gap-3">
            <div className="space-y-2">
              <span className="h-5 bg-gray-300 rounded-md w-2/3"></span>
              <span className="h-4 bg-gray-300 rounded-md w-1/2"></span>
              <div className="space-y-1">
                <div className="flex gap-1 items-center">
                  <span className="h-4 w-full bg-gray-300 rounded-md"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <span className="h-6 bg-gray-300 rounded-md w-24"></span>
          <div className="flex gap-2 flex-col">
            <div className="space-y-1">
              <span className="h-5 bg-gray-300 rounded-md w-3/4"></span>
              <span className="h-4 bg-gray-300 rounded-md w-1/2"></span>
            </div>
          </div>
        </div>

        <div>
          <p className="h-6 bg-gray-300 rounded-md w-28"></p>
          <div className="space-y-2">
            <span className="h-5 bg-gray-300 rounded-md w-3/4"></span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DetailViewSkeleton;
