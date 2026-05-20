"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isTokenExpired } from "../lib/auth/CheckExpiry";
import { clearAuthAndRedirect } from "../lib/auth/logout";

const publicRoutes = ["/login", "/signup"];

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // ❌ skip public pages..
    if (publicRoutes.includes(pathname)) return;

    const token = localStorage.getItem("token");

    if (!token || isTokenExpired()) {
      clearAuthAndRedirect();
    }
  }, [pathname]);

  return <>{children}</>;
}