import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseSetCookie } from "cookie";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!accessToken && refreshToken) {
    try {
      const response = await checkSession();

      const setCookie = response.headers["set-cookie"];

      let nextResponse: NextResponse;

      if (isPublicRoute) {
        nextResponse = NextResponse.redirect(new URL("/", request.url));
      } else {
        nextResponse = NextResponse.next();
      }

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie)
          ? setCookie
          : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parseSetCookie(cookieStr);
          if (parsed.name && parsed.value) {
            nextResponse.cookies.set(parsed.name, parsed.value, {
              expires: parsed.expires,
              path: parsed.path,
              maxAge: parsed.maxAge,
              httpOnly: parsed.httpOnly,
              secure: parsed.secure,
              sameSite: parsed.sameSite,
            });
          }
        }
      }

      return nextResponse;
    } catch {
      let nextResponse: NextResponse;

      if (isPrivateRoute) {
        nextResponse = NextResponse.redirect(new URL("/sign-in", request.url));
      } else {
        nextResponse = NextResponse.next();
      }

      nextResponse.cookies.delete("accessToken");
      nextResponse.cookies.delete("refreshToken");

      return nextResponse;
    }
  }

  const hasSession = Boolean(accessToken);

  if (isPrivateRoute && !hasSession) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isPublicRoute && hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};