"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the type for our detected objects
type DetectedObject = {
  name: string;
  confidence: number;
};

// Define the type for image data
type ImageData = {
  file: File | null;
  preview: string | null;
  detectedObjects: DetectedObject[];
};

// Define the type for our context state
interface ReportContextState {
  imageData: ImageData;
  setImageData: (data: ImageData) => void;
  resetReportData: () => void;
}

// Create the context with default values
const ReportContext = createContext<ReportContextState>({
  imageData: {
    file: null,
    preview: null,
    detectedObjects: [],
  },
  setImageData: () => {},
  resetReportData: () => {},
});

// Create a provider component
export function ReportProvider({ children }: { children: ReactNode }) {
  const [imageData, setImageData] = useState<ImageData>({
    file: null,
    preview: null,
    detectedObjects: [],
  });

  const resetReportData = () => {
    setImageData({
      file: null,
      preview: null,
      detectedObjects: [],
    });
  };

  return (
    <ReportContext.Provider
      value={{
        imageData,
        setImageData,
        resetReportData,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}

// Create a custom hook to use the context
export function useReport() {
  return useContext(ReportContext);
}
