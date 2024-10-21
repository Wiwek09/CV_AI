"use client";
import React, { useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

const ReactPdfView = ({ id }: { id: string }) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="h-[100vh] p-[50px] overflow-y-auto">
      <Document
        file="/pdfs/Bachloers-Degree.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {numPages &&
          (() => {
            const pages = [];
            for (let i = 1; i <= numPages; i++) {
              pages.push(
                <Page
                  key={`page_${i}`}
                  pageNumber={i}
                  scale={0.7}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="w-auto max-w-full mb-4"
                />
              );
            }
            return pages;
          })()}
      </Document>
    </div>
  );
};

export default ReactPdfView;
