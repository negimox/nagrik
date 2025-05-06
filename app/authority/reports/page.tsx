"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  MapPin,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportsPage() {
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [filteredReports, setFilteredReports] = useState<any[]>([])

  // Mock data for reports
  const reports = [
    {
      id: "REP-1234",
      title: "Pothole on Main Street",
      category: "Road Damage",
      status: "In Progress",
      date: "2023-05-01",
      location: "Main St & 5th Ave",
      priority: "High",
      assignedTo: "Road Maintenance Team",
    },
    {
      id: "REP-1235",
      title: "Broken Streetlight",
      category: "Streetlight",
      status: "Assigned",
      date: "2023-05-02",
      location: "Park Avenue",
      priority: "Medium",
      assignedTo: "Electrical Team",
    },
    {
      id: "REP-1236",
      title: "Overflowing Trash Bin",
      category: "Sanitation",
      status: "Pending",
      date: "2023-05-03",
      location: "Central Park",
      priority: "Low",
      assignedTo: "Unassigned",
    },
    {
      id: "REP-1237",
      title: "Water Leakage",
      category: "Water/Drainage",
      status: "Pending",
      date: "2023-05-04",
      location: "Downtown",
      priority: "High",
      assignedTo: "Unassigned",
    },
    {
      id: "REP-1238",
      title: "Damaged Park Bench",
      category: "Public Property",
      status: "Resolved",
      date: "2023-04-28",
      location: "City Park",
      priority: "Low",
      assignedTo: "Parks Department",
    },
    {
      id: "REP-1239",
      title: "Traffic Light Malfunction",
      category: "Traffic",
      status: "In Progress",
      date: "2023-05-01",
      location: "Main St & 10th Ave",
      priority: "High",
      assignedTo: "Traffic Department",
    },
    {
      id: "REP-1240",
      title: "Graffiti on Public Building",
      category: "Public Property",
      status: "Assigned",
      date: "2023-05-02",
      location: "City Hall",
      priority: "Medium",
      assignedTo: "Maintenance Team",
    },
    {
      id: "REP-1241",
      title: "Fallen Tree Branch",
      category: "Public Property",
      status: "Resolved",
      date: "2023-04-25",
      location: "Riverside Park",
      priority: "Medium",
      assignedTo: "Parks Department",
    },
    {
      id: "REP-1242",
      title: "Sidewalk Crack",
      category: "Road Damage",
      status: "Pending",
      date: "2023-05-03",
      location: "Elm Street",
      priority: "Low",
      assignedTo: "Unassigned",
    },
    {
      id: "REP-1243",
      title: "Broken Public Restroom",
      category: "Public Property",
      status: "In Progress",
      date: "2023-04-30",
      location: "Beach Park",
      priority: "Medium",
      assignedTo: "Maintenance Team",
    },
  ]

  // Apply filters and search
  useEffect(() => {
    let result = [...reports]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (report) =>
          report.id.toLowerCase().includes(query) ||
          report.title.toLowerCase().includes(query) ||
          report.location.toLowerCase().includes(query) ||
          report.category.toLowerCase().includes(query) ||
          report.assignedTo.toLowerCase().includes(query),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((report) => report.status.toLowerCase() === statusFilter.toLowerCase())
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((report) => {
        if (categoryFilter === "road") return report.category === "Road Damage"
        if (categoryFilter === "streetlight") return report.category === "Streetlight"
        if (categoryFilter === "sanitation") return report.category === "Sanitation"
        if (categoryFilter === "water") return report.category === "Water/Drainage"
        if (categoryFilter === "property") return report.category === "Public Property"
        if (categoryFilter === "traffic") return report.category === "Traffic"
        return true
      })
    }

    // Apply priority filter
    if (priorityFilter !== "all") {
      result = result.filter((report) => report.priority.toLowerCase() === priorityFilter.toLowerCase())
    }

    setFilteredReports(result)
  }, [searchQuery, statusFilter, categoryFilter, priorityFilter])

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
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

  const toggleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([])
    } else {
      setSelectedReports(filteredReports.map((report) => report.id))
    }
  }

  const toggleSelectReport = (id: string) => {
    if (selectedReports.includes(id)) {
      setSelectedReports(selectedReports.filter((reportId) => reportId !== id))
    } else {
      setSelectedReports([...selectedReports, id])
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setCategoryFilter("all")
    setPriorityFilter("all")
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-md p-6">
        <h1 className="text-xl font-bold text-[#003A70] mb-4">Reports Management</h1>
        <p className="text-sm text-gray-600">
          View, filter, and manage all infrastructure reports. Assign tasks to teams and track resolution progress.
        </p>
      </div>

      <div className="bg-white border rounded-md p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="pl-8 w-full border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="border-[#003A70] text-[#003A70]">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Statuses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("assigned")}>Assigned</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("in progress")}>In Progress</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("resolved")}>Resolved</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearFilters}>Clear filters</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 border-[#003A70] text-[#003A70]">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button className="gap-2 bg-[#003A70] hover:bg-[#004d94]">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] border-gray-300">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px] border-gray-300">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="road">Road Damage</SelectItem>
                <SelectItem value="streetlight">Streetlight</SelectItem>
                <SelectItem value="sanitation">Sanitation</SelectItem>
                <SelectItem value="water">Water/Drainage</SelectItem>
                <SelectItem value="property">Public Property</SelectItem>
                <SelectItem value="traffic">Traffic</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px] border-gray-300">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-[#003A70] text-[#003A70]" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead className="font-medium text-gray-500">ID</TableHead>
                <TableHead className="font-medium text-gray-500">Issue</TableHead>
                <TableHead className="font-medium text-gray-500">Status</TableHead>
                <TableHead className="font-medium text-gray-500">Priority</TableHead>
                <TableHead className="font-medium text-gray-500">Location</TableHead>
                <TableHead className="font-medium text-gray-500">Date</TableHead>
                <TableHead className="font-medium text-gray-500">Assigned To</TableHead>
                <TableHead className="text-right font-medium text-gray-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedReports.includes(report.id)}
                      onCheckedChange={() => toggleSelectReport(report.id)}
                      aria-label={`Select ${report.id}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{report.title}</div>
                      <div className="text-xs text-gray-500">{report.category}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">{report.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    {report.assignedTo === "Unassigned" ? (
                      <span className="text-sm text-gray-500">Unassigned</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-[#003A70] text-white">
                            {report.assignedTo
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{report.assignedTo}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/authority/reports/${report.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Assign</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Add Note</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing <strong>1</strong> to <strong>{filteredReports.length}</strong> of{" "}
            <strong>{filteredReports.length}</strong> results
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
          <li>• Use the search and filter functions to find specific reports.</li>
          <li>• Select multiple reports to perform batch actions like assigning to teams.</li>
          <li>• Export reports to CSV or PDF for offline analysis or reporting.</li>
          <li>• Click on a report ID to view detailed information and update its status.</li>
        </ul>
      </div>
    </div>
  )
}
