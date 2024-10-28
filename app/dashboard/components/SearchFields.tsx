"use client";
import React, { useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { ImLocation } from "react-icons/im";
import { FcSearch } from "react-icons/fc";
import TagsInput from "./TagsInput";
import { IFormInputData } from "@/interfaces/FormInputData";
import { SearchContext } from "../layout";
import { ViewContext } from "../context/ViewContext";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchFields = () => {
  const searchContext = useContext(SearchContext);
  const viewContext = useContext(ViewContext);

  if (!searchContext) {
    throw new Error(
      "SearchContext must be used within a SearchContext.Provider"
    );
  }

  if (!viewContext) {
    throw new Error("ViewContext must be used within a ViewProvider");
  }

  const { setListViewSearchData, setGridViewSearchData } = searchContext;

  const { view } = viewContext;

  const [formData, setFormData] = useState<IFormInputData>({
    address: "",
    programming_language: [""],
    prompt: "",
  });

  const [tagsValue, setTagsValue] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const jsonData: IFormInputData = {
      address: formData.address,
      programming_language: formData.programming_language,
      prompt: formData.prompt,
    };
    e.preventDefault();
    // Submit search data based on current view
    if (view === "list") {
      setListViewSearchData(formData);
    } else if (view === "grid") {
      setGridViewSearchData(formData);
    }

    // Clear the form fields after submission
    setFormData({
      address: "",
      programming_language: [""],
      prompt: "",
    });
    setTagsValue(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagsChange = (tags: string[]) => {
    setTagsValue(true);
    setFormData({
      ...formData,
      programming_language: tags,
    });
  };

  // Disable Enter key for input fields to prevent submission
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
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
              onKeyDown={handleKeyDown} // Prevent form submission on Enter key
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
            <TagsInput onTagsChange={handleTagsChange} tagsValue={tagsValue} />
          </div>

          <div className="flex relative ">
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Location"
              className="pr-6"
              onKeyDown={handleKeyDown}
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

      <div className="">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="sort by" />
          </SelectTrigger>
          <SelectContent className="w-[180px]">
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
