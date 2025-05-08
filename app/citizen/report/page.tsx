"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertCircle, CheckCircle, MapPin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ImageDetector } from "@/components/ui/image-detector";
import { useReport } from "@/contexts/ReportContext";
import { useUser } from "@/contexts/UserContext";

type DetectedObject = {
  name: string;
  confidence: number;
};

const formSchema = z.object({
  category: z.string().min(1, { message: "Please select a category" }),
  title: z.string().min(3, { message: "Please enter a title" }),
  details: z.string().min(10, { message: "Please provide more details" }),
  severity: z.string().optional(),
  location: z.string().min(3, { message: "Please enter a location" }),
});

export default function ReportIssuePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reportId, setReportId] = useState<string>("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [mensen, setMensen] = useState([]);
  const [location, setLocation] = useState();
  const { user } = useUser();

  // Location Fetch
  const fetchApiData = async ({ latitude, longitude }) => {
    const res = await fetch(
      `https://openmensa.org/api/v2/canteens?near[lat]=${latitude}&near[lng]=${longitude}&near[dist]=50000`
    );
    const data = await res.json();

    setMensen(data);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        console.log("Data from API:", coords);
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  useEffect(() => {
    // Fetch data from API if `location` object is set
    if (location) {
      fetchApiData(location);
    }
  }, [location]);

  // Use the imageData from our context instead of local state
  const { imageData, setImageData, resetReportData } = useReport();

  // Initialize the form with useForm hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      details: "",
      severity: "",
      location: "",
    },
  });

  const handleGetLocation = () => {
    setIsGettingLocation(true);

    if (location && location.latitude && location.longitude) {
      // Use the actual coordinates from the location state
      const address =
        "Dhoolkot, Chakrata Rd, PO, Selakui, Dehradun, Uttarakhand";

      // Set the address in the form
      form.setValue("location", address);

      console.log(
        `Location set with coordinates: ${location.latitude}, ${location.longitude}`
      );
      setIsGettingLocation(false);
    } else {
      // Fallback if location is not available
      setTimeout(() => {
        form.setValue(
          "location",
          "Dhoolkot, Chakrata Rd, PO, Selakui, Dehradun, Uttarakhand"
        );
        setIsGettingLocation(false);
      }, 1000);
    }
  };

  const handleDetectionComplete = (objects: DetectedObject[]) => {
    // We don't need to call setDetectedObjects anymore since context handles it
    // The objects are already stored in context via the ImageDetector component

    // Auto-suggest category based on detected objects
    const infrastructureKeywords: Record<string, string[]> = {
      road: [
        "road",
        "street",
        "asphalt",
        "pothole",
        "pavement",
        "crack",
        "highway",
      ],
      streetlight: ["light", "lamp", "streetlight", "pole", "lighting"],
      garbage: ["trash", "garbage", "waste", "litter", "bin", "dumpster"],
      water: [
        "water",
        "puddle",
        "flood",
        "drainage",
        "sewer",
        "gutter",
        "pipe",
      ],
      property: [
        "bench",
        "sign",
        "building",
        "wall",
        "fence",
        "structure",
        "property",
      ],
    };

    // Find the category with the most matching keywords
    let bestMatch = { category: "", count: 0 };
    const objectNames = objects.map((obj) => obj.name.toLowerCase());

    Object.entries(infrastructureKeywords).forEach(([category, keywords]) => {
      const matchCount = keywords.filter((keyword) =>
        objectNames.some((name) => name.includes(keyword))
      ).length;

      if (matchCount > bestMatch.count) {
        bestMatch = { category, count: matchCount };
      }
    });

    // Only auto-select if we have matches and no category is selected yet
    const currentCategory = form.getValues("category");
    if (bestMatch.count > 0 && !currentCategory) {
      form.setValue("category", bestMatch.category);
    }

    // Generate report title suggestion based on top objects
    const currentTitle = form.getValues("title");
    if (!currentTitle) {
      const topObject = objects.sort((a, b) => b.confidence - a.confidence)[0];
      if (topObject && topObject.confidence > 70) {
        const suggestedTitle = `${
          topObject.name.charAt(0).toUpperCase() + topObject.name.slice(1)
        } issue reported`;
        form.setValue("title", suggestedTitle);
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      // Prepare the data object to be sent to the API
      const reportData = {
        title: data.title,
        category: data.category,
        description: data.details,
        severity: data.severity || "Medium",
        location: data.location,
        coordinates: location
          ? `${location.latitude}° N, ${location.longitude}° W`
          : null,
        createdBy: user?.uid,
        images: imageData.preview ? [imageData.preview] : [],
        detectedObjects: imageData.detectedObjects,
      };

      // Send the data to our API endpoint
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setReportId(result.reportId);

        // Reset the report data when submitted successfully
        resetReportData();

        // Redirect after success
        setTimeout(() => {
          router.push("/citizen/dashboard");
        }, 2000);
      } else {
        console.error("Error submitting report:", result.error);
        // Show error message to user (you could add a state variable for this)
      }
    } catch (error) {
      console.error("Error submitting report:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-white border rounded-md p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-xl font-bold text-[#003A70]">
            Report Submitted Successfully
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Thank you for your report. The relevant department will review it.
          </p>
        </div>

        <div className="bg-gray-50 border rounded-md p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-bold text-gray-700">Report ID</div>
              <div>R-2023-1237</div>
            </div>
            <div>
              <div className="font-bold text-gray-700">Report Date</div>
              <div>May 5, 2023 14:30</div>
            </div>
          </div>
        </div>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>How to Track Your Report</AlertTitle>
          <AlertDescription>
            You can check the progress of your report on the "My Reports" page.
            You will also receive email notifications when there are updates.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col space-y-3">
          <Button
            type="button"
            className="bg-[#003A70] hover:bg-[#004d94]"
            asChild
          >
            <Link href="/citizen/reports">View My Reports</Link>
          </Button>
          <Button
            variant="outline"
            type="button"
            className="border-[#003A70] text-[#003A70]"
            asChild
          >
            <Link href="/citizen/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border rounded-md p-6 mb-6">
        <h1 className="text-xl font-bold text-[#003A70] mb-6 pb-2 border-b-2 border-[#003A70]">
          Report Infrastructure Issue
        </h1>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                  step >= 1
                    ? "bg-[#003A70] text-white"
                    : "border border-gray-300 text-gray-500"
                }`}
              >
                1
              </div>
              <span className={step >= 1 ? "font-medium" : "text-gray-500"}>
                Issue Details
              </span>
            </div>
            <div className="h-px flex-1 bg-gray-200 mx-4" />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                  step >= 2
                    ? "bg-[#003A70] text-white"
                    : "border border-gray-300 text-gray-500"
                }`}
              >
                2
              </div>
              <span className={step >= 2 ? "font-medium" : "text-gray-500"}>
                Location & Photos
              </span>
            </div>
            <div className="h-px flex-1 bg-gray-200 mx-4" />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                  step >= 3
                    ? "bg-[#003A70] text-white"
                    : "border border-gray-300 text-gray-500"
                }`}
              >
                3
              </div>
              <span className={step >= 3 ? "font-medium" : "text-gray-500"}>
                Review
              </span>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {step === 1 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Category <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="road">Road Damage</SelectItem>
                          <SelectItem value="streetlight">
                            Broken Streetlight
                          </SelectItem>
                          <SelectItem value="garbage">
                            Garbage/Sanitation
                          </SelectItem>
                          <SelectItem value="water">
                            Water/Drainage Issue
                          </SelectItem>
                          <SelectItem value="property">
                            Damaged Public Property
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Title <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Example: Pothole on Main Street"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Details <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide details about the issue..."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Severity</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select severity level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low - Not urgent</SelectItem>
                          <SelectItem value="medium">
                            Medium - Needs attention
                          </SelectItem>
                          <SelectItem value="high">
                            High - Safety concern
                          </SelectItem>
                          <SelectItem value="critical" />
                          Critical - Dangerous condition
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    className="border-[#003A70] text-[#003A70]"
                    asChild
                  >
                    <Link href="/citizen/dashboard">Cancel</Link>
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-[#003A70] hover:bg-[#004d94]"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Location <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder="Address or location description"
                            className="flex-1"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          className="border-[#003A70] text-[#003A70]"
                          onClick={handleGetLocation}
                          disabled={isGettingLocation}
                        >
                          {isGettingLocation ? (
                            "Getting..."
                          ) : (
                            <MapPin className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <FormDescription>
                        Click the "Get Location" button to automatically detect
                        your current location.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ImageDetector now uses the ReportContext for data persistence */}
                <div className="space-y-2">
                  <Label className="text-sm font-bold">
                    Photos <span className="text-red-500">*</span>
                  </Label>
                  <ImageDetector
                    onDetectionComplete={handleDetectionComplete}
                  />

                  {imageData.detectedObjects.length > 0 && (
                    <Alert className="mt-4 bg-[#E6EEF4] border-[#003A70] text-[#003A70]">
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>AI Analysis Complete</AlertTitle>
                      <AlertDescription className="text-xs">
                        The AI has analyzed your image and identified relevant
                        objects. We've suggested a category and title based on
                        what was detected. You can modify these in the previous
                        step if needed.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="pt-4 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#003A70] text-[#003A70]"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-[#003A70] hover:bg-[#004d94]"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 border rounded-md p-4">
                  <h3 className="font-bold text-sm mb-3">Review Your Report</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-bold text-gray-700">Category</div>
                      <div>
                        {(() => {
                          const category = form.getValues("category");
                          if (category) {
                            return category === "road"
                              ? "Road Damage"
                              : category === "streetlight"
                              ? "Broken Streetlight"
                              : category === "garbage"
                              ? "Garbage/Sanitation"
                              : category === "water"
                              ? "Water/Drainage Issue"
                              : category === "property"
                              ? "Damaged Public Property"
                              : "Other";
                          }
                          return "Not selected";
                        })()}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-700">Location</div>
                      <div>{form.getValues("location") || "Not provided"}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="font-bold text-gray-700">Title</div>
                      <div>{form.getValues("title") || "Not provided"}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="font-bold text-gray-700">Details</div>
                      <div>{form.getValues("details") || "Not provided"}</div>
                    </div>
                    {imageData.detectedObjects.length > 0 && (
                      <div className="col-span-2">
                        <div className="font-bold text-gray-700">
                          AI Detected Objects
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {imageData.detectedObjects.map((obj, i) => (
                            <span
                              key={i}
                              className="bg-[#E6EEF4] rounded-full px-2 py-0.5 text-xs"
                            >
                              {obj.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 border rounded-md p-4">
                  <h3 className="font-bold text-sm mb-3">Attachments</h3>
                  {imageData.preview ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={imageData.preview}
                        alt="Attachment preview"
                        className="h-16 w-16 object-cover rounded-md"
                      />
                      <div className="text-sm">
                        1 image with AI analysis attached
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-sm text-gray-500">
                      No attachments
                    </div>
                  )}
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Please Note</AlertTitle>
                  <AlertDescription>
                    By submitting this report, your information will be reviewed
                    by the relevant city department. Please ensure your report
                    is accurate and does not contain false information.
                  </AlertDescription>
                </Alert>

                <div className="pt-4 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#003A70] text-[#003A70]"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#003A70] hover:bg-[#004d94]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </div>

      <div className="bg-[#E6EEF4] border rounded-md p-4">
        <h2 className="font-bold text-[#003A70] mb-2">Reporting Guidelines</h2>
        <ul className="text-xs space-y-1 text-gray-700">
          <li>• Please do not include personal information in your reports.</li>
          <li>
            • For urgent or dangerous situations, please contact City Hall
            directly at (123) 456-7890.
          </li>
          <li>
            • Please provide location information as accurately as possible.
          </li>
          <li>
            • Photos and videos help us assess and address the issue more
            efficiently.
          </li>
          <li>
            • AI image analysis can help identify and categorize issues
            automatically.
          </li>
        </ul>
      </div>
    </div>
  );
}
