import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Dashboard - Real-time Cryptocurrency Tracker",
  description: "Track cryptocurrency prices in real-time with portfolio management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-200`}>
        <Providers>
          <ThemeProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}