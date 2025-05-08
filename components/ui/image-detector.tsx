"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CameraIcon, UploadIcon, Loader2 } from "lucide-react";
import { useReport } from "@/contexts/ReportContext";

type DetectedObject = {
  name: string;
  confidence: number;
};

interface ImageDetectorProps {
  onDetectionComplete?: (objects: DetectedObject[]) => void;
}

export function ImageDetector({ onDetectionComplete }: ImageDetectorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { imageData, setImageData } = useReport();

  // Load image data from context on component mount
  useEffect(() => {
    // If there's already image data in context, use that
    // No need to do anything else since context already has the data
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    // Create a preview URL for the file
    const previewUrl = URL.createObjectURL(file);

    // Simulate AI object detection (in a real app, call an actual ML service)
    setTimeout(() => {
      // Example detected objects
      const simulatedObjects: DetectedObject[] = [
        { name: "pothole", confidence: 98.2 },
        { name: "road", confidence: 96.5 },
        { name: "asphalt", confidence: 92.1 },
        { name: "street", confidence: 87.8 },
      ];

      // Update context with image data
      setImageData({
        file,
        preview: previewUrl,
        detectedObjects: simulatedObjects,
      });

      // Call the callback if provided
      if (onDetectionComplete) {
        onDetectionComplete(simulatedObjects);
      }

      setIsProcessing(false);
    }, 2000);
  };

  const triggerFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {imageData.preview ? (
        <div className="border rounded-md overflow-hidden relative">
          <img
            src={imageData.preview}
            alt="Upload preview"
            className="w-full h-auto object-cover"
          />
          {isProcessing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-white text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p className="text-sm">Analyzing image...</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-12 text-center">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="rounded-full bg-gray-100 p-3">
              <UploadIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-gray-700 font-medium mt-2">Upload an image</h3>
            <p className="text-gray-500 text-xs max-w-[250px]">
              Upload a clear image of the issue. Our AI will help analyze and
              categorize it.
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-2 justify-center">
        <Button
          type="button"
          onClick={triggerFileDialog}
          variant="outline"
          className="border-[#003A70] text-[#003A70]"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <UploadIcon className="mr-2 h-4 w-4" />
              Upload Image
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-[#003A70] text-[#003A70]"
          disabled={isProcessing}
        >
          <CameraIcon className="mr-2 h-4 w-4" />
          Take Photo
        </Button>
      </div>
    </div>
  );
}
