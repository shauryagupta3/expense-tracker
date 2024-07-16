import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your expenses & budget yourself",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen min-w-screen bg-slate-950 text-white flex items-center justify-around  font-sans antialiased",
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
