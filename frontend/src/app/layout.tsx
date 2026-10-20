import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#0F172A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://mahalla-csr.onrender.com'),
  title: {
    default: 'MahallaHub | Verified Islamic Neighborhood Network by SBF Consultancy',
    template: '%s | MahallaHub by SBF Consultancy',
  },
  description: 'MahallaHub is a privacy-first, verified Islamic neighborhood network engineered by SBF Consultancy. Features real-time geospatial SOS alerts, halal skill bartering, live Nisab Zakat calculator, and digital mosque community management.',
  keywords: [
    'MahallaHub',
    'SBF Consultancy',
    'sbf-consultancy.net',
    'Islamic Community Network',
    'Neighborhood SOS Alert',
    'Emergency Panic Button App',
    'Halal Skill Barter Platform',
    'Zakat Calculator Online',
    'Live Nisab Gold Rate',
    'Mosque Management Software',
    'Verified Residents Network',
    'Purdah Privacy Shield',
    'PostGIS Neighborhood Dispatch',
    'Masjid Notice Board',
    'Rizq Sharing Community Pantry',
    'Mosque Ride Pooling',
    'Islamic Civic Tech',
    'GeoDjango Community App',
    'Cashless Neighbor Exchange',
    'Ummah Mutual Aid Platform'
  ],
  authors: [{ name: 'SBF Consultancy', url: 'https://sbf-consultancy.net' }],
  creator: 'SBF Consultancy',
  publisher: 'SBF Consultancy',
  applicationName: 'MahallaHub',
  category: 'Community & Social Networking',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://mahalla-csr.onrender.com',
  },
  openGraph: {
    title: 'MahallaHub | Secure Islamic Neighborhood Network by SBF Consultancy',
    description: 'Connect, protect, and empower your local Mahalla through verified resident networking, sub-second emergency SOS broadcasts, halal skill bartering, and digitized Zakat ledgers.',
    url: 'https://mahalla-csr.onrender.com',
    siteName: 'MahallaHub by SBF Consultancy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'MahallaHub Logo - SBF Consultancy Project',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MahallaHub | Islamic Neighborhood Network by SBF Consultancy',
    description: 'Verified neighborhood networking, emergency SOS dispatch, and halal community barter. Engineered by SBF Consultancy.',
    images: ['/logo.png'],
    creator: '@SBFConsultancy',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </head>
      <body className={`${inter.className} antialiased selection:bg-[#14B8A6]/30 selection:text-white bg-[#0F172A]`}>
        {children}
      </body>
    </html>
  );
}
