"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Download, FileDown, Printer } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month")
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for analytics
  const overviewStats = {
    totalReports: 1248,
    resolvedReports: 982,
    pendingReports: 156,
    inProgressReports: 110,
    averageResolutionTime: "4.2 days",
    citizenSatisfaction: 87,
    reportIncrease: 12,
    resolutionRateIncrease: 8,
  }

  // Mock data for category distribution
  const categoryData = [
    { category: "Road Damage", count: 473, percentage: 38, change: 5 },
    { category: "Streetlights", count: 299, percentage: 24, change: -2 },
    { category: "Sanitation", count: 224, percentage: 18, change: 3 },
    { category: "Water/Drainage", count: 150, percentage: 12, change: 7 },
    { category: "Public Property", count: 100, percentage: 8, change: 1 },
  ]

  // Mock data for district distribution
  const districtData = [
    { district: "Downtown", count: 387, percentage: 31, change: 4 },
    { district: "North District", count: 274, percentage: 22, change: 6 },
    { district: "East District", count: 224, percentage: 18, change: -3 },
    { district: "South District", count: 187, percentage: 15, change: 2 },
    { district: "West District", count: 174, percentage: 14, change: 5 },
  ]

  // Mock data for resolution time
  const resolutionTimeData = [
    { category: "Road Damage", time: 5.2, previousTime: 5.9, change: -12 },
    { category: "Streetlights", time: 2.8, previousTime: 3.7, change: -24 },
    { category: "Sanitation", time: 1.5, previousTime: 1.6, change: -8 },
    { category: "Water/Drainage", time: 3.7, previousTime: 3.5, change: 5 },
    { category: "Public Property", time: 4.1, previousTime: 4.5, change: -9 },
  ]

  // Mock data for monthly reports
  const monthlyReportData = [
    { month: "January", total: 98, resolved: 92, pending: 6 },
    { month: "February", total: 112, resolved: 105, pending: 7 },
    { month: "March", total: 124, resolved: 115, pending: 9 },
    { month: "April", total: 136, resolved: 120, pending: 16 },
    { month: "May", total: 148, resolved: 125, pending: 23 },
    { month: "June", total: 156, resolved: 130, pending: 26 },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-md p-6">
        <h1 className="text-xl font-bold text-[#003A70] mb-4">Analytics Dashboard</h1>
        <p className="text-sm text-gray-600">
          Analyze infrastructure report data, track performance metrics, and identify trends to improve city services.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] border-gray-300">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last 3 Months</SelectItem>
              <SelectItem value="year">Last 12 Months</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 border-[#003A70] text-[#003A70]">
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </Button>
          <Button variant="outline" className="gap-2 border-[#003A70] text-[#003A70]">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewStats.totalReports}</div>
            <p className="text-xs text-gray-500">
              +{overviewStats.reportIncrease}% from previous {timeRange}
            </p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewStats.resolvedReports}</div>
            <p className="text-xs text-gray-500">
              +{overviewStats.resolutionRateIncrease}% from previous {timeRange}
            </p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewStats.pendingReports}</div>
            <p className="text-xs text-gray-500">
              {Math.round((overviewStats.pendingReports / overviewStats.totalReports) * 100)}% of total reports
            </p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Avg. Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewStats.averageResolutionTime}</div>
            <p className="text-xs text-gray-500">-0.3 days from previous {timeRange}</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white border rounded-md">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <div className="border-b">
            <TabsList className="w-full justify-start p-0 bg-transparent h-auto">
              <TabsTrigger
                value="overview"
                className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#003A70] data-[state=active]:text-[#003A70] data-[state=active]:shadow-none rounded-none bg-transparent"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#003A70] data-[state=active]:text-[#003A70] data-[state=active]:shadow-none rounded-none bg-transparent"
              >
                Categories
              </TabsTrigger>
              <TabsTrigger
                value="districts"
                className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#003A70] data-[state=active]:text-[#003A70] data-[state=active]:shadow-none rounded-none bg-transparent"
              >
                Districts
              </TabsTrigger>
              <TabsTrigger
                value="performance"
                className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#003A70] data-[state=active]:text-[#003A70] data-[state=active]:shadow-none rounded-none bg-transparent"
              >
                Performance
              </TabsTrigger>
              <TabsTrigger
                value="trends"
                className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#003A70] data-[state=active]:text-[#003A70] data-[state=active]:shadow-none rounded-none bg-transparent"
              >
                Trends
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-4 mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold mb-4">Report Status Distribution</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Resolved</span>
                      </div>
                      <span className="text-sm font-medium">
                        {Math.round((overviewStats.resolvedReports / overviewStats.totalReports) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(overviewStats.resolvedReports / overviewStats.totalReports) * 100}
                      className="h-2 bg-gray-100"
                      indicatorClassName="bg-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">In Progress</span>
                      </div>
                      <span className="text-sm font-medium">
                        {Math.round((overviewStats.inProgressReports / overviewStats.totalReports) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(overviewStats.inProgressReports / overviewStats.totalReports) * 100}
                      className="h-2 bg-gray-100"
                      indicatorClassName="bg-yellow-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                        <span className="text-sm">Pending</span>
                      </div>
                      <span className="text-sm font-medium">
                        {Math.round((overviewStats.pendingReports / overviewStats.totalReports) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(overviewStats.pendingReports / overviewStats.totalReports) * 100}
                      className="h-2 bg-gray-100"
                      indicatorClassName="bg-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-4">Monthly Report Volume</h3>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="font-medium text-gray-500">Month</TableHead>
                        <TableHead className="font-medium text-gray-500">Total</TableHead>
                        <TableHead className="font-medium text-gray-500">Resolved</TableHead>
                        <TableHead className="font-medium text-gray-500">Pending</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlyReportData.map((month) => (
                        <TableRow key={month.month} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{month.month}</TableCell>
                          <TableCell>{month.total}</TableCell>
                          <TableCell>{month.resolved}</TableCell>
                          <TableCell>{month.pending}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-bold mb-4">Citizen Satisfaction</h3>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-full border-8 border-[#003A70] flex items-center justify-center">
                  <span className="text-2xl font-bold">{overviewStats.citizenSatisfaction}%</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm mb-2">
                    Overall citizen satisfaction with infrastructure issue resolution is at{" "}
                    {overviewStats.citizenSatisfaction}%, which is 3% higher than the previous {timeRange}.
                  </p>
                  <p className="text-sm text-gray-500">
                    Based on feedback collected from citizens after issue resolution.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="p-4 mt-0">
            <h3 className="text-sm font-bold mb-4">Report Categories Distribution</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                {categoryData.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-[#003A70]"></div>
                        <span className="text-sm">{category.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{category.percentage}%</span>
                        <Badge
                          variant="outline"
                          className={`${
                            category.change > 0
                              ? "bg-green-100 text-green-800 border-green-300"
                              : "bg-red-100 text-red-800 border-red-300"
                          }`}
                        >
                          {category.change > 0 ? "+" : ""}
                          {category.change}%
                        </Badge>
                      </div>
                    </div>
                    <Progress
                      value={category.percentage}
                      className="h-2 bg-gray-100"
                      indicatorClassName="bg-[#003A70]"
                    />
                  </div>
                ))}
              </div>

              <div className="border rounded-md">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-medium text-gray-500">Category</TableHead>
                      <TableHead className="font-medium text-gray-500">Reports</TableHead>
                      <TableHead className="font-medium text-gray-500">Percentage</TableHead>
                      <TableHead className="font-medium text-gray-500">Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryData.map((category) => (
                      <TableRow key={category.category} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{category.category}</TableCell>
                        <TableCell>{category.count}</TableCell>
                        <TableCell>{category.percentage}%</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${
                              category.change > 0
                                ? "bg-green-100 text-green-800 border-green-300"
                                : "bg-red-100 text-red-800 border-red-300"
                            }`}
                          >
                            {category.change > 0 ? "+" : ""}
                            {category.change}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="districts" className="p-4 mt-0">
            <h3 className="text-sm font-bold mb-4">Report Distribution by District</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                {districtData.map((district) => (
                  <div key={district.district} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-[#003A70]"></div>
                        <span className="text-sm">{district.district}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{district.percentage}%</span>
                        <Badge
                          variant="outline"
                          className={`${
                            district.change > 0
                              ? "bg-green-100 text-green-800 border-green-300"
                              : "bg-red-100 text-red-800 border-red-300"
                          }`}
                        >
                          {district.change > 0 ? "+" : ""}
                          {district.change}%
                        </Badge>
                      </div>
                    </div>
                    <Progress
                      value={district.percentage}
                      className="h-2 bg-gray-100"
                      indicatorClassName="bg-[#003A70]"
                    />
                  </div>
                ))}
              </div>

              <div className="border rounded-md">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-medium text-gray-500">District</TableHead>
                      <TableHead className="font-medium text-gray-500">Reports</TableHead>
                      <TableHead className="font-medium text-gray-500">Percentage</TableHead>
                      <TableHead className="font-medium text-gray-500">Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {districtData.map((district) => (
                      <TableRow key={district.district} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{district.district}</TableCell>
                        <TableCell>{district.count}</TableCell>
                        <TableCell>{district.percentage}%</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${
                              district.change > 0
                                ? "bg-green-100 text-green-800 border-green-300"
                                : "bg-red-100 text-red-800 border-red-300"
                            }`}
                          >
                            {district.change > 0 ? "+" : ""}
                            {district.change}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="p-4 mt-0">
            <h3 className="text-sm font-bold mb-4">Resolution Performance by Category</h3>
            <div className="border rounded-md">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-medium text-gray-500">Category</TableHead>
                    <TableHead className="font-medium text-gray-500">Avg. Resolution Time</TableHead>
                    <TableHead className="font-medium text-gray-500">Previous Period</TableHead>
                    <TableHead className="font-medium text-gray-500">Change</TableHead>
                    <TableHead className="font-medium text-gray-500">Efficiency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resolutionTimeData.map((item) => (
                    <TableRow key={item.category} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{item.category}</TableCell>
                      <TableCell>{item.time} days</TableCell>
                      <TableCell>{item.previousTime} days</TableCell>
                      <TableCell className={item.change < 0 ? "text-green-600" : "text-red-600"}>
                        {item.change}%
                      </TableCell>
                      <TableCell>
                        <Progress
                          value={100 - (item.time / 7) * 100}
                          className="h-2 w-24"
                          indicatorClassName={
                            item.time < 3 ? "bg-green-500" : item.time < 5 ? "bg-blue-500" : "bg-yellow-500"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold mb-4">Resolution Rate</h3>
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold">
                        {Math.round((overviewStats.resolvedReports / overviewStats.totalReports) * 100)}%
                      </div>
                      <div className="text-sm text-gray-500">Overall resolution rate</div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                      +{overviewStats.resolutionRateIncrease}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    The resolution rate has improved by {overviewStats.resolutionRateIncrease}% compared to the previous{" "}
                    {timeRange}, indicating more efficient issue handling and team performance.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-4">Average Response Time</h3>
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold">1.2 days</div>
                      <div className="text-sm text-gray-500">Initial response time</div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                      -15%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    The average time between report submission and initial assessment has decreased by 15% compared to
                    the previous {timeRange}, showing improved responsiveness.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="p-4 mt-0">
            <h3 className="text-sm font-bold mb-4">Monthly Report Trends</h3>
            <div className="border rounded-md p-4">
              <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md mb-4">
                <p className="text-gray-500">Monthly report trend chart would be displayed here</p>
              </div>
              <p className="text-sm text-gray-600">
                The chart above shows the trend of reports submitted over the past 6 months, broken down by category.
                There has been a steady increase in overall reports, with Road Damage consistently being the most
                reported issue.
              </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold mb-4">Seasonal Patterns</h3>
                <div className="border rounded-md p-4">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 text-left font-medium text-gray-500">Season</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-500">Top Issue</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-500">Volume</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-3 px-4">Spring</td>
                        <td className="py-3 px-4">Road Damage</td>
                        <td className="py-3 px-4">High</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Summer</td>
                        <td className="py-3 px-4">Water/Drainage</td>
                        <td className="py-3 px-4">Medium</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Fall</td>
                        <td className="py-3 px-4">Streetlights</td>
                        <td className="py-3 px-4">Medium</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Winter</td>
                        <td className="py-3 px-4">Road Damage</td>
                        <td className="py-3 px-4">Very High</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-4">Year-over-Year Comparison</h3>
                <div className="border rounded-md p-4">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 text-left font-medium text-gray-500">Metric</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-500">Current Year</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-500">Previous Year</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-500">Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-3 px-4">Total Reports</td>
                        <td className="py-3 px-4">1,248</td>
                        <td className="py-3 px-4">1,087</td>
                        <td className="py-3 px-4 text-green-600">+14.8%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Resolution Rate</td>
                        <td className="py-3 px-4">78.7%</td>
                        <td className="py-3 px-4">72.3%</td>
                        <td className="py-3 px-4 text-green-600">+6.4%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Avg. Resolution Time</td>
                        <td className="py-3 px-4">4.2 days</td>
                        <td className="py-3 px-4">5.1 days</td>
                        <td className="py-3 px-4 text-green-600">-17.6%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Citizen Satisfaction</td>
                        <td className="py-3 px-4">87%</td>
                        <td className="py-3 px-4">81%</td>
                        <td className="py-3 px-4 text-green-600">+6.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-white border rounded-md p-4">
        <h3 className="text-sm font-bold mb-4">Generate Reports</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <FileDown className="h-5 w-5 text-[#003A70]" />
              <h4 className="font-bold text-[#003A70]">Monthly Summary</h4>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Generate a comprehensive monthly report with key metrics and trends.
            </p>
            <Button variant="outline" size="sm" className="w-full border-[#003A70] text-[#003A70]">
              Generate
            </Button>
          </div>
          <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <FileDown className="h-5 w-5 text-[#003A70]" />
              <h4 className="font-bold text-[#003A70]">Category Analysis</h4>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Detailed breakdown of reports by category with resolution metrics.
            </p>
            <Button variant="outline" size="sm" className="w-full border-[#003A70] text-[#003A70]">
              Generate
            </Button>
          </div>
          <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <FileDown className="h-5 w-5 text-[#003A70]" />
              <h4 className="font-bold text-[#003A70]">Team Performance</h4>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Analysis of team performance metrics and workload distribution.
            </p>
            <Button variant="outline" size="sm" className="w-full border-[#003A70] text-[#003A70]">
              Generate
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-[#E6EEF4] border rounded-md p-4">
        <h2 className="font-bold text-[#003A70] mb-2">Analytics Notes</h2>
        <ul className="text-xs space-y-1 text-gray-700">
          <li>• Data is updated daily at midnight.</li>
          <li>• Reports can be exported in PDF, CSV, or Excel formats.</li>
          <li>• Historical data is available for the past 5 years.</li>
          <li>• For custom analytics requests, please contact the IT department.</li>
        </ul>
      </div>
    </div>
  )
}
