import { useEffect, useRef } from "react";
import { clearAuthAndRedirect } from "../lib/auth/logout";

export function useAutoLogout() {
  const timerRef = useRef(null);

  useEffect(() => {
    const expiry = localStorage.getItem("tokenExpiry");

    if (!expiry) return;

    const timeout = Number(expiry) - Date.now();

    // clear old timer if exists
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (timeout <= 0) {
      clearAuthAndRedirect();
      return;
    }

    timerRef.current = setTimeout(() => {
      clearAuthAndRedirect();
    }, timeout);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
}