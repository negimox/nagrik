"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Clock, FileText, MessageSquare, ArrowLeft } from "lucide-react"

export default function ReportDetailsPage() {
  const params = useParams()
  const reportId = params.id as string
  const [activeTab, setActiveTab] = useState("details")

  // Mock report data
  const report = {
    id: reportId,
    title: "Road Pothole",
    category: "Road Damage",
    status: "In Progress",
    priority: "Medium",
    date: "2023-05-01",
    time: "14:30",
    location: "123 Main St, Downtown",
    coordinates: "40.7128° N, 74.0060° W",
    description:
      "There is a pothole approximately 30cm in diameter and 10cm deep on the sidewalk. It poses a tripping hazard for pedestrians, especially at night due to poor lighting in the area.",
    submittedBy: "John Smith",
    assignedTo: "Road Maintenance Team",
    estimatedCompletion: "2023-05-10",
    images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    updates: [
      {
        date: "2023-05-03",
        time: "09:15",
        status: "Assigned",
        comment: "Assigned to Road Maintenance Team for assessment",
        by: "System",
      },
      {
        date: "2023-05-04",
        time: "14:22",
        status: "In Progress",
        comment: "Team dispatched to assess the damage and plan repairs",
        by: "Admin User",
      },
    ],
  }

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
            Pending
          </Badge>
        )
      case "Assigned":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            Assigned
          </Badge>
        )
      case "In Progress":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            In Progress
          </Badge>
        )
      case "Resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Helper function to get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Low":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Low
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            Medium
          </Badge>
        )
      case "High":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            High
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/citizen/reports">
            <Button variant="outline" size="sm" className="gap-1 border-[#003A70] text-[#003A70]">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Reports</span>
            </Button>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#003A70]">{report.title}</h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <span>{report.id}</span>
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

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border rounded-md">
            <div className="p-4 border-b">
              <h2 className="font-bold text-[#003A70]">Report Information</h2>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b">
                <TabsList className="w-full justify-start p-0 bg-transparent h-auto">
                  <TabsTrigger
                    value="details"
                    className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#003A70] data-[state=active]:text-[#003A70] data-[state=active]:shadow-none rounded-none bg-transparent"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="updates"
                    className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#003A70] data-[state=active]:text-[#003A70] data-[state=active]:shadow-none rounded-none bg-transparent"
                  >
                    Updates
                  </TabsTrigger>
                  <TabsTrigger
                    value="photos"
                    className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#003A70] data-[state=active]:text-[#003A70] data-[state=active]:shadow-none rounded-none bg-transparent"
                  >
                    Photos
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="details" className="p-4 mt-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold mb-2">Description</h3>
                    <p className="text-sm">{report.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-bold mb-2">Submission Details</h3>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr>
                            <td className="py-1 pr-4 text-gray-500 align-top w-32">Submitted By:</td>
                            <td className="py-1">{report.submittedBy}</td>
                          </tr>
                          <tr>
                            <td className="py-1 pr-4 text-gray-500 align-top">Date:</td>
                            <td className="py-1 flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span>{report.date}</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1 pr-4 text-gray-500 align-top">Time:</td>
                            <td className="py-1 flex items-center gap-1">
                              <Clock className="h-3 w-3 text-gray-400" />
                              <span>{report.time}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold mb-2">Location Information</h3>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr>
                            <td className="py-1 pr-4 text-gray-500 align-top w-32">Address:</td>
                            <td className="py-1 flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span>{report.location}</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1 pr-4 text-gray-500 align-top">Coordinates:</td>
                            <td className="py-1">{report.coordinates}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="updates" className="p-4 mt-0">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold mb-2">Status Updates</h3>
                  <div className="space-y-4">
                    {report.updates.map((update, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                              {update.status}
                            </Badge>
                            <span className="text-xs text-gray-500">by {update.by}</span>
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{update.date}</span>
                            <Clock className="h-3 w-3 ml-2" />
                            <span>{update.time}</span>
                          </div>
                        </div>
                        <p className="text-sm">{update.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="photos" className="p-4 mt-0">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold mb-2">Attached Photos</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {report.images.map((image, index) => (
                      <div key={index} className="border rounded-md p-2">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Report image ${index + 1}`}
                          className="w-full h-auto rounded"
                        />
                        <p className="text-xs text-center mt-2 text-gray-500">Photo {index + 1}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border rounded-md">
            <div className="p-4 border-b">
              <h2 className="font-bold text-[#003A70]">Status Information</h2>
            </div>
            <div className="p-4">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-2 pr-4 text-gray-500 align-top w-32">Current Status:</td>
                    <td className="py-2">{getStatusBadge(report.status)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-500 align-top">Priority:</td>
                    <td className="py-2">{getPriorityBadge(report.priority)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-500 align-top">Assigned To:</td>
                    <td className="py-2">{report.assignedTo}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-500 align-top">Est. Completion:</td>
                    <td className="py-2 flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span>{report.estimatedCompletion}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border rounded-md">
            <div className="p-4 border-b">
              <h2 className="font-bold text-[#003A70]">Actions</h2>
            </div>
            <div className="p-4 space-y-3">
              <Button className="w-full bg-[#003A70] hover:bg-[#004d94]" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Add Comment
              </Button>
              <Button variant="outline" className="w-full border-[#003A70] text-[#003A70]" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>

          <div className="bg-[#E6EEF4] border rounded-md p-4">
            <h2 className="font-bold text-[#003A70] mb-2">Report Notes</h2>
            <ul className="text-xs space-y-1 text-gray-700">
              <li>• You will receive email notifications when there are updates to this report.</li>
              <li>• The estimated completion date may change based on assessment and workload.</li>
              <li>• For urgent matters related to this report, please contact City Hall directly.</li>
              <li>• You can add comments to provide additional information about this issue.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
