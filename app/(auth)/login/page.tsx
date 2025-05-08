"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { signInWithEmailAndPassword } from "firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

import Header from "@/components/layout/header";
import { z } from "zod";
import { auth } from "@/lib/firebase";
import { useUser } from "@/contexts/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("citizen");
  const { setUser } = useUser();

  // Form schema for citizen login
  const citizenFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(50),
  });

  // Form schema for authority login
  const authorityFormSchema = z.object({
    staffId: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
  });

  // Citizen form
  const citizenForm = useForm<z.infer<typeof citizenFormSchema>>({
    resolver: zodResolver(citizenFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Authority form
  const authorityForm = useForm<z.infer<typeof authorityFormSchema>>({
    resolver: zodResolver(authorityFormSchema),
    defaultValues: {
      staffId: "",
      password: "",
    },
  });

  // Citizen login submission
  function onCitizenSubmit(values: z.infer<typeof citizenFormSchema>) {
    console.log(values);
    setIsLoading(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // Get the token
        return user
          .getIdToken()
          .then((token) => {
            // Store user token and type in both cookie and localStorage
            Cookies.set("authToken", token, { expires: 7 });
            Cookies.set("userType", "citizen", { expires: 7 });
            localStorage.setItem("userType", "citizen");

            // Fetch additional user data from MongoDB
            return fetch(`/api/auth/user?uid=${user.uid}`).then((res) =>
              res.json()
            );
          })
          .then((userData) => {
            // Set user in context with additional data
            setUser({
              ...user,
              username: userData?.username || "",
              userType: "citizen",
            });

            console.log("User logged in successfully");
            router.push("/citizen/dashboard");
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login error:", errorCode, errorMessage);
        // Show error to user - would be better with toast notification
        alert(`Login failed: ${errorMessage}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Authority login submission
  function onAuthoritySubmit(values: z.infer<typeof authorityFormSchema>) {
    console.log(values);
    setIsLoading(true);

    // Format email based on staffId for authority users
    const email = `${values.staffId}@authority.gov`;

    signInWithEmailAndPassword(auth, email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Store UID immediately to ensure it's available
        localStorage.setItem("uid", user.uid);

        // Get the token
        return user
          .getIdToken()
          .then((token) => {
            // First, check if the user exists in the authority collection
            return fetch(`/api/auth/user?uid=${user.uid}&userType=authority`)
              .then((res) => res.json())
              .then((userData) => {
                if (!userData || userData.error) {
                  throw new Error(
                    "User not found in authority database or not approved"
                  );
                }

                // Store user token and type in both cookie and localStorage
                Cookies.set("authToken", token, { expires: 7 });
                Cookies.set("userType", "authority", { expires: 7 });
                localStorage.setItem("userType", "authority");

                // Set user in context with authority-specific data
                setUser({
                  ...user,
                  username: values.staffId,
                  userType: "authority",
                  identificationId: userData.identificationId || "",
                  status: userData.status || "pending",
                  state: userData.state || "",
                  city: userData.city || "",
                });

                // Check if the authority is approved
                if (userData.status !== "approved") {
                  alert(
                    "Your account is pending approval. Please contact administration."
                  );
                  return "pending";
                }

                return "approved";
              });
          })
          .then((status) => {
            if (status === "approved") {
              console.log("Authority user logged in");
              router.push("/authority/dashboard");
            } else {
              // For pending accounts, redirect to a waiting page
              router.push("/");
            }
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Authority login error:", errorCode, errorMessage);

        // Only in development mode - simulated login for testing
        if (process.env.NODE_ENV === "development") {
          console.log("Using simulated authority login for development only");

          // Simulate a successful login for demonstration (REMOVE IN PRODUCTION)
          const mockToken = "mock-token-for-demo";
          const mockUid = "dev-authority-uid-" + Date.now(); // Generate a deterministic but unique UID

          // Store all necessary data for simulated authority login
          Cookies.set("authToken", mockToken, { expires: 7 });
          Cookies.set("userType", "authority", { expires: 7 });
          localStorage.setItem("userType", "authority");
          localStorage.setItem("uid", mockUid);

          // Set simulated user in context
          setUser({
            uid: mockUid,
            email: `${values.staffId}@authority.gov`,
            username: values.staffId,
            userType: "authority",
            state: "Demo State",
            city: "Demo City",
            status: "approved",
            emailVerified: true,
          } as any);

          setTimeout(() => {
            router.push("/authority/dashboard");
          }, 1500);
        } else {
          // Show error to user
          alert(`Login failed: ${errorMessage}`);
        }

        setIsLoading(false);
      });
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0]">
      {/* Header */}
      <Header showLogin={false} />

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
                <Form {...citizenForm}>
                  <form
                    onSubmit={citizenForm.handleSubmit(onCitizenSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={citizenForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="example@gmail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={citizenForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                </Form>
              </TabsContent>

              <TabsContent value="authority">
                <Form {...authorityForm}>
                  <form
                    onSubmit={authorityForm.handleSubmit(onAuthoritySubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={authorityForm.control}
                      name="staffId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Staff ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Example: 12345678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={authorityForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Password</FormLabel>
                            <Link
                              href="/auth/reset-password"
                              className="text-xs text-[#003A70] hover:underline"
                            >
                              Forgot password?
                            </Link>
                          </div>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                </Form>
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
