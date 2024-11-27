import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import axiosInstance from "@/utils/axiosConfig";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

const FolderList = ({ updateFolderList }) => {
  const [folders, setFolders] = useState([]);
  const [openFolder, setOpenFolder] = useState(null);
  const [folderContents, setFolderContents] = useState({});
  const [editingFolder, setEditingFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");

  useEffect(() => {
    const fetchFoldersAndContents = async () => {
      try {
        const foldersResponse = await axiosInstance.get(
          "/folder/getAllFolders"
        );
        const fetchedFolders = foldersResponse.data;
        setFolders(fetchedFolders);

        const contentsPromises = fetchedFolders.map((folder) =>
          axiosInstance
            .get(`/folder/getFiles/${folder.folder_id}`)
            .then((response) => ({
              [folder.folder_id]: response.data, // Map folder ID directly to files
            }))
            .catch((error) => {
              console.error(
                `Error fetching contents for folder ${folder.folder_id}:`,
                error
              );
              return { [folder.folder_id]: [] }; // Handle error gracefully
            })
        );

        const allContents = await Promise.all(contentsPromises);

        // Merge all folder content objects into one
        const contentsObject = allContents.reduce(
          (acc, content) => ({ ...acc, ...content }),
          {}
        );

        setFolderContents(contentsObject);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFoldersAndContents();
  }, [updateFolderList]);

  const toggleDropdown = (folderId) => {
    setOpenFolder(openFolder === folderId ? null : folderId);
  };

  const handleRename = async (folderId) => {
    try {
      await axiosInstance.put(`/folder/renameFolder`, {
        folder_id: folderId,
        folder_name: newFolderName,
      });

      // Update folder name in the UI
      setFolders((prevFolders) =>
        prevFolders.map((folder) =>
          folder.folder_id === folderId
            ? { ...folder, folder_name: newFolderName }
            : folder
        )
      );

      // Reset editing state
      setEditingFolder(null);
      setNewFolderName("");
    } catch (error) {
      console.error("Error renaming folder:", error);
    }
  };

  return (
    <div className="text-white">
      {folders.map((folder) => (
        <div key={folder.folder_id} className="mb-4">
          <div className="flex gap-2 w-full justify-between items-center flex-1 rounded">
            {editingFolder === folder.folder_id ? (
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onBlur={() => setEditingFolder(null)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleRename(folder.folder_id)
                }
                className="bg-gray-800 w-full text-white rounded p-1"
              />
            ) : (
              <div className="flex items-center gap-2 ">
                <span>
                  <Checkbox className="bg-white" />
                </span>
                <span>{folder.folder_name}</span>
              </div>
            )}

            <div className="flex gap-4">
              <span
                onClick={() => toggleDropdown(folder.folder_id)}
                className={`ml-auto w-6 h-6 hover:bg-gray-700 rounded-full items-center justify-center flex transform transition-transform duration-300 ${
                  openFolder === folder.folder_id ? "rotate-180" : "rotate-0"
                }`}
              >
                <FaChevronDown />
              </span>

              {/* Hamburger */}
              <span>
                <Popover>
                  <PopoverTrigger asChild>
                    <button>
                      <RxHamburgerMenu />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-12 p-1 text-center cursor-pointer">
                    <p
                      onClick={() => {
                        setEditingFolder(folder.folder_id);
                        setNewFolderName(folder.folder_name);
                      }}
                    >
                      Edit
                    </p>
                  </PopoverContent>
                </Popover>
              </span>
            </div>
          </div>

          {openFolder === folder.folder_id && (
            <div className="mt-2 ml-6 border-l border-gray-600 pl-4 max-w-[12rem]">
              {folderContents[folder.folder_id]?.length ? (
                folderContents[folder.folder_id].map((file) => (
                  <Link
                    key={file.doc_id}
                    href={`/cv-detail/${file.doc_id}`}
                    target="_blank"
                  >
                    <div className="flex items-center gap-2 p-1 text-gray-300 ease-in-out hover:bg-gray-700 duration-150 delay-75 rounded">
                      <span className="truncate">{file.doc_name}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-gray-400 italic">No PDFs uploaded.</div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FolderList;
