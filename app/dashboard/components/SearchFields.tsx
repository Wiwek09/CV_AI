"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ImLocation } from "react-icons/im";
import { FcSearch } from "react-icons/fc";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchFields = () => {
  return (
    <div className="w-full flex flex-col justify-items-center space-y-2 ">
      {/* Top search fields */}
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

        <div>
          <button className="flex items-center space-x-3 bg-[#7bf772] shadow-md px-3 py-2 rounded-lg group">
            <span className="transform transition-transform duration-300 ease-in-out group-hover:translate-y-[-5px]">
              <FcSearch />
            </span>
            <span>Search</span>
          </button>
        </div>
      </div>

      <div>
        <hr className="bg-slate-500 h-1 " />
      </div>

      <div className="mt-4 text-center">Tags</div>

      <div>
        <hr className="bg-slate-500 h-1" />
      </div>

      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="random">Random</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <hr className="bg-slate-500 h-1" />
      </div>
    </div>
  );
};

export default SearchFields;
