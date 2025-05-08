"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  MapPin,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/contexts/UserContext";
import { UpdateReportModal } from "@/components/modals/UpdateReportModal";
import { useToast } from "@/hooks/use-toast";

export default function ReportsPage() {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // Added missing state
  const [statusFilter, setStatusFilter] = useState("all"); // Added missing state
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");
  const [filteredReports, setFilteredReports] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const { toast } = useToast();

  // State for update modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Fetch reports from the API
  const fetchReports = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Build the query parameters for the API call
      let queryParams = new URLSearchParams();

      // Add location filter if provided
      if (locationFilter) {
        queryParams.append("location", locationFilter);
      }

      // Make the API request
      const response = await fetch(`/api/report?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.result && Array.isArray(data.result)) {
        setReports(data.result);
      } else {
        setReports([]);
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Failed to load reports. Please try again later.");
      setReports([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchReports();
  }, [locationFilter]); // Refetch when location filter changes

  // Apply client-side filters and search
  useEffect(() => {
    let result = [...reports];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (report) =>
          (report.id && report.id.toLowerCase().includes(query)) ||
          (report.title && report.title.toLowerCase().includes(query)) ||
          (report.location && report.location.toLowerCase().includes(query)) ||
          (report.category && report.category.toLowerCase().includes(query)) ||
          (report.assignedTo && report.assignedTo.toLowerCase().includes(query))
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(
        (report) =>
          report.status &&
          report.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((report) => {
        const category = report.category && report.category.toLowerCase();
        if (categoryFilter === "road")
          return category === "road damage" || category === "road";
        if (categoryFilter === "streetlight") return category === "streetlight";
        if (categoryFilter === "sanitation") return category === "sanitation";
        if (categoryFilter === "water")
          return category === "water/drainage" || category === "water";
        if (categoryFilter === "property")
          return category === "public property";
        if (categoryFilter === "traffic") return category === "traffic";
        return true;
      });
    }

    // Apply priority filter
    if (priorityFilter !== "all") {
      result = result.filter(
        (report) =>
          report.priority &&
          report.priority.toLowerCase() === priorityFilter.toLowerCase()
      );
    }

    setFilteredReports(result);
  }, [reports, searchQuery, statusFilter, categoryFilter, priorityFilter]);

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge
            variant="outline"
            className="bg-orange-100 text-orange-800 border-orange-300"
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

  const toggleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(
        filteredReports.map((report) => report.id || report._id)
      );
    }
  };

  const toggleSelectReport = (id: string) => {
    if (selectedReports.includes(id)) {
      setSelectedReports(selectedReports.filter((reportId) => reportId !== id));
    } else {
      setSelectedReports([...selectedReports, id]);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setPriorityFilter("all");
    setLocationFilter("");
  };

  // Apply location filter and trigger refetch
  const handleLocationSearch = () => {
    // The location filter will trigger the useEffect to refetch data
  };

  // Handle opening update modal for a report
  const handleUpdateReport = (report: any) => {
    setSelectedReport(report);
    setIsUpdateModalOpen(true);
  };

  // Handle updating status directly
  const handleUpdateStatus = async (reportId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/report`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: reportId,
          status: newStatus,
          comment: `Status updated to ${newStatus}`,
          updatedBy: user?.providerData?.[0]?.displayName || "Admin User",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      toast({
        title: "Success",
        description: `Report status updated to ${newStatus}`,
      });

      // Refresh reports
      fetchReports();
    } catch (error) {
      console.error("Error updating report status:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-md p-6">
        <h1 className="text-xl font-bold text-[#003A70] mb-4">
          Reports Management
        </h1>
        <p className="text-sm text-gray-600">
          View, filter, and manage all infrastructure reports. Assign tasks to
          teams and track resolution progress.
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
                <Button
                  variant="outline"
                  size="icon"
                  className="border-[#003A70] text-[#003A70]"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("assigned")}>
                  Assigned
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("in progress")}
                >
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("resolved")}>
                  Resolved
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("new")}>
                  New
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearFilters}>
                  Clear filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 border-[#003A70] text-[#003A70]"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] border-gray-300">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
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
            <Button
              variant="outline"
              size="sm"
              className="border-[#003A70] text-[#003A70]"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Location filter */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1 max-w-md">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Filter by location..."
              className="pl-8 w-full border-gray-300"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
          <Button
            onClick={handleLocationSearch}
            className="bg-[#003A70] hover:bg-[#004d94]"
          >
            Search Location
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#003A70]" />
            <span className="ml-2">Loading reports...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
            {error}
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-800">
            No reports found. Try adjusting your filters.
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedReports.length === filteredReports.length &&
                        filteredReports.length > 0
                      }
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="font-medium text-gray-500">
                    ID
                  </TableHead>
                  <TableHead className="font-medium text-gray-500">
                    Issue
                  </TableHead>
                  <TableHead className="font-medium text-gray-500">
                    Status
                  </TableHead>
                  <TableHead className="font-medium text-gray-500">
                    Priority
                  </TableHead>
                  <TableHead className="font-medium text-gray-500">
                    Location
                  </TableHead>
                  <TableHead className="font-medium text-gray-500">
                    Date
                  </TableHead>
                  <TableHead className="font-medium text-gray-500">
                    Assigned To
                  </TableHead>
                  <TableHead className="text-right font-medium text-gray-500">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow
                    key={report.id || report._id}
                    className="hover:bg-gray-50"
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedReports.includes(
                          report.id || report._id
                        )}
                        onCheckedChange={() =>
                          toggleSelectReport(report.id || report._id)
                        }
                        aria-label={`Select ${report.id || report._id}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {report.id || report._id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{report.title}</div>
                        <div className="text-xs text-gray-500">
                          {report.category}
                        </div>
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
                      {!report.assignedTo ? (
                        <span className="text-sm text-gray-500">
                          Unassigned
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-[#003A70] text-white">
                              {report.assignedTo
                                .split(" ")
                                .map((word: string) => word[0])
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/authority/reports/${
                                report.id || report._id
                              }`}
                            >
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUpdateReport(report)}
                          >
                            Update Report
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>
                            Quick Update Status
                          </DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(
                                report.id || report._id,
                                "Pending"
                              )
                            }
                          >
                            Set to Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(
                                report.id || report._id,
                                "Assigned"
                              )
                            }
                          >
                            Set to Assigned
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(
                                report.id || report._id,
                                "In Progress"
                              )
                            }
                          >
                            Set to In Progress
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(
                                report.id || report._id,
                                "Resolved"
                              )
                            }
                          >
                            Set to Resolved
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing <strong>1</strong> to{" "}
            <strong>{filteredReports.length}</strong> of{" "}
            <strong>{filteredReports.length}</strong> results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled
              className="border-[#003A70] text-[#003A70]"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 bg-[#003A70] text-white border-[#003A70]"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-[#003A70] text-[#003A70]"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-[#E6EEF4] border rounded-md p-4">
        <h2 className="font-bold text-[#003A70] mb-2">
          Report Management Notes
        </h2>
        <ul className="text-xs space-y-1 text-gray-700">
          <li>
            • Use the search and filter functions to find specific reports.
          </li>
          <li>• Filter by location to find reports in specific areas.</li>
          <li>
            • Select multiple reports to perform batch actions like assigning to
            teams.
          </li>
          <li>
            • Export reports to CSV or PDF for offline analysis or reporting.
          </li>
          <li>
            • Click on a report ID to view detailed information and update its
            status.
          </li>
        </ul>
      </div>

      {/* Update Report Modal */}
      {selectedReport && (
        <UpdateReportModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          reportId={selectedReport.id || selectedReport._id}
          currentStatus={selectedReport.status}
          currentAssignee={selectedReport.assignedTo}
          onSuccess={fetchReports}
        />
      )}
    </div>
  );
}
