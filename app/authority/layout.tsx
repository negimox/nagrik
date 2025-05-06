import type { ReactNode } from "react"
import Link from "next/link"
import { Bell, User, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AuthorityLayout({ children }: { children: ReactNode }) {
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
            <Button variant="ghost" size="icon" className="text-white">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative flex items-center gap-2 text-white">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">Admin User</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/authority/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/authority/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/auth/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            <Link
              href="/authority/dashboard"
              className="py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap hover:text-[#003A70] hover:border-[#003A70] transition-colors border-[#003A70] text-[#003A70]"
            >
              Dashboard
            </Link>
            <Link
              href="/authority/reports"
              className="py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap hover:text-[#003A70] hover:border-[#003A70] transition-colors border-transparent"
            >
              Reports
            </Link>
            <Link
              href="/authority/map"
              className="py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap hover:text-[#003A70] hover:border-[#003A70] transition-colors border-transparent"
            >
              Map View
            </Link>
            <Link
              href="/authority/analytics"
              className="py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap hover:text-[#003A70] hover:border-[#003A70] transition-colors border-transparent"
            >
              Analytics
            </Link>
            <Link
              href="/authority/teams"
              className="py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap hover:text-[#003A70] hover:border-[#003A70] transition-colors border-transparent"
            >
              Teams
            </Link>
            <Link
              href="/authority/settings"
              className="py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap hover:text-[#003A70] hover:border-[#003A70] transition-colors border-transparent"
            >
              Settings
            </Link>
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
          <Link href="/authority/dashboard" className="text-[#003A70] hover:underline">
            Authority Portal
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
