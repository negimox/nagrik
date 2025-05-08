"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";

interface Report {
  _id?: string;
  id: string;
  title: string;
  category: string;
  status: string;
  priority: string;
  date: string;
  time: string;
  location: string;
  coordinates: string;
  description: string;
  submittedBy: string;
  assignedTo: string;
  estimatedCompletion: string;
  images: string[];
  updates: {
    date: string;
    time: string;
    status: string;
    comment: string;
    by: string;
  }[];
  createdBy?: string;
}

export default function ReportDetailsPage() {
  const params = useParams();
  const reportId = params.id as string;
  const [activeTab, setActiveTab] = useState("details");
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchReportDetail = async () => {
      if (!user || !user.uid) {
        setError("User authentication required");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Fetch all reports for this user
        const response = await fetch(`/api/report?uid=${user.uid}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        // Find the specific report by ID
        const foundReport = data.result?.find(
          (r: any) => r.id === reportId || r._id === reportId
        );

        if (foundReport) {
          setReport(foundReport);
        } else {
          setError("Report not found");
        }
      } catch (error) {
        console.error("Error fetching report details:", error);
        setError("Failed to load report details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportDetail();
  }, [reportId, user]);

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-800 border-gray-300"
          >
            Pending
          </Badge>
        );
      case "Assigned":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-300"
          >
            Assigned
          </Badge>
        );
      case "In Progress":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-300"
          >
            In Progress
          </Badge>
        );
      case "Resolved":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-300"
          >
            Resolved
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Helper function to get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Low":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-300"
          >
            Low
          </Badge>
        );
      case "Medium":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-300"
          >
            Medium
          </Badge>
        );
      case "High":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-300"
          >
            High
          </Badge>
        );
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-t-[#003A70] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading report details...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="bg-white border rounded-md p-6 text-center">
        <h2 className="text-xl font-bold text-red-500 mb-2">
          Error Loading Report
        </h2>
        <p className="text-gray-600 mb-4">{error || "Report not found"}</p>
        <Link href="/citizen/reports">
          <Button className="bg-[#003A70] hover:bg-[#004d94]">
            Return to Reports
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/citizen/reports">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 border-[#003A70] text-[#003A70]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Reports</span>
            </Button>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#003A70]">{report.title}</h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <span>Report #{report.id}</span>
              <span>•</span>
              <span>{report.category}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(report.status)}
            {getPriorityBadge(report.priority)}
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-md p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">
                    Description
                  </h3>
                  <p className="mt-1 text-sm">{report.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500">
                      Date Reported
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span>{report.date}</span>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500">
                      Time
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-sm">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span>{report.time}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-500">
                    Location
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span>{report.location}</span>
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-500">
                    GPS Coordinates
                  </h3>
                  <p className="mt-1 text-sm">{report.coordinates}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">
                    Report Status
                  </h3>
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 font-bold text-sm">
                        1
                      </div>
                      <div className="flex-1">
                        <div className="h-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 font-bold text-sm">
                        2
                      </div>
                      <div className="flex-1">
                        <div className="h-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 font-bold text-sm">
                        3
                      </div>
                      <div className="flex-1">
                        <div className="h-2 rounded-full bg-yellow-500"></div>
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-gray-300 border border-gray-300 font-bold text-sm">
                        4
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Submitted</span>
                      <span>Assigned</span>
                      <span>In Progress</span>
                      <span>Resolved</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500">
                      Submitted By
                    </h3>
                    <p className="mt-1 text-sm">{report.submittedBy}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500">
                      Assigned To
                    </h3>
                    <p className="mt-1 text-sm">
                      {report.assignedTo || "Not assigned yet"}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-500">
                    Estimated Completion
                  </h3>
                  <p className="mt-1 text-sm">
                    {report.estimatedCompletion || "Not determined"}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="updates" className="space-y-4">
            {report.updates && report.updates.length > 0 ? (
              report.updates.map((update, index) => (
                <div key={index} className="border rounded-md p-3 space-y-2">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">{update.status}</div>
                    <div className="text-xs text-gray-500">
                      {update.date} at {update.time}
                    </div>
                  </div>
                  <p className="text-sm">{update.comment}</p>
                  <p className="text-xs text-gray-500">By: {update.by}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No updates available for this report.
              </div>
            )}
          </TabsContent>

          <TabsContent value="images" className="space-y-4">
            {report.images && report.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.images.map((image, index) => (
                  <div
                    key={index}
                    className="border rounded-md overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`Report image ${index + 1}`}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No images available for this report.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-[#E6EEF4] border rounded-md p-4">
        <h2 className="font-bold text-[#003A70] mb-2">Need Help?</h2>
        <p className="text-xs text-gray-700 mb-2">
          If you have questions about this report or need to provide additional
          information, please contact us.
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-[#003A70] border-[#003A70]"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>Contact Support</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-[#003A70] border-[#003A70]"
          >
            <FileText className="h-4 w-4 mr-1" />
            <span>Submit Additional Information</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
