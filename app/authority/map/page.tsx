"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Filter, Layers, MapPin, Search, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function MapPage() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)

  // Mock data for map markers
  const mapMarkers = [
    {
      id: "REP-1234",
      title: "Pothole on Main Street",
      category: "Road Damage",
      status: "In Progress",
      priority: "High",
      location: "Main St & 5th Ave",
      lat: 40.7128,
      lng: -74.006,
      date: "2 days ago",
    },
    {
      id: "REP-1235",
      title: "Broken Streetlight",
      category: "Streetlight",
      status: "Assigned",
      priority: "Medium",
      location: "Park Avenue",
      lat: 40.7135,
      lng: -74.0046,
      date: "3 days ago",
    },
    {
      id: "REP-1236",
      title: "Overflowing Trash Bin",
      category: "Sanitation",
      status: "Pending",
      priority: "Low",
      location: "Central Park",
      lat: 40.7112,
      lng: -74.0077,
      date: "1 day ago",
    },
  ]

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

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-md p-6">
        <h1 className="text-xl font-bold text-[#003A70] mb-4">Issue Map</h1>
        <p className="text-sm text-gray-600">
          View and manage infrastructure issues geographically. Filter by category, status, or priority.
        </p>
      </div>

      <div className="bg-white border rounded-md">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-bold text-[#003A70]">Map View</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search location..."
                className="h-9 w-[200px] rounded-md border border-gray-300 bg-white pl-8 pr-3 text-sm"
              />
            </div>
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1 border-[#003A70] text-[#003A70]">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Filter Issues</SheetTitle>
                  <SheetDescription>Customize which issues appear on the map</SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Issue Categories</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-road" defaultChecked />
                        <Label htmlFor="category-road">Road Damage</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-streetlight" defaultChecked />
                        <Label htmlFor="category-streetlight">Streetlights</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-sanitation" defaultChecked />
                        <Label htmlFor="category-sanitation">Sanitation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-water" defaultChecked />
                        <Label htmlFor="category-water">Water/Drainage</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-property" defaultChecked />
                        <Label htmlFor="category-property">Public Property</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Status</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="status-pending" defaultChecked />
                        <Label htmlFor="status-pending">Pending</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="status-assigned" defaultChecked />
                        <Label htmlFor="status-assigned">Assigned</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="status-progress" defaultChecked />
                        <Label htmlFor="status-progress">In Progress</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="status-resolved" />
                        <Label htmlFor="status-resolved">Resolved</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Priority</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="priority-high" defaultChecked />
                        <Label htmlFor="priority-high">High</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="priority-medium" defaultChecked />
                        <Label htmlFor="priority-medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="priority-low" defaultChecked />
                        <Label htmlFor="priority-low">Low</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Time Period</h3>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">Past Week</SelectItem>
                        <SelectItem value="month">Past Month</SelectItem>
                        <SelectItem value="all">All Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setFilterOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-[#003A70] hover:bg-[#004d94]" onClick={() => setFilterOpen(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Button variant="outline" size="icon" className="h-9 w-9 border-[#003A70] text-[#003A70]">
              <Layers className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative h-[600px] bg-gray-100">
          {/* Map placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto" />
              <p className="mt-2 text-gray-500">Interactive map would be displayed here</p>
              <p className="text-sm text-gray-500">Showing {mapMarkers.length} issues</p>
            </div>
          </div>

          {/* Map markers */}
          <div className="absolute inset-0 pointer-events-none">
            {mapMarkers.map((marker, index) => (
              <div
                key={marker.id}
                className="absolute"
                style={{
                  left: `${30 + index * 15}%`,
                  top: `${30 + index * 10}%`,
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "auto",
                }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full h-8 w-8 ${
                    marker.priority === "High"
                      ? "bg-red-100 border-red-300 hover:bg-red-200"
                      : marker.priority === "Medium"
                        ? "bg-blue-100 border-blue-300 hover:bg-blue-200"
                        : "bg-green-100 border-green-300 hover:bg-green-200"
                  }`}
                  onClick={() => setSelectedIssue(marker.id)}
                >
                  <MapPin
                    className={`h-4 w-4 ${
                      marker.priority === "High"
                        ? "text-red-600"
                        : marker.priority === "Medium"
                          ? "text-blue-600"
                          : "text-green-600"
                    }`}
                  />
                </Button>
              </div>
            ))}
          </div>

          {/* Selected issue details */}
          {selectedIssue && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96">
              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">
                        {mapMarkers.find((m) => m.id === selectedIssue)?.title}
                      </CardTitle>
                      <CardDescription>{mapMarkers.find((m) => m.id === selectedIssue)?.location}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 -mt-1 -mr-2"
                      onClick={() => setSelectedIssue(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Status</p>
                      <div>{getStatusBadge(mapMarkers.find((m) => m.id === selectedIssue)?.status || "")}</div>
                    </div>
                    <div>
                      <p className="text-gray-500">Priority</p>
                      <div>{getPriorityBadge(mapMarkers.find((m) => m.id === selectedIssue)?.priority || "")}</div>
                    </div>
                    <div>
                      <p className="text-gray-500">Category</p>
                      <p>{mapMarkers.find((m) => m.id === selectedIssue)?.category}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Reported</p>
                      <p>{mapMarkers.find((m) => m.id === selectedIssue)?.date}</p>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 pb-4">
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="actions">Actions</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="mt-2 text-sm">
                      <p>
                        Additional details about this issue would be displayed here, including description, reporter
                        information, and any attached media.
                      </p>
                    </TabsContent>
                    <TabsContent value="actions" className="mt-2 space-y-2">
                      <Button size="sm" className="w-full bg-[#003A70] hover:bg-[#004d94]">
                        Assign Issue
                      </Button>
                      <Button size="sm" variant="outline" className="w-full border-[#003A70] text-[#003A70]">
                        Update Status
                      </Button>
                    </TabsContent>
                    <TabsContent value="history" className="mt-2 text-sm">
                      <p className="text-gray-500">No activity yet</p>
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#E6EEF4] border rounded-md p-4">
        <h2 className="font-bold text-[#003A70] mb-2">Map Usage Notes</h2>
        <ul className="text-xs space-y-1 text-gray-700">
          <li>• Click on map markers to view issue details.</li>
          <li>• Use the filter button to customize which issues are displayed.</li>
          <li>• High priority issues are marked in red, medium in blue, and low in green.</li>
          <li>• The map is updated in real-time as new reports are submitted.</li>
        </ul>
      </div>
    </div>
  )
}
