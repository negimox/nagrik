import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// Define which paths require authentication
const authRequiredPaths = [
  "/citizen/dashboard",
  "/citizen/report",
  "/citizen/reports",
  "/authority/dashboard",
  "/authority/analytics",
  "/authority/map",
  "/authority/reports",
  "/authority/teams",
];

// Define auth pages that authenticated users should be redirected from
const authPages = ["/login", "/register"];

// Define path patterns for specific user types
const citizenPaths = ["/citizen"];
const authorityPaths = ["/authority"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check for authentication token in cookies
  const authToken = request.cookies.get("authToken")?.value;
  const userType = request.cookies.get("userType")?.value;

  // Function to redirect to login
  const redirectToLogin = () => {
    const loginUrl = new URL("/login", request.url);
    // Store the original URL to redirect back after login
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  };

  // Function to redirect authenticated users to their dashboard
  const redirectToDashboard = () => {
    // Redirect to appropriate dashboard based on user type
    if (userType === "authority") {
      return NextResponse.redirect(
        new URL("/authority/dashboard", request.url)
      );
    } else {
      // Default to citizen dashboard if user type is missing or is citizen
      return NextResponse.redirect(new URL("/citizen/dashboard", request.url));
    }
  };

  // If user is logged in and trying to access login or register pages,
  // redirect them to their appropriate dashboard
  if (authToken && authPages.some((authPage) => path === authPage)) {
    return redirectToDashboard();
  }

  // Check if the path requires authentication
  const requiresAuth = authRequiredPaths.some((authPath) =>
    path.startsWith(authPath)
  );

  if (requiresAuth && !authToken) {
    // Redirect to login if no auth token is present
    return redirectToLogin();
  }

  // Check for user type restrictions
  if (authToken && userType) {
    // Restrict citizen paths to citizen users
    if (path.startsWith("/citizen/") && userType !== "citizen") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Restrict authority paths to authority users
    if (path.startsWith("/authority/") && userType !== "authority") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/citizen/:path*",
    "/authority/:path*",
    "/login",
    "/register",
    // Add other paths that need middleware protection
  ],
};
