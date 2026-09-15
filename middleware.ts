import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import type { NextRequest } from "next/server";

const ROLE_ROUTES: Record<string, string> = {
  admin: "/dashBoard/home",
  user: "/user/home",
};

const ALLOWED_ROLES: Record<string, string[]> = {
  "/dashBoard/home": ["admin"], // admin
  "/user/home": ["user", "admin"], // somente usuarios e admin podem acessar
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

  for (const [route, allowedRoles] of Object.entries(ALLOWED_ROLES)) {
    if (pathname.startsWith(route) && !allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL(homeRoute, req.url));
    }
  }

  const response = NextResponse.next();

  // impede que o navegador guarde a página no histórico local
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}

export const config = {
  matcher: ["/", "/admin/:path*", "/dashBoard/:path*", "/user/:path*"],
};
