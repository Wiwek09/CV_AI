"use client";
import React, { ChangeEvent, FormEvent, useState, useContext } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import axios from "../../../utils/axiosConfig";
import { ApiDataContext } from "../context/ApiDataContext";
import { IoIosCloudUpload } from "react-icons/io";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SideNavBar = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const { toast } = useToast();
  const context = useContext(ApiDataContext);
  const apiData = context?.apiData ?? null;
  const setApiData = context?.setApiData;

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!files || files.length === 0) {
      toast({
        variant: "destructive",
        title: "File not selected",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    setUploading(true);

    try {
      const response = await axios.post("/document/document", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast({
          title: "Upload Successful",
          description: "Your files have been uploaded successfully.",
          action: <ToastAction altText="OK">OK</ToastAction>,
          className: "bg-[#7bf772]",
        });

        // Fetch updated data after successful upload
        await fetchUpdatedApiData();

        // Reset form and files
        setFiles(null);
        (event.target as HTMLFormElement).reset();
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.log("Error uploading files:", error);
      alert("An error occurred during file upload");
    } finally {
      setUploading(false);
    }
  };

  const fetchUpdatedApiData = async () => {
    try {
      const response = await axios.get("/document/all_document");
      if (setApiData) {
        setApiData(response.data);
      } else {
        console.warn("setApiData is undefined. Could not update the API data.");
      }
    } catch (error) {
      console.error("Error fetching updated data:", error);
    }
  };

  const deleteAllCV = async () => {
    try {
      const response = await axios.delete(`/document/all_document`);

      if (response.status === 200 && apiData && apiData?.length > 0) {
        setApiData([]);
        toast({
          title: "Deletion Successful",
          description: "All files have been deleted successfully.",
          className: "bg-[#7bf772]",
        });
      } else {
        toast({
          title: "No files",
          variant: "destructive",
          description: "Data is Empty",
        });
      }
    } catch (error) {
      console.error("Error Deleting Data", error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Could not delete files.",
      });
    }
  };

  return (
    <Card className="border border-black h-[145vh]rounded-none flex flex-col items-center bg-black space-y-6 py-6  ">
      <div className="">
        {/* <h1 className='text-center mb-10 text-xl font-bold'>Cv-Upload</h1> */}
        {/* <Image
          className='object-cover h-10 w-12 rounded-3xl '
          src={'/assets/8008657.jpg'}
          alt='Logo'
          height={50}
          width={50}
        /> */}
        <h1 className="text-2xl mt-5 text-center w-full px-4 text-white mb-2">
          CVAI
        </h1>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 items-center justify-between h-52"
          >
            {/* <div className='flex-grow items-center gap-2  max-w-full overflow-hidden'>
                <IoIosCloudUpload className='flex-shrink-0' />
                <input
                  className='file-input flex-wrap'
                  type='file'
                  accept='application/pdf'
                  onChange={handleFileSelect}
                  multiple
                  disabled={uploading}
                />
              </div> */}
            <div className="flex justify-center w-full  overflow-hidden">
              <label className="px-4 flex items-center w-44 justify-center py-4 rounded-md gap-2 cursor-pointer border-2  border-dashed p-2 bg-black text-white group">
                <span className="transform transition-transform duration-300 ease-in-out group-hover:translate-y-[-3px]">
                  <IoIosCloudUpload className="flex-shrink-0" />
                </span>
                <span>Choose File</span>
                <input
                  className="hidden "
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                  multiple
                  disabled={uploading}
                />
              </label>
            </div>

            {/* Display selected file names */}
            {files && (
              <div className="mx-2 overflow-y-auto scrollbar-thin">
                <ul className="space-y-1">
                  {Array.from(files).map((file, index) => (
                    <li
                      key={index}
                      className="text-sm truncate max-w-xs text-gray-700"
                      title={file.name}
                    >
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-start">
              <Button
                className="rounded-3xl bg-black border-white border "
                type="submit"
                disabled={uploading}
              >
                {uploading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span>Uploading...</span>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <h1 className="text-start w-full px-4 text-xl font-medium text-white">
        Files Uploaded
      </h1>

      {/* Display uploaded files */}
      <div className="flex flex-col w-full items-start px-4 overflow-y-auto scrollbar-thin h-52 gap-2 max-w-sm">
        {apiData &&
          apiData.map((item: any, index: number) => (
            <span key={index} className="text-gray-300 text-sm">
              {index + 1 + "." + item.doc_name}
            </span>
          ))}
      </div>

      {/* Delete All */}

      <div className="">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-800">Delete All</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all
                your uploaded file !!!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-700 hover:bg-red-500"
                onClick={() => deleteAllCV()}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
};

export default SideNavBar;
