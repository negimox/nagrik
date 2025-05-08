"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Cookies from "js-cookie";

// Define the user type including additional fields from MongoDB
export interface User extends FirebaseUser {
  username?: string;
  userType?: "citizen" | "authority";
  state?: string;
  city?: string;
  status?: string;
  identificationId?: string;
  // Add other custom fields as needed
}

// Define the context interface
interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

// Create the context with default values
const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  setUser: () => {},
});

// Provider component to wrap around the app
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to get current user type from multiple sources for reliability
  const getCurrentUserType = (): "citizen" | "authority" => {
    const fromLocalStorage = localStorage.getItem("userType");
    const fromCookies = Cookies.get("userType");
    return (fromLocalStorage || fromCookies || "citizen") as
      | "citizen"
      | "authority";
  };

  // Listen for auth state changes when component mounts
  useEffect(() => {
    console.log("UserContext: Auth state change listener initialized");

    // Check for stored auth data on mount (for page refreshes)
    const checkForStoredAuth = async () => {
      const authToken = Cookies.get("authToken");
      const storedUid = localStorage.getItem("uid");
      const storedUserType = getCurrentUserType();

      console.log("Checking stored auth:", {
        authToken: !!authToken,
        storedUid,
        userType: storedUserType,
      });

      // If we have auth data but no Firebase user yet
      if (authToken && storedUid && !user) {
        console.log("Found stored auth data, fetching user info");
        try {
          const response = await fetch(
            `/api/auth/user?uid=${storedUid}&userType=${storedUserType}`
          );
          const userData = await response.json();

          if (userData && !userData.error) {
            // Create a minimal user object since we don't have the full Firebase user yet
            const tempUser = {
              uid: storedUid,
              username: userData?.username || "",
              userType: userData?.userType || storedUserType,
              state: userData?.state || "",
              city: userData?.city || "",
              status: userData?.status || "",
              identificationId: userData?.identificationId || "",
              email: userData?.email || "",
            } as User;

            setUser(tempUser);
            console.log("Restored user from stored auth:", tempUser);
          }
        } catch (error) {
          console.error("Error fetching stored user data:", error);
        }
      }

      setLoading(false);
    };

    // Run on first mount
    checkForStoredAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log(
        "AuthStateChanged triggered:",
        firebaseUser ? "User logged in" : "No user"
      );

      if (firebaseUser) {
        // Store UID for page refreshes - ensuring persistence across sessions
        localStorage.setItem("uid", firebaseUser.uid);

        // Get user type from cookies/localStorage
        const userType = getCurrentUserType();
        console.log("Current user type:", userType);

        try {
          // Fetch user data from the appropriate collection based on userType
          console.log(
            `Fetching user data for uid=${firebaseUser.uid}, userType=${userType}`
          );
          const response = await fetch(
            `/api/auth/user?uid=${firebaseUser.uid}&userType=${userType}`
          );

          if (!response.ok) {
            console.error(
              "API response not OK:",
              response.status,
              response.statusText
            );
            throw new Error(`API error: ${response.status}`);
          }

          const userData = await response.json();
          console.log("User data from MongoDB:", userData);

          if (userData && !userData.error) {
            // Combine Firebase user with MongoDB data
            const updatedUser = {
              ...firebaseUser,
              username: userData?.username || "",
              userType: userData?.userType || userType,
              state: userData?.state || "",
              city: userData?.city || "",
              status: userData?.status || "",
              identificationId: userData?.identificationId || "",
            };

            setUser(updatedUser);
            console.log("User context updated with full data");
          } else {
            // If no user data found in the specified collection, set basic user
            console.log("No user data found in MongoDB, using basic user");
            setUser({
              ...firebaseUser,
              userType: userType,
            } as User);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Fall back to just Firebase user data if MongoDB fetch fails
          console.log("Using fallback user data due to error");
          setUser({
            ...firebaseUser,
            userType: userType,
          } as User);
        }
      } else {
        // Only clear uid from localStorage if we're explicitly logging out
        // Don't remove it on normal page refreshes
        if (localStorage.getItem("isLogout") === "true") {
          localStorage.removeItem("uid");
          localStorage.removeItem("isLogout");
        }
        setUser(null);
      }

      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      console.log("Cleaning up auth listener");
      unsubscribe();
    };
  }, []);

  // Value to be provided to consumers
  const value = {
    user,
    loading,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the context
export const useUser = () => useContext(UserContext);
