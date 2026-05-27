import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import type { NextRequest } from "next/server";

const ROLE_ROUTES: Record<string, string> = {
  admin: "/dashBoard/home",
  user: "/user/home",
};

const ALLOWED_ROLES: Record<string, string[]> = {
  "/dashBoard/home": ["admin"], // admin
  "/user/home": ["user", "admin"], // somente usuarios
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/";

  if (!token) {
    if (!isLoginPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  const role = token.role as string;
  const homeRoute = ROLE_ROUTES[role] ?? "/";

  if (isLoginPage) {
    return NextResponse.redirect(new URL(homeRoute, req.url));
  }

  // Verifica permissão para cada rota protegida
  for (const [route, allowedRoles] of Object.entries(ALLOWED_ROLES)) {
    if (pathname.startsWith(route) && !allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL(homeRoute, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/dashBoard/:path*"],
};
