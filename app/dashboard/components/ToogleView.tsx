"use client";
import React, { useContext } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ViewContext } from "../context/ViewContext";

const ToogleView = () => {
  const context = useContext(ViewContext);

  if (!context) {
    throw new Error("ToogleView must be used within a ViewProvider");
  }

  const { view, setView } = context;

  return (
    <div className="flex flex-row-reverse gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-md ${
                view === "grid"
                  ? "bg-gray-400 hover:bg-gray-300"
                  : "hover:bg-gray-200"
              }`}
            >
              <BsFillGridFill />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Grid View</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-md ${
                view === "list"
                  ? "bg-gray-400 hover:bg-gray-300"
                  : "hover:bg-gray-200"
              }`}
            >
              <FaListUl />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>List View</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ToogleView;
