"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useUser } from "@/contexts/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Badge } from "../ui/badge";

const Header = ({
  showLogin,
  showLogout,
}: {
  showLogin?: boolean;
  showLogout?: boolean;
}) => {
  const { user } = useUser();
  const router = useRouter();
  console.log("User in Header:", user); // Debugging line
  // Get user type badge color and text
  const getUserTypeBadge = () => {
    if (user?.userType === "authority") {
      return {
        color: "bg-amber-500 hover:bg-amber-600",
        text: "Authority",
      };
    }
    return {
      color: "bg-blue-500 hover:bg-blue-600",
      text: "Citizen",
    };
  };

  const handleLogout = async () => {
    try {
      // Set logout flag before signing out
      localStorage.setItem("isLogout", "true");

      await signOut(auth);
      // Clear cookies
      Cookies.remove("authToken");
      Cookies.remove("userType");

      // Clear other stored user data
      localStorage.removeItem("userType");

      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Determine dashboard URL based on user type
  const getDashboardUrl = () => {
    if (user?.userType === "authority") {
      return "/authority/dashboard";
    }
    return "/citizen/dashboard"; // Default to citizen dashboard
  };

  return (
    <header className="border-b bg-[#003A70] text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center">
            <div className="h-12 w-12 bg-[#003A70] rounded-full flex items-center justify-center text-white font-bold text-xs">
              NAGRIK
            </div>
          </div>
          <div>
            <div className="text-xs">City Government</div>
            <div className="font-bold text-lg">
              Infrastructure Monitoring System
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            // Show user info and logout button if user is logged in
            <div className="flex items-center gap-3">
              <div className="text-sm text-right">
                <div className="font-medium flex items-center gap-2">
                  {user.username || user.email}
                  <Badge
                    className={`${getUserTypeBadge().color} text-white text-xs`}
                  >
                    {getUserTypeBadge().text}
                  </Badge>
                </div>
                <div className="text-xs opacity-80">
                  {user.userType === "authority" && user.state && user.city ? (
                    <span>
                      {user.city}, {user.state}
                    </span>
                  ) : (
                    <span>Account ID: {user.uid?.substring(0, 8)}</span>
                  )}
                </div>
              </div>
              <Link href={getDashboardUrl()}>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white bg-inherit hover:bg-[#004d94] hover:text-white"
                >
                  Dashboard
                </Button>
              </Link>
              {showLogout !== false && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white bg-inherit hover:bg-[#004d94] hover:text-white"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </div>
          ) : (
            // Show login button if user is not logged in
            showLogin !== false && (
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white bg-inherit hover:bg-[#004d94] hover:text-white"
                >
                  Login
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
