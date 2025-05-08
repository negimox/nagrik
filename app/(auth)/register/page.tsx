"use client";

import type React from "react";

import { useState, useEffect } from "react";
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

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

import Header from "@/components/layout/header";
import { z } from "zod";
import { auth } from "@/lib/firebase";
import { useUser } from "@/contexts/UserContext";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"citizen" | "authority">("citizen");
  const { setUser } = useUser();

  // State and City selection for India - using react-country-state-city
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  //   Form
  const handleUserTypeChange = (value: string) => {
    if (value === "citizen" || value === "authority") {
      setUserType(value);
    }
  };

  const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50),
  });

  const authorityFormSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50),
    proofid: z.string().min(12).max(12),
    state: z.string().optional(),
    city: z.string().optional(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const authorityForm = useForm<z.infer<typeof authorityFormSchema>>({
    resolver: zodResolver(authorityFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      proofid: "",
      state: "",
      city: "",
    },
  });

  // Citizen registration submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);

        // Include username and userType in the user object
        const userData = {
          ...user,
          username: values.username,
          userType: userType,
        };

        // Get token for middleware auth
        return user.getIdToken().then((token) => {
          // Store user token in cookie for middleware auth check
          Cookies.set("authToken", token, { expires: 7 });
          Cookies.set("userType", userType, { expires: 7 });
          localStorage.setItem("userType", userType);

          // Set user in context
          setUser({
            ...user,
            username: values.username,
            userType: userType,
          });

          // Call our API endpoint to store the user in MongoDB
          return fetch("/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });
        });
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("User saved to database:", data);
        // Redirect to the appropriate dashboard based on user type
        if (userType === "citizen") {
          router.push("/citizen/dashboard");
        } else {
          router.push("/authority/dashboard");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Registration error:", errorCode, errorMessage);
        // Show error to user - would be better with toast notification
        alert(`Registration failed: ${errorMessage}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Authority registration handler
  function onAuthoritySubmit(values: z.infer<typeof authorityFormSchema>) {
    console.log(values);
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);

        // Include username, identification ID, location data and userType in the user object
        const authorityData = {
          ...user,
          username: values.username,
          identificationId: values.proofid,
          userType: "authority",
          state: values.state, // State name is already stored in values.state
          city: values.city, // City name is already stored in values.city
          country: "India", // Hardcoded as we're only supporting India
        };

        // Get token for middleware auth
        return user.getIdToken().then((token) => {
          // Store user token in cookie for middleware auth check
          Cookies.set("authToken", token, { expires: 7 });
          Cookies.set("userType", "authority", { expires: 7 });
          localStorage.setItem("userType", "authority");

          // Set user in context
          setUser({
            ...user,
            username: values.username,
            userType: "authority",
            state: values.state,
            city: values.city,
          });

          // Call our API endpoint to store the authority in MongoDB
          return fetch("/api/auth/authority-signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(authorityData),
          });
        });
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Authority user saved to database:", data);
        alert(
          "Authority registration submitted. Your account is pending approval."
        );
        // Redirect to a waiting page or home
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Authority registration error:", errorCode, errorMessage);
        // Show error to user - would be better with toast notification
        alert(`Registration failed: ${errorMessage}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

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
      <Header showLogin={false} />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-2">
        <div className="text-xs flex items-center gap-2">
          <Link href="/" className="text-[#003A70] hover:underline">
            Home
          </Link>
          <span>{">"}</span>
          <span className="text-gray-600">Sign Up</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-6 border rounded-md shadow-sm">
            <h1 className="text-xl font-bold text-[#003A70] mb-6 pb-2 border-b-2 border-[#003A70]">
              System Register
            </h1>

            <Tabs
              defaultValue="citizen"
              className="w-full"
              onValueChange={handleUserTypeChange}
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
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jhon Doe" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
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
                      control={form.control}
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
                        {isLoading ? "Signing up..." : "Sign Up"}
                      </Button>
                    </div>

                    <div className="text-center text-sm pt-4 border-t">
                      Have an account?{" "}
                      <Link
                        href="/login"
                        className="text-[#003A70] hover:underline"
                      >
                        Login
                      </Link>
                    </div>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="authority">
                <Form {...authorityForm}>
                  <form
                    onSubmit={authorityForm.handleSubmit(onAuthoritySubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={authorityForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jhon Doe" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={authorityForm.control}
                      name="proofid"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Identification ID</FormLabel>
                          <FormControl>
                            <Input placeholder="1234 5678 9012" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={authorityForm.control}
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
                      control={authorityForm.control}
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

                    {/* State Selection for India */}
                    <FormField
                      control={authorityForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <div className="w-full">
                              <StateSelect
                                countryid={101} // Country ID for India
                                onChange={(state) => {
                                  field.onChange(state?.name || "");
                                  setSelectedState(state);
                                  // Reset city when state changes
                                  authorityForm.setValue("city", "");
                                }}
                                placeHolder="Select State"
                                containerClassName="w-full"
                                inputClassName="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* City Selection for India */}
                    <FormField
                      control={authorityForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <div className="w-full">
                              <CitySelect
                                countryid={101} // Country ID for India
                                stateid={selectedState?.id}
                                onChange={(city) => {
                                  field.onChange(city?.name || "");
                                  setSelectedCity(city);
                                }}
                                placeHolder="Select City"
                                containerClassName="w-full"
                                inputClassName="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={!selectedState}
                              />
                            </div>
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
                        {isLoading ? "Signing up..." : "Sign Up"}
                      </Button>
                    </div>

                    <div className="text-center text-sm pt-4 border-t">
                      Have an account?{" "}
                      <Link
                        href="/login"
                        className="text-[#003A70] hover:underline"
                      >
                        Login
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
