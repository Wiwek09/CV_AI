import React, { useState, useEffect } from "react";
import { FaFolder, FaChevronDown } from "react-icons/fa";
import axiosInstance from "@/utils/axiosConfig";

const FolderList = ({ updateFolderList }) => {
  const [folders, setFolders] = useState([]);
  const [openFolder, setOpenFolder] = useState(null);
  const [folderContents, setFolderContents] = useState({});

  useEffect(() => {
    const fetchFoldersAndContents = async () => {
      try {
        // First fetch all folders
        const foldersResponse = await axiosInstance.get(
          "/folder/getAllFolders"
        );
        const fetchedFolders = foldersResponse.data;
        setFolders(fetchedFolders);

        // Then fetch contents for each folder
        const contentsPromises = fetchedFolders.map((folder) =>
          axiosInstance
            .get(`/folder/getFiles/${folder.folder_id}`)
            .then((response) => ({
              folderId: folder.folder_id,
              files: Object.values(response.data),
            }))
            .catch((error) => {
              console.error(
                `Error fetching contents for folder ${folder.folder_id}:`,
                error
              );
              return { folderId: folder.folder_id, files: [] };
            })
        );

        const allContents = await Promise.all(contentsPromises);

        // Convert array of results to an object
        const contentsObject = allContents.reduce(
          (acc, { folderId, files }) => ({
            ...acc,
            [folderId]: files,
          }),
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

  return (
    <div className="text-white">
      {folders.map((folder) => (
        <div key={folder.folder_id} className="mb-4">
          <div
            className="flex gap-2 items-center cursor-pointer p-2 hover:bg-gray-700 rounded"
            onClick={() => toggleDropdown(folder.folder_id)}
          >
            <FaFolder />
            <span>{folder.folder_name}</span>
            <span
              className={`ml-auto transform transition-transform duration-300 ${
                openFolder === folder.folder_id ? "rotate-180" : "rotate-0"
              }`}
            >
              <FaChevronDown />
            </span>
          </div>

          {openFolder === folder.folder_id && (
            <div className="mt-2 ml-6 border-l border-gray-600 pl-4">
              {folderContents[folder.folder_id]?.length ? (
                folderContents[folder.folder_id].map((pdf, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-1 text-gray-300 ease-in-out hover:bg-gray-700 duration-150 delay-75 rounded"
                  >
                    <span className="truncate">{pdf}</span>
                  </div>
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
