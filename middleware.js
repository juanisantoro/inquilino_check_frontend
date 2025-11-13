import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const role = req.cookies.get("role")?.value;

    // Rutas solo admin
    const adminRoutes = ["/admin"];

    if (adminRoutes.some(r => req.nextUrl.pathname.startsWith(r))) {
        if (!token || role !== "admin") {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
