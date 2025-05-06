"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Download, Filter, MapPin, Search } from "lucide-react"

export default function ReportsPage() {
  // Mock data for reports
  const reports = [
    {
      id: "R-2023-1234",
      title: "Road Pothole",
      category: "Road Damage",
      status: "In Progress",
      date: "2023-05-01",
      location: "123 Main St, Downtown",
      priority: "Medium",
    },
    {
      id: "R-2023-1235",
      title: "Broken Streetlight",
      category: "Streetlight",
      status: "Assigned",
      date: "2023-05-02",
      location: "456 Park Ave",
      priority: "Low",
    },
    {
      id: "R-2023-1236",
      title: "Damaged Trash Bin",
      category: "Public Facility",
      status: "Resolved",
      date: "2023-04-28",
      location: "789 Central Park",
      priority: "Low",
    },
    {
      id: "R-2023-1237",
      title: "Sidewalk Crack",
      category: "Road Damage",
      status: "Pending",
      date: "2023-05-03",
      location: "Oak Street",
      priority: "Low",
    },
    {
      id: "R-2023-1238",
      title: "Fallen Tree Branch",
      category: "Public Property",
      status: "Resolved",
      date: "2023-04-25",
      location: "Riverside Park",
      priority: "Medium",
    },
    {
      id: "R-2023-1239",
      title: "Graffiti on Wall",
      category: "Public Property",
      status: "Assigned",
      date: "2023-05-02",
      location: "Main Street Underpass",
      priority: "Low",
    },
    {
      id: "R-2023-1240",
      title: "Water Leakage",
      category: "Water/Drainage",
      status: "In Progress",
      date: "2023-04-30",
      location: "Pine Street",
      priority: "High",
    },
    {
      id: "R-2023-1241",
      title: "Traffic Light Malfunction",
      category: "Traffic",
      status: "Resolved",
      date: "2023-04-22",
      location: "Main St & 5th Ave",
      priority: "High",
    },
    {
      id: "R-2023-1242",
      title: "Playground Equipment Damage",
      category: "Public Facility",
      status: "In Progress",
      date: "2023-04-29",
      location: "Children's Park",
      priority: "Medium",
    },
    {
      id: "R-2023-1243",
      title: "Street Sign Missing",
      category: "Traffic",
      status: "Pending",
      date: "2023-05-04",
      location: "Elm St & Oak Ave",
      priority: "Low",
    },
  ]

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
        <h1 className="text-xl font-bold text-[#003A70] mb-4">My Reports</h1>
        <p className="text-sm text-gray-600">
          View and track all your submitted infrastructure reports. Monitor their progress and add additional
          information if needed.
        </p>
      </div>

      <div className="bg-white border rounded-md p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input type="search" placeholder="Search reports..." className="pl-8 w-full border-gray-300" />
            </div>
            <Button variant="outline" className="gap-2 border-[#003A70] text-[#003A70]">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 border-[#003A70] text-[#003A70]">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Link href="/citizen/report">
              <Button className="gap-2 bg-[#003A70] hover:bg-[#004d94]">
                <span>New Report</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] border-gray-300">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] border-gray-300">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="road">Road Damage</SelectItem>
                <SelectItem value="streetlight">Streetlight</SelectItem>
                <SelectItem value="public">Public Facility</SelectItem>
                <SelectItem value="water">Water/Drainage</SelectItem>
                <SelectItem value="traffic">Traffic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="10">
              <SelectTrigger className="w-[70px] border-gray-300">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-500">per page</span>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-medium text-gray-500">Report ID</TableHead>
                <TableHead className="font-medium text-gray-500">Issue</TableHead>
                <TableHead className="font-medium text-gray-500">Category</TableHead>
                <TableHead className="font-medium text-gray-500">Location</TableHead>
                <TableHead className="font-medium text-gray-500">Date</TableHead>
                <TableHead className="font-medium text-gray-500">Status</TableHead>
                <TableHead className="font-medium text-gray-500">Priority</TableHead>
                <TableHead className="font-medium text-gray-500 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span>{report.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/citizen/reports/${report.id}`}>
                      <Button variant="outline" size="sm" className="text-[#003A70] border-[#003A70]">
                        Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing <strong>1</strong> to <strong>10</strong> of <strong>{reports.length}</strong> results
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" disabled className="border-[#003A70] text-[#003A70]">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 bg-[#003A70] text-white border-[#003A70]">
              1
            </Button>
            <Button variant="outline" size="icon" className="border-[#003A70] text-[#003A70]">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-[#E6EEF4] border rounded-md p-4">
        <h2 className="font-bold text-[#003A70] mb-2">Report Management Notes</h2>
        <ul className="text-xs space-y-1 text-gray-700">
          <li>• Click on "Details" to view complete information about a report.</li>
          <li>• Use the search and filter functions to find specific reports.</li>
          <li>• You can export your reports to PDF or CSV format for your records.</li>
          <li>• Reports are automatically archived after 90 days of being resolved.</li>
        </ul>
      </div>
    </div>
  )
}
