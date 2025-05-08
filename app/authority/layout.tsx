import type { ReactNode } from "react";
import Link from "next/link";
import { Bell, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Header from "@/components/layout/header";

export default function AuthorityLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F0F0F0]">
      {/* Header */}
      <Header showLogout={true} />

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
          <Link
            href="/authority/dashboard"
            className="text-[#003A70] hover:underline"
          >
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
              © {new Date().getFullYear()} City Government - Infrastructure
              Monitoring System. All Rights Reserved.
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
  );
}
