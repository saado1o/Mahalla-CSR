import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MahallaHub - Secure Neighborhood Networking",
  description: "MahallaHub is a modern, secure neighborhood networking platform designed with the SBF-Consultancy aesthetic, prioritizing security and community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased selection:bg-primary/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
