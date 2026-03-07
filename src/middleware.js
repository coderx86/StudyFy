import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const protectedRoutes = ["/add-course", "/manage-courses"];

export async function middleware(req) {
    const token = await getToken({ req });
    const reqPath = req.nextUrl.pathname;

    const isProtected = protectedRoutes.some((route) =>
        reqPath.startsWith(route)
    );

    if (!token && isProtected) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", reqPath);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/add-course/:path*", "/manage-courses/:path*"],
};
