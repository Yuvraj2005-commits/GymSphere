import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "sonner";

import ThemeProvider from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  title: "GymSphere",
  description: "Modern Gym Management SaaS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          {children}

          <Toaster
            richColors
            position="top-right"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}