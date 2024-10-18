"use client";
import React, { useState, useEffect } from "react";
import { IDocumentData } from "@/interfaces/DocumentData";

interface GridViewProps {
  data: IDocumentData[]; // Expecting an array
}

function GridView({ data }: GridViewProps) {
  return (
    <div className="flex flex-col">
      {data.length > 0 ? ( // Check if data has items
        data.map((item) => (
          <div key={item.id}>
            <p>{item.fileName}</p>
          </div>
        ))
      ) : (
        <p>No documents available.</p> // Message for empty data
      )}
    </div>
  );
}

export default GridView;
