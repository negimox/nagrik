import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/citizen/dashboard" },
  { name: "Report Issue", href: "/citizen/report" },
  { name: "My Reports", href: "/citizen/reports" },
  { name: "Map", href: "/citizen/map" },
  { name: "Notifications", href: "/citizen/notifications" },
  { name: "Help", href: "/citizen/help" },
]

export default function CitizenLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F0F0F0]">
      {/* Header */}
      <header className="bg-[#003A70] text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
              <div className="h-8 w-8 bg-[#003A70] rounded-full flex items-center justify-center text-white font-bold text-xs">
                CITY
              </div>
            </div>
            <div>
              <div className="text-xs">City Government</div>
              <div className="font-bold">Infrastructure Monitoring System</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-sm">
              <span className="text-xs block">Welcome</span>
              <span className="font-bold">John Smith</span>
            </div>
            <Link href="/auth/login">
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-[#004d94]">
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap hover:text-[#003A70] hover:border-[#003A70] transition-colors"
                style={{
                  borderColor: item.href === "/citizen/dashboard" ? "#003A70" : "transparent",
                  color: item.href === "/citizen/dashboard" ? "#003A70" : "inherit",
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-2">
        <div className="text-xs flex items-center gap-2">
          <Link href="/" className="text-[#003A70] hover:underline">
            Home
          </Link>
          <span>{">"}</span>
          <Link href="/citizen/dashboard" className="text-[#003A70] hover:underline">
            Citizen Portal
          </Link>
          <span>{">"}</span>
          <span className="text-gray-600">Dashboard</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

      {/* Footer */}
      <footer className="bg-[#003A70] text-white py-4 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs">
              © {new Date().getFullYear()} City Government - Infrastructure Monitoring System. All Rights Reserved.
            </div>
            <div className="flex gap-4 text-xs">
              <Link href="/terms" className="hover:underline">
                Terms of Use
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
              <Link href="/help" className="hover:underline">
                Help
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
