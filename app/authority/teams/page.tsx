"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, MoreHorizontal, Plus, Search, Users } from "lucide-react";

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for teams
  const teams = [
    {
      id: "team-001",
      name: "Road Maintenance Department",
      department: "Public Works",
      members: 8,
      activeReports: 12,
      completedReports: 87,
      performance: 78,
      lead: {
        name: "Takashi Yamamoto",
        position: "Senior Engineer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "infrastructure",
    },
    {
      id: "team-002",
      name: "Public Works Department",
      department: "Utilities",
      members: 6,
      activeReports: 5,
      completedReports: 64,
      performance: 92,
      lead: {
        name: "Haruki Nakamura",
        position: "Chief Electrician",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "utilities",
    },
    {
      id: "team-003",
      name: "Urban Development Department",
      department: "Public Health",
      members: 12,
      activeReports: 8,
      completedReports: 103,
      performance: 85,
      lead: {
        name: "Yuki Tanaka",
        position: "Sanitation Director",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "sanitation",
    },
    {
      id: "team-004",
      name: "Water Management Department",
      department: "Utilities",
      members: 7,
      activeReports: 9,
      completedReports: 56,
      performance: 64,
      lead: {
        name: "Kenji Sato",
        position: "Water Systems Engineer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "utilities",
    },
    {
      id: "team-005",
      name: "Parks & Recreation Department",
      department: "Parks",
      members: 9,
      activeReports: 7,
      completedReports: 42,
      performance: 76,
      lead: {
        name: "Akiko Suzuki",
        position: "Parks Director",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "parks",
    },
    {
      id: "team-006",
      name: "Traffic Management Department",
      department: "Transportation",
      members: 5,
      activeReports: 11,
      completedReports: 73,
      performance: 81,
      lead: {
        name: "Hiroshi Watanabe",
        position: "Traffic Engineer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "transportation",
    },
    {
      id: "team-007",
      name: "Building Inspection Department",
      department: "Public Works",
      members: 4,
      activeReports: 6,
      completedReports: 38,
      performance: 88,
      lead: {
        name: "Masako Ito",
        position: "Chief Inspector",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "infrastructure",
    },
    {
      id: "team-008",
      name: "Emergency Response Department",
      department: "Public Safety",
      members: 15,
      activeReports: 3,
      completedReports: 29,
      performance: 95,
      lead: {
        name: "Taro Kobayashi",
        position: "Emergency Coordinator",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      category: "emergency",
    },
  ];

  // Filter teams based on search query and active tab
  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.lead.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return matchesSearch && team.category === activeTab;
  });

  // Helper function to get performance color
  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "bg-green-500";
    if (performance >= 75) return "bg-blue-500";
    if (performance >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-md p-6">
        <h1 className="text-xl font-bold text-[#003A70] mb-4">
          Teams Management
        </h1>
        <p className="text-sm text-gray-600">
          Manage and monitor all teams responsible for infrastructure
          maintenance and issue resolution.
        </p>
      </div>

      <div className="bg-white border rounded-md p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search teams..."
                className="pl-8 w-full border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="border-[#003A70] text-[#003A70]"
            >
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
          <div>
            <Button className="gap-2 bg-[#003A70] hover:bg-[#004d94]">
              <Plus className="h-4 w-4" />
              <span>Add Team</span>
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full justify-start p-0 bg-transparent h-auto border-b mb-4">
            <TabsTrigger
              value="all"
              className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#003A70] data-[state=active]:text-[#003A70] data-[state=active]:shadow-none rounded-none bg-transparent"
            >
              All Teams
            </TabsTrigger>
            <TabsTrigger
              value="infrastructure"
              className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#003A70] data-[state=active]:text-[#003A70] data-[state=active]:shadow-none rounded-none bg-transparent"
            >
              Infrastructure
            </TabsTrigger>
            <TabsTrigger
              value="utilities"
              className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#003A70] data-[state=active]:text-[#003A70] data-[state=active]:shadow-none rounded-none bg-transparent"
            >
              Utilities
            </TabsTrigger>
            <TabsTrigger
              value="sanitation"
              className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#003A70] data-[state=active]:text-[#003A70] data-[state=active]:shadow-none rounded-none bg-transparent"
            >
              Sanitation
            </TabsTrigger>
            <TabsTrigger
              value="parks"
              className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#003A70] data-[state=active]:text-[#003A70] data-[state=active]:shadow-none rounded-none bg-transparent"
            >
              Parks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-medium text-gray-500">
                      Team Name
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Department
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Team Lead
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Members
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Active Reports
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Performance
                    </TableHead>
                    <TableHead className="text-right font-medium text-gray-500">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.map((team) => (
                    <TableRow key={team.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>{team.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={team.lead.avatar || "/placeholder.svg"}
                              alt={team.lead.name}
                            />
                            <AvatarFallback className="bg-[#003A70] text-white">
                              {team.lead.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">
                              {team.lead.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {team.lead.position}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-gray-400" />
                          <span>{team.members}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-800 border-blue-300"
                        >
                          {team.activeReports}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={team.performance}
                            className={`h-2 w-24 [&>div]:${getPerformanceColor(
                              team.performance
                            )}`}
                          />
                          <span className="text-sm font-medium">
                            {team.performance}%
                          </span>
                        </div>
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
                              <Link href={`/authority/teams/${team.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Team</DropdownMenuItem>
                            <DropdownMenuItem>Manage Members</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              View Assigned Reports
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* The other tab contents would use the same table structure but with filtered data */}
          <TabsContent value="infrastructure" className="mt-0">
            {/* Same table structure as above, but only showing infrastructure teams */}
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-medium text-gray-500">
                      Team Name
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Department
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Team Lead
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Members
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Active Reports
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Performance
                    </TableHead>
                    <TableHead className="text-right font-medium text-gray-500">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.map((team) => (
                    <TableRow key={team.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>{team.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={team.lead.avatar || "/placeholder.svg"}
                              alt={team.lead.name}
                            />
                            <AvatarFallback className="bg-[#003A70] text-white">
                              {team.lead.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">
                              {team.lead.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {team.lead.position}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-gray-400" />
                          <span>{team.members}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-800 border-blue-300"
                        >
                          {team.activeReports}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={team.performance}
                            className={`h-2 w-24 [&>div]:${getPerformanceColor(
                              team.performance
                            )}`}
                          />
                          <span className="text-sm font-medium">
                            {team.performance}%
                          </span>
                        </div>
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
                              <Link href={`/authority/teams/${team.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Team</DropdownMenuItem>
                            <DropdownMenuItem>Manage Members</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              View Assigned Reports
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Similar TabsContent for utilities, sanitation, and parks */}
          <TabsContent value="utilities" className="mt-0">
            {/* Same table structure but filtered for utilities teams */}
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-medium text-gray-500">
                      Team Name
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Department
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Team Lead
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Members
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Active Reports
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Performance
                    </TableHead>
                    <TableHead className="text-right font-medium text-gray-500">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.map((team) => (
                    <TableRow key={team.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>{team.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={team.lead.avatar || "/placeholder.svg"}
                              alt={team.lead.name}
                            />
                            <AvatarFallback className="bg-[#003A70] text-white">
                              {team.lead.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">
                              {team.lead.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {team.lead.position}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-gray-400" />
                          <span>{team.members}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-800 border-blue-300"
                        >
                          {team.activeReports}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={team.performance}
                            className={`h-2 w-24 [&>div]:${getPerformanceColor(
                              team.performance
                            )}`}
                          />
                          <span className="text-sm font-medium">
                            {team.performance}%
                          </span>
                        </div>
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
                              <Link href={`/authority/teams/${team.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Team</DropdownMenuItem>
                            <DropdownMenuItem>Manage Members</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              View Assigned Reports
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="sanitation" className="mt-0">
            {/* Same table structure but filtered for sanitation teams */}
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-medium text-gray-500">
                      Team Name
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Department
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Team Lead
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Members
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Active Reports
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Performance
                    </TableHead>
                    <TableHead className="text-right font-medium text-gray-500">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.map((team) => (
                    <TableRow key={team.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>{team.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={team.lead.avatar || "/placeholder.svg"}
                              alt={team.lead.name}
                            />
                            <AvatarFallback className="bg-[#003A70] text-white">
                              {team.lead.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">
                              {team.lead.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {team.lead.position}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-gray-400" />
                          <span>{team.members}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-800 border-blue-300"
                        >
                          {team.activeReports}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={team.performance}
                            className={`h-2 w-24 [&>div]:${getPerformanceColor(
                              team.performance
                            )}`}
                          />
                          <span className="text-sm font-medium">
                            {team.performance}%
                          </span>
                        </div>
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
                              <Link href={`/authority/teams/${team.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Team</DropdownMenuItem>
                            <DropdownMenuItem>Manage Members</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              View Assigned Reports
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="parks" className="mt-0">
            {/* Same table structure but filtered for parks teams */}
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-medium text-gray-500">
                      Team Name
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Department
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Team Lead
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Members
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Active Reports
                    </TableHead>
                    <TableHead className="font-medium text-gray-500">
                      Performance
                    </TableHead>
                    <TableHead className="text-right font-medium text-gray-500">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.map((team) => (
                    <TableRow key={team.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>{team.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={team.lead.avatar || "/placeholder.svg"}
                              alt={team.lead.name}
                            />
                            <AvatarFallback className="bg-[#003A70] text-white">
                              {team.lead.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">
                              {team.lead.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {team.lead.position}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-gray-400" />
                          <span>{team.members}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-800 border-blue-300"
                        >
                          {team.activeReports}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={team.performance}
                            className={`h-2 w-24 [&>div]:${getPerformanceColor(
                              team.performance
                            )}`}
                          />
                          <span className="text-sm font-medium">
                            {team.performance}%
                          </span>
                        </div>
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
                              <Link href={`/authority/teams/${team.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Team</DropdownMenuItem>
                            <DropdownMenuItem>Manage Members</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              View Assigned Reports
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">
              Team Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teams
                .sort((a, b) => b.performance - a.performance)
                .slice(0, 5)
                .map((team) => (
                  <div key={team.id} className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#003A70] text-white">
                        {team.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{team.name}</p>
                        <span className="text-sm font-medium">
                          {team.performance}%
                        </span>
                      </div>
                      <Progress
                        value={team.performance}
                        className={`h-2 [&>div]:${getPerformanceColor(
                          team.performance
                        )}`}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">
              Team Workload Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teams
                .sort((a, b) => b.activeReports - a.activeReports)
                .slice(0, 5)
                .map((team) => (
                  <div key={team.id} className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#003A70] text-white">
                        {team.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{team.name}</p>
                        <span className="text-sm font-medium">
                          {team.activeReports} active
                        </span>
                      </div>
                      <Progress
                        value={(team.activeReports / 15) * 100}
                        className="h-2 [&>div]:bg-blue-500"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-[#E6EEF4] border rounded-md p-4">
        <h2 className="font-bold text-[#003A70] mb-2">Team Management Notes</h2>
        <ul className="text-xs space-y-1 text-gray-700">
          <li>
            • Teams are evaluated based on resolution time, quality of work, and
            citizen feedback.
          </li>
          <li>
            • Performance metrics are updated weekly based on completed reports.
          </li>
          <li>
            • Team leads are responsible for assigning tasks to team members.
          </li>
          <li>
            • For team-related inquiries, please contact the Department
            Administration Office.
          </li>
        </ul>
      </div>
    </div>
  );
}
