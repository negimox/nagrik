"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle, MapPin } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ReportIssuePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [location, setLocation] = useState("")
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  const handleGetLocation = () => {
    setIsGettingLocation(true)
    // Simulate geolocation
    setTimeout(() => {
      setLocation("123 Main St, Downtown")
      setIsGettingLocation(false)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Redirect after success
      setTimeout(() => {
        router.push("/citizen/dashboard")
      }, 2000)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-white border rounded-md p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-xl font-bold text-[#003A70]">Report Submitted Successfully</h1>
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
            You can check the progress of your report on the "My Reports" page. You will also receive email
            notifications when there are updates.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col space-y-3">
          <Button className="bg-[#003A70] hover:bg-[#004d94]" asChild>
            <Link href="/citizen/reports">View My Reports</Link>
          </Button>
          <Button variant="outline" className="border-[#003A70] text-[#003A70]" asChild>
            <Link href="/citizen/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
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
                  step >= 1 ? "bg-[#003A70] text-white" : "border border-gray-300 text-gray-500"
                }`}
              >
                1
              </div>
              <span className={step >= 1 ? "font-medium" : "text-gray-500"}>Issue Details</span>
            </div>
            <div className="h-px flex-1 bg-gray-200 mx-4" />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                  step >= 2 ? "bg-[#003A70] text-white" : "border border-gray-300 text-gray-500"
                }`}
              >
                2
              </div>
              <span className={step >= 2 ? "font-medium" : "text-gray-500"}>Location & Photos</span>
            </div>
            <div className="h-px flex-1 bg-gray-200 mx-4" />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                  step >= 3 ? "bg-[#003A70] text-white" : "border border-gray-300 text-gray-500"
                }`}
              >
                3
              </div>
              <span className={step >= 3 ? "font-medium" : "text-gray-500"}>Review</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-bold">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
                  <SelectTrigger id="category" className="border-gray-300">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="road">Road Damage</SelectItem>
                    <SelectItem value="streetlight">Broken Streetlight</SelectItem>
                    <SelectItem value="garbage">Garbage/Sanitation</SelectItem>
                    <SelectItem value="water">Water/Drainage Issue</SelectItem>
                    <SelectItem value="property">Damaged Public Property</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-bold">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input id="title" placeholder="Example: Pothole on Main Street" required className="border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-bold">
                  Details <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Please provide details about the issue..."
                  className="min-h-32 border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity" className="text-sm font-bold">
                  Severity
                </Label>
                <Select>
                  <SelectTrigger id="severity" className="border-gray-300">
                    <SelectValue placeholder="Select severity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Not urgent</SelectItem>
                    <SelectItem value="medium">Medium - Needs attention</SelectItem>
                    <SelectItem value="high">High - Safety concern</SelectItem>
                    <SelectItem value="critical">Critical - Dangerous condition</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" className="border-[#003A70] text-[#003A70]" asChild>
                  <Link href="/citizen/dashboard">Cancel</Link>
                </Button>
                <Button type="button" onClick={() => setStep(2)} className="bg-[#003A70] hover:bg-[#004d94]">
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-bold">
                  Location <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    placeholder="Address or location description"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1 border-gray-300"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#003A70] text-[#003A70]"
                    onClick={handleGetLocation}
                    disabled={isGettingLocation}
                  >
                    {isGettingLocation ? "Getting..." : <MapPin className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Click the "Get Location" button to automatically detect your current location.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold">Photos/Videos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">Upload Photos or Videos</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Please attach photos or videos to help us better understand the issue.
                  </p>
                  <Button className="mt-4 bg-[#003A70] hover:bg-[#004d94]">Choose Files</Button>
                  <p className="text-xs text-gray-500 mt-2">JPG, PNG, MP4 formats accepted, up to 10MB per file.</p>
                </div>
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
                <Button type="button" onClick={() => setStep(3)} className="bg-[#003A70] hover:bg-[#004d94]">
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
                      {selectedCategory
                        ? selectedCategory === "road"
                          ? "Road Damage"
                          : selectedCategory === "streetlight"
                            ? "Broken Streetlight"
                            : selectedCategory === "garbage"
                              ? "Garbage/Sanitation"
                              : selectedCategory === "water"
                                ? "Water/Drainage Issue"
                                : selectedCategory === "property"
                                  ? "Damaged Public Property"
                                  : "Other"
                        : "Not selected"}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-700">Location</div>
                    <div>{location || "Not provided"}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="font-bold text-gray-700">Title</div>
                    <div>Road Pothole</div>
                  </div>
                  <div className="col-span-2">
                    <div className="font-bold text-gray-700">Details</div>
                    <div>
                      There is a pothole approximately 10cm deep on Main Street sidewalk. It poses a tripping hazard for
                      pedestrians. It appears to have been there for about a week.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border rounded-md p-4">
                <h3 className="font-bold text-sm mb-3">Attachments</h3>
                <div className="text-center text-sm text-gray-500">No attachments</div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Please Note</AlertTitle>
                <AlertDescription>
                  By submitting this report, your information will be reviewed by the relevant city department. Please
                  ensure your report is accurate and does not contain false information.
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
                <Button type="submit" className="bg-[#003A70] hover:bg-[#004d94]" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="bg-[#E6EEF4] border rounded-md p-4">
        <h2 className="font-bold text-[#003A70] mb-2">Reporting Guidelines</h2>
        <ul className="text-xs space-y-1 text-gray-700">
          <li>• Please do not include personal information in your reports.</li>
          <li>• For urgent or dangerous situations, please contact City Hall directly at (123) 456-7890.</li>
          <li>• Please provide location information as accurately as possible.</li>
          <li>• Photos and videos help us assess and address the issue more efficiently.</li>
        </ul>
      </div>
    </div>
  )
}
