import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'MahallaHub | Secure Neighborhood Networking by SBF Consultancy',
  description: 'MahallaHub is a privacy-first, verified Islamic community network empowering neighbors through secure SOS alerts, skill bartering, and community management.',
  keywords: 'MahallaHub, Islamic Community Network, SBF Consultancy, Neighborhood SOS App, Skill Barter Platform, Zakat Calculator, Verified Residents Network',
  openGraph: {
    title: 'MahallaHub | The Premier Islamic Community Network',
    description: 'A revolutionary platform to connect, protect, and empower your local Mahalla through verified networking and real-time emergency broadcasts.',
    type: 'website',
  }
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
