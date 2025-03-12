import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactQueryProvider } from "@/lib/react-query";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "doukutsu-rs - Cave Story Engine Reimplementation",
  description:
    "A fully playable re-implementation of the Cave Story (Doukutsu Monogatari) engine written in Rust.",
  themeColor: "#f54a00",
  metadataBase: new URL("https://doukutsu.rs"),
  verification: {
    google: "A4uBK-Sjh3en0Ur18AlA3cOcLajrxsrFBv-cd61dOmM",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="w-full flex flex-1 flex-col items-center flex-nowrap">
                {children}
              </main>
              <Footer />
            </div>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
