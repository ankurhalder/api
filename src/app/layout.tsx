import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/context/ThemeContext";
import { SearchProvider } from "@/context/SearchContext";
import "./globals.scss";
import styles from "./Layout.module.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ankur Halder - API Documentation",
  description: "The official API documentation for the portfolio of Ankur Halder. A comprehensive guide for developers to interact with the portfolio's backend services.",
  keywords: "Ankur Halder, API, documentation, portfolio, backend, developer, guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <SearchProvider>
            <div className={styles.layout}>
              <Header />
              <Sidebar />
              <main className={styles.mainContent}>{children}</main>
            </div>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
