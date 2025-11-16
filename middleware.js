import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const role = req.cookies.get("role")?.value;
    const url = req.nextUrl.pathname;

    console.log("🔵 Middleware ejecutado →", url);
    console.log("   token:", token);
    console.log("   role:", role);

    // Rutas publicas que NO requieren login
    const publicRoutes = ["/login", "/"];

    if (publicRoutes.includes(url)) {
        return NextResponse.next();
    }

    if (url.startsWith("/register")) {
        if (!token) {
            console.log("⛔ Bloqueado /register → sin token");
            return NextResponse.redirect(new URL("/login", req.url));
        }

        if (role !== "admin") {
            console.log("⛔ Bloqueado /register → no es admin");
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    // Si NO hay token → redirigir a login
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Solo admin puede usar /admin
    if (url.startsWith("/admin") && role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
        "/((?!_next|favicon.ico|static|public).*)"
    ]
};