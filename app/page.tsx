import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header with government emblem */}
      <Header />

      {/* Secondary navigation */}
      <div className="bg-[#F0F0F0] border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex text-xs gap-4">
            <Link href="/" className="text-[#003A70] font-bold">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:underline">
              About
            </Link>
            <Link href="/faq" className="text-gray-600 hover:underline">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-600 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-[#E6EEF4] py-8 border-b">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-block bg-[#003A70] text-white px-3 py-1 text-sm font-bold">
                Citizen Participation
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#003A70]">
                City Infrastructure Monitoring System
                <span className="block text-lg font-normal mt-2">
                  Report and track infrastructure issues
                </span>
              </h1>
              <p className="text-sm leading-relaxed">
                Easily report and track infrastructure issues in your city, such
                as road damage, broken streetlights, and sanitation problems.
                Together, citizens and authorities can build a better community.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link href="/auth/register">
                  <Button className="bg-[#003A70] hover:bg-[#004d94]">
                    Register
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    className="border-[#003A70] text-[#003A70]"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-white p-4 border rounded-md">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Infrastructure monitoring system diagram"
                width={500}
                height={300}
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Information blocks */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-[#003A70] mb-6 pb-2 border-b-2 border-[#003A70]">
              How the System Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border rounded-md bg-white p-4">
                <div className="bg-[#003A70] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-3">
                  1
                </div>
                <h3 className="font-bold mb-2">Report Issues</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Report infrastructure problems you find in the city, such as
                  road damage, broken streetlights, or sanitation issues, with
                  photos and location data.
                </p>
              </div>
              <div className="border rounded-md bg-white p-4">
                <div className="bg-[#003A70] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-3">
                  2
                </div>
                <h3 className="font-bold mb-2">Track Progress</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Monitor the status of your reports in real-time. Track the
                  entire process transparently from assignment to resolution.
                </p>
              </div>
              <div className="border rounded-md bg-white p-4">
                <div className="bg-[#003A70] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-3">
                  3
                </div>
                <h3 className="font-bold mb-2">See Results</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Receive notifications when issues are resolved, with photos of
                  the repairs. Citizen cooperation enables more efficient city
                  management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* News and updates */}
        <section className="py-8 bg-[#F0F0F0]">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-[#003A70] mb-6 pb-2 border-b-2 border-[#003A70]">
              Announcements
            </h2>
            <div className="bg-white border rounded-md">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 border-r w-32">May 1, 2023</td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-[#003A70] text-white px-2 py-0.5 text-xs mr-2">
                        NEW
                      </span>
                      <Link href="#" className="text-[#003A70] hover:underline">
                        System upgrade has been implemented
                      </Link>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 border-r w-32">April 15, 2023</td>
                    <td className="py-3 px-4">
                      <Link href="#" className="text-[#003A70] hover:underline">
                        Seeking citizen feedback on road repair efficiency
                        improvements
                      </Link>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 border-r w-32">April 1, 2023</td>
                    <td className="py-3 px-4">
                      <Link href="#" className="text-[#003A70] hover:underline">
                        Information session on using the Infrastructure
                        Monitoring System
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-r w-32">March 20, 2023</td>
                    <td className="py-3 px-4">
                      <Link href="#" className="text-[#003A70] hover:underline">
                        System operation has begun
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="p-3 text-right">
                <Link
                  href="/news"
                  className="text-[#003A70] text-sm hover:underline flex items-center justify-end"
                >
                  View all announcements
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-[#003A70] mb-6 pb-2 border-b-2 border-[#003A70]">
              System Statistics
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="border rounded-md bg-white p-4 text-center">
                <div className="text-3xl font-bold text-[#003A70]">1,248</div>
                <div className="text-sm text-gray-600">Total Reports</div>
              </div>
              <div className="border rounded-md bg-white p-4 text-center">
                <div className="text-3xl font-bold text-[#003A70]">982</div>
                <div className="text-sm text-gray-600">Resolved</div>
              </div>
              <div className="border rounded-md bg-white p-4 text-center">
                <div className="text-3xl font-bold text-[#003A70]">156</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="border rounded-md bg-white p-4 text-center">
                <div className="text-3xl font-bold text-[#003A70]">3,542</div>
                <div className="text-sm text-gray-600">Registered Users</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#003A70] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
                  <div className="h-6 w-6 bg-[#003A70] rounded-full flex items-center justify-center text-white font-bold text-[10px]">
                    NAGRIK
                  </div>
                </div>
                <div className="text-sm font-bold">City Government</div>
              </div>
              <p className="text-xs">
                123 Main Street
                <br />
                Cityville, State 12345
                <br />
                TEL: 123-456-7890
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-3">Related Links</h3>
              <ul className="text-xs space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    City Website
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Emergency Information
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Waste Collection Calendar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Public Facility Reservations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-3">User Guide</h3>
              <ul className="text-xs space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    How to Use
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-3">Legal Information</h3>
              <ul className="text-xs space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Copyright
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-white/20 text-xs text-center">
            © {new Date().getFullYear()} City Government - Infrastructure
            Monitoring System. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
