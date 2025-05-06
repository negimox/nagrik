import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Filter, MapPin, MoreHorizontal, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AuthorityDashboard() {
  // Mock data for recent reports
  const recentReports = [
    {
      id: "REP-1234",
      title: "Pothole on Main Street",
      category: "Road Damage",
      status: "In Progress",
      date: "2 days ago",
      location: "Main St & 5th Ave",
      priority: "High",
      assignedTo: "Road Maintenance Team",
    },
    {
      id: "REP-1235",
      title: "Broken Streetlight",
      category: "Streetlight",
      status: "Assigned",
      date: "3 days ago",
      location: "Park Avenue",
      priority: "Medium",
      assignedTo: "Electrical Team",
    },
    {
      id: "REP-1236",
      title: "Overflowing Trash Bin",
      category: "Sanitation",
      status: "Pending",
      date: "1 day ago",
      location: "Central Park",
      priority: "Low",
      assignedTo: "Unassigned",
    },
    {
      id: "REP-1237",
      title: "Water Leakage",
      category: "Water/Drainage",
      status: "Pending",
      date: "5 hours ago",
      location: "Downtown",
      priority: "High",
      assignedTo: "Unassigned",
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
        <h1 className="text-xl font-bold text-[#003A70] mb-4">Authority Dashboard</h1>
        <p className="text-sm text-gray-600">
          Monitor and manage infrastructure reports across the city. View statistics, assign tasks, and track resolution
          progress.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">182</div>
            <p className="text-xs text-gray-500">+8% from last month</p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">66</div>
            <p className="text-xs text-gray-500">+4% from last month</p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,024</div>
            <p className="text-xs text-gray-500">+18% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white border rounded-md">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-bold text-[#003A70]">Recent Reports</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search reports..."
                className="h-9 w-[200px] rounded-md border border-gray-300 bg-white pl-8 pr-3 text-sm"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 gap-1 border-[#003A70] text-[#003A70]">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-medium text-gray-500">ID</TableHead>
              <TableHead className="font-medium text-gray-500">Issue</TableHead>
              <TableHead className="font-medium text-gray-500">Status</TableHead>
              <TableHead className="font-medium text-gray-500">Priority</TableHead>
              <TableHead className="font-medium text-gray-500">Location</TableHead>
              <TableHead className="font-medium text-gray-500">Assigned To</TableHead>
              <TableHead className="text-right font-medium text-gray-500">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentReports.map((report) => (
              <TableRow key={report.id} className="hover:bg-gray-50">
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
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
        <div className="p-4 text-center border-t">
          <Button variant="outline" size="sm" className="border-[#003A70] text-[#003A70]" asChild>
            <Link href="/authority/reports">View All Reports</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white border rounded-md">
          <div className="p-4 border-b">
            <h2 className="font-bold text-[#003A70]">Issue Categories</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#003A70]"></div>
                  <span className="text-sm">Road Damage</span>
                </div>
                <span className="text-sm font-medium">38%</span>
              </div>
              <Progress value={38} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Streetlights</span>
                </div>
                <span className="text-sm font-medium">24%</span>
              </div>
              <Progress value={24} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Sanitation</span>
                </div>
                <span className="text-sm font-medium">18%</span>
              </div>
              <Progress value={18} className="h-2 bg-green-100" indicatorClassName="bg-green-500" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Water/Drainage</span>
                </div>
                <span className="text-sm font-medium">12%</span>
              </div>
              <Progress value={12} className="h-2 bg-yellow-100" indicatorClassName="bg-yellow-500" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Public Property</span>
                </div>
                <span className="text-sm font-medium">8%</span>
              </div>
              <Progress value={8} className="h-2 bg-red-100" indicatorClassName="bg-red-500" />
            </div>
          </div>
          <div className="p-4 text-center border-t">
            <Button variant="outline" size="sm" className="border-[#003A70] text-[#003A70]" asChild>
              <Link href="/authority/analytics">View Detailed Analytics</Link>
            </Button>
          </div>
        </div>

        <div className="bg-white border rounded-md">
          <div className="p-4 border-b">
            <h2 className="font-bold text-[#003A70]">Team Performance</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-[#003A70] text-white">RT</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Road Team</p>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-[#003A70] text-white">ET</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Electrical Team</p>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-[#003A70] text-white">ST</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Sanitation Team</p>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-[#003A70] text-white">WT</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Water Team</p>
                  <span className="text-sm font-medium">64%</span>
                </div>
                <Progress value={64} className="h-2" />
              </div>
            </div>
          </div>
          <div className="p-4 text-center border-t">
            <Button variant="outline" size="sm" className="border-[#003A70] text-[#003A70]" asChild>
              <Link href="/authority/teams">View Team Details</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white border rounded-md">
          <div className="p-4 border-b">
            <h2 className="font-bold text-[#003A70]">Resolution Performance</h2>
          </div>
          <div className="p-4">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 text-left font-medium text-gray-500">Category</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-500">Avg. Time</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-500">Change</th>
                  <th className="py-2 px-4 text-left font-medium text-gray-500">Efficiency</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 px-4">Road Damage</td>
                  <td className="py-3 px-4">5.2 days</td>
                  <td className="py-3 px-4 text-green-600">-12%</td>
                  <td className="py-3 px-4">
                    <Progress value={68} className="h-2 w-24" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Streetlights</td>
                  <td className="py-3 px-4">2.8 days</td>
                  <td className="py-3 px-4 text-green-600">-24%</td>
                  <td className="py-3 px-4">
                    <Progress value={85} className="h-2 w-24" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Sanitation</td>
                  <td className="py-3 px-4">1.5 days</td>
                  <td className="py-3 px-4 text-green-600">-8%</td>
                  <td className="py-3 px-4">
                    <Progress value={92} className="h-2 w-24" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Water/Drainage</td>
                  <td className="py-3 px-4">3.7 days</td>
                  <td className="py-3 px-4 text-red-600">+5%</td>
                  <td className="py-3 px-4">
                    <Progress value={74} className="h-2 w-24" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 text-center border-t">
            <Button variant="outline" size="sm" className="border-[#003A70] text-[#003A70]" asChild>
              <Link href="/authority/analytics">View Detailed Analytics</Link>
            </Button>
          </div>
        </div>

        <div className="bg-white border rounded-md">
          <div className="p-4 border-b">
            <h2 className="font-bold text-[#003A70]">Recent Activities</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#003A70] text-white text-xs">JD</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">John Doe</span> assigned{" "}
                    <span className="text-[#003A70]">REP-1234</span> to Road Maintenance Team
                  </p>
                  <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#003A70] text-white text-xs">JS</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Jane Smith</span> updated status of{" "}
                    <span className="text-[#003A70]">REP-1230</span> to Resolved
                  </p>
                  <p className="text-xs text-gray-500">Today, 9:15 AM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#003A70] text-white text-xs">RJ</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Robert Johnson</span> added a note to{" "}
                    <span className="text-[#003A70]">REP-1228</span>
                  </p>
                  <p className="text-xs text-gray-500">Yesterday, 4:45 PM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#003A70] text-white text-xs">ML</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Mary Lee</span> created a new report{" "}
                    <span className="text-[#003A70]">REP-1237</span>
                  </p>
                  <p className="text-xs text-gray-500">Yesterday, 2:30 PM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 text-center border-t">
            <Button variant="outline" size="sm" className="border-[#003A70] text-[#003A70]" asChild>
              <Link href="/authority/activity">View All Activities</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-[#E6EEF4] border rounded-md p-4">
        <h2 className="font-bold text-[#003A70] mb-2">System Notes</h2>
        <ul className="text-xs space-y-1 text-gray-700">
          <li>• Reports are automatically prioritized based on severity and location.</li>
          <li>• Team assignments should be completed within 24 hours of report submission.</li>
          <li>• Please update report statuses promptly to maintain accurate system data.</li>
          <li>• For technical assistance, please contact the IT department at extension 4567.</li>
        </ul>
      </div>
    </div>
  )
}
