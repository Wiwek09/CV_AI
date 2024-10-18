"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ImLocation } from "react-icons/im";
import { FcSearch } from "react-icons/fc";
import axios from "@/utils/axiosConfig";
import TagsInput from "./TagsInput";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IFormData {
  address: string;
  programming_language: string[];
  prompt: string;
}

const SearchFields = () => {
  const [formData, setFormData] = useState<IFormData>({
    address: "",
    programming_language: [],
    prompt: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const jsonData: IFormData = {
      address: formData.address,
      programming_language: formData.programming_language,
      prompt: formData.prompt,
    };

    try {
      const response = await axios.post("/search_by_query", jsonData);
      if (response.status === 200) {
        console.log("Data submitted successfully", response.data);

        // Clear the form fields
        setFormData({
          address: "",
          programming_language: [],
          prompt: "",
        });
        // Optionally reload data or handle state updates here
      } else {
        console.error("Error submitting data");
      }
    } catch (error) {
      console.error("API call failed:", error);
    }

    console.log("Submitting Data: ", jsonData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData({
      ...formData,
      programming_language: tags,
    });
  };

  return (
    <div className="w-full flex flex-col justify-items-center space-y-2 ">
      {/* Top search fields */}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center space-x-12 text-center">
          <div>
            <Input
              type="string"
              name="prompt"
              value={formData.prompt}
              onChange={handleChange}
              placeholder="Enter Prompt (skills)"
            />
          </div>

          {/* <div>
            <Input
              type="text"
              name="programming_language"
              value={formData.programming_language}
              onChange={handleChange}
              placeholder="Enter Progamming Language"
            />
          </div> */}

          <div>
            {/* Inline tag input for programming languages */}
            <TagsInput onTagsChange={handleTagsChange} />
          </div>

          <div className="flex relative ">
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Location"
              className="pr-6"
            />
            <span className="absolute right-1 top-2 text-lg ">
              <ImLocation />
            </span>
          </div>

          <div>
            <button
              type="submit"
              className="flex items-center space-x-3 bg-[#7bf772] shadow-md px-3 py-2 rounded-lg group"
            >
              <span className="transform transition-transform duration-300 ease-in-out group-hover:translate-y-[-5px]">
                <FcSearch />
              </span>
              <span>Search</span>
            </button>
          </div>
        </div>
      </form>

      {/* <div>
        <hr className="bg-slate-500 h-1 " />
      </div> */}

      {/* <div className="mt-4 text-center">Tags</div> */}

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
