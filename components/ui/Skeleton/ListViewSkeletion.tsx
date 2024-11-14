import React from "react";
import { Card } from "../card";

const ListViewSkeletion = () => {
  return (
    <Card
      key="skeleton"
      className="px-5 py-6 flex justify-between w-full shadow-lg transform mb-3 bg-gray-100 animate-pulse"
    >
      {/* Basic Information Skeleton */}
      <div className="flex flex-col gap-2 w-[25%]">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-5 bg-gray-300 rounded-full"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-1"></div>
        <div className="flex gap-2">
          <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
          <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Previous Experience Skeleton */}
      <div className="flex flex-col gap-4 w-[40%]">
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
      </div>

      {/* Education, Certifications, Skills Skeleton */}
      <div className="flex flex-col gap-2 w-[25%]">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>

        <div className="h-4 bg-gray-300 rounded w-1/3 mt-4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-1"></div>

        <div className="h-4 bg-gray-300 rounded w-1/4 mt-4"></div>
        <div className="flex space-x-2">
          <div className="h-6 w-16 bg-gray-300 rounded-lg"></div>
          <div className="h-6 w-16 bg-gray-300 rounded-lg"></div>
          <div className="h-6 w-16 bg-gray-300 rounded-lg"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>

        <div className="flex justify-end mt-4">
          <div className="h-8 w-20 bg-gray-300 rounded-3xl"></div>
        </div>
      </div>
    </Card>
  );
};

export default ListViewSkeletion;
