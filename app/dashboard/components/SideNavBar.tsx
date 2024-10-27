"use client";
import React, { ChangeEvent, FormEvent, useState, useContext } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import axios from "../../../utils/axiosConfig";
import { ApiDataContext } from "../context/ApiDataContext";

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

  return (
    <div className="min-h-screen relative">
      <Card className="h-auto w-full flex flex-col space-y-6 py-6 px-4">
        <div>
          <h1 className="text-center text-2xl font-bold">Cv-Upload</h1>
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 justify-between h-52"
            >
              <div className="flex-grow max-w-full overflow-hidden">
                <input
                  className="file-input flex-wrap"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                  multiple
                  disabled={uploading}
                />
              </div>

              {/* Display selected file names */}
              {files && (
                <div className="mt-2">
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

              <div>
                <Button type="submit" disabled={uploading}>
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

        <h1 className="text-center text-3xl font-bold">Uploaded File</h1>

        {/* Display uploaded files */}
        <div className="flex flex-col gap-2 truncate max-w-sm">
          {apiData &&
            apiData.map((item: any, index: number) => (
              <span key={index} className="text-gray-700 text-sm">
                {index + 1 + "." + item.doc_name}
              </span>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default SideNavBar;
