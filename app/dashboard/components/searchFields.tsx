import React from "react";
import { Input } from "@/components/ui/input";
import { ImLocation } from "react-icons/im";

const SearchFields = () => {
  return (
    <div className="w-full flex flex-col space-y-2 ">
      <div className="flex justify-center space-x-12 text-center">
        <div>
          <Input type="string" placeholder="Enter Prompt" />
        </div>
        <div className="flex relative ">
          <Input type="string" placeholder="Enter Location" className="pr-6" />
          <span className="absolute right-1 top-2 text-lg ">
            <ImLocation />
          </span>
        </div>
      </div>

      <div>
        <hr className="bg-slate-500 h-1 ml-3" />
      </div>
    </div>
  );
};

export default SearchFields;
