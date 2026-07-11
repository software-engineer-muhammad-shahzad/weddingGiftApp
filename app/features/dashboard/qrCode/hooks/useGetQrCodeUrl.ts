"use client";

import { useEffect, useState } from "react";
// import { getQrCode } from "./getQrCode";
import { QrCodeData } from "../types/getQrCode";
import { getQrCodeUrl } from "../api/qrCodeApi";

export const useQrCode = () => {
  const [data, setData] = useState<QrCodeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQr = async () => {
      try {
        setIsLoading(true);
        const res = await getQrCodeUrl();
        setData(res.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQr();
  }, []);

  return { data, isLoading, error };
};