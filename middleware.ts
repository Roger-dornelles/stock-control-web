import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import type { NextRequest } from "next/server";

type Role = "admin" | "user" | "vendas";

const ROLE_ROUTES: Record<Role, string> = {
  admin: "/admin/home",
  user: "/user/home",
  vendas: "/vendas/home",
};

const ALLOWED_ROLES: Record<string, Role[]> = {
  "/admin": ["admin"],
  "/user": ["user", "admin"],
  "/vendas": ["vendas", "admin"],
};

const PUBLIC_ROUTES: string[] = ["/"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (!token) {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  const role = token.role as Role;
  const homeRoute = ROLE_ROUTES[role] ?? "/";

  if (isPublicRoute) {
    return NextResponse.redirect(new URL(homeRoute, req.url));
  }

  for (const [route, allowedRoles] of Object.entries(ALLOWED_ROLES)) {
    if (pathname.startsWith(route) && !allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL(homeRoute, req.url));
    }
  }

  const response = NextResponse.next();

  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}

export const config = {
  matcher: ["/", "/admin/:path*", "/user/:path*", "/vendas/:path*"],
};
