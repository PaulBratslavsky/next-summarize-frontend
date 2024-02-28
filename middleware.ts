import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "./data/services/get-user-me-loader";

export async function middleware(request: NextRequest) {
  const user = await  getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  console.log("user", user);
  console.log("currentPath", currentPath);
  console.log("request.url", request.url);

  if (currentPath.startsWith("/dashboard") && user.ok === false) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
