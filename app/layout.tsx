import type { Metadata } from "next";
import "./styles/globals.css"
import { Toaster } from "sonner";
import { manrope, figtree, inter } from "./lib/fonts";
import SessionTimeoutProvider from "./components/providers/SessionTimeoutProvider";

export const metadata: Metadata = {
  title: "Shagun Direct",
  description: "Skip the Envelope, Send the Love.",
  icons: {
    icon: [
      { url: "/images/shagun-logo.svg", type: "image/svg+xml" },
      { url: "/images/shagun-logo.png", type: "image/png" },
    ],
    apple: "/images/shagun-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${manrope.variable} ${figtree.variable} ${inter.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className={`${figtree.className} min-h-full bg-red-500 flex flex-col`}>
        <SessionTimeoutProvider>
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
          />
        </SessionTimeoutProvider>
      </body>
    </html>
  );
}
