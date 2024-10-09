"use client";
import React, { useState } from "react";
import {
  Card,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";


const items: string[] = [
  "Web developer",
  "Full Stack Developer",
  "Front End",
  "Backend",
  "Mobile Developer",
  "Devops",
  "System Engineer",
];

const SideNavBar = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = (item: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems((prev) => [...prev, item]); // Add item if checked
    } else {
      setSelectedItems((prev) => prev.filter((i) => i !== item)); // Remove item if unchecked
    }
  };

  console.log("SelectionTest", selectedItems);

  return (
    <div className="min-h-screen">
      <Card className="h-auto flex flex-col py-6 px-4">
        <h1 className="text-center text-4xl font-bold ">Folder</h1>
        <div className="flex mt-6 flex-col space-y-3 ">
          {items.map((item) => {
            return (
              <label
                key={item}
                className="flex items-center space-x-2 cursor-pointer w-fit"
              >
                <Checkbox
                  onCheckedChange={(checked: boolean) =>
                    handleSelect(item, checked)
                  }
                />
                <span className="select-none">{item}</span>
              </label>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default SideNavBar;
