"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/header";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("citizen");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      if (userType === "citizen") {
        router.push("/citizen/dashboard");
      } else {
        router.push("/authority/dashboard");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0]">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-2">
        <div className="text-xs flex items-center gap-2">
          <Link href="/" className="text-[#003A70] hover:underline">
            Home
          </Link>
          <span>{">"}</span>
          <span className="text-gray-600">Login</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-6 border rounded-md shadow-sm">
            <h1 className="text-xl font-bold text-[#003A70] mb-6 pb-2 border-b-2 border-[#003A70]">
              System Login
            </h1>

            <Tabs
              defaultValue="citizen"
              className="w-full"
              onValueChange={setUserType}
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger
                  value="citizen"
                  className="data-[state=active]:bg-[#003A70] data-[state=active]:text-white"
                >
                  Citizen
                </TabsTrigger>
                <TabsTrigger
                  value="authority"
                  className="data-[state=active]:bg-[#003A70] data-[state=active]:text-white"
                >
                  Authority
                </TabsTrigger>
              </TabsList>

              <TabsContent value="citizen">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-bold">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      required
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-bold">
                        Password
                      </Label>
                      <Link
                        href="/auth/reset-password"
                        className="text-xs text-[#003A70] hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      className="border-gray-300"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-[#003A70] hover:bg-[#004d94]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </div>

                  <div className="text-center text-sm pt-4 border-t">
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      className="text-[#003A70] hover:underline"
                    >
                      Register
                    </Link>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="authority">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="auth-email" className="text-sm font-bold">
                      Staff ID
                    </Label>
                    <Input
                      id="auth-email"
                      type="text"
                      placeholder="Example: 12345678"
                      required
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="auth-password"
                        className="text-sm font-bold"
                      >
                        Password
                      </Label>
                      <Link
                        href="/auth/reset-password"
                        className="text-xs text-[#003A70] hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="auth-password"
                      type="password"
                      required
                      className="border-gray-300"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-[#003A70] hover:bg-[#004d94]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </div>

                  <div className="text-center text-sm pt-4 border-t">
                    Need access?{" "}
                    <Link
                      href="/auth/request-access"
                      className="text-[#003A70] hover:underline"
                    >
                      Request Access
                    </Link>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-8 bg-white border rounded-md p-4">
            <h2 className="text-sm font-bold mb-2">Important Notes</h2>
            <ul className="text-xs space-y-1 text-gray-700">
              <li>• Please do not use the browser's back button.</li>
              <li>
                • For security reasons, you will be automatically logged out
                after a period of inactivity.
              </li>
              <li>• We recommend changing your password regularly.</li>
              <li>• Always log out when using public computers.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#003A70] text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-xs">
          <p>
            © {new Date().getFullYear()} City Government - Infrastructure
            Monitoring System. All Rights Reserved.
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="/terms" className="hover:underline">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
