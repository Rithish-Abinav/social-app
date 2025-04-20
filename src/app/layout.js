import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rithish | Social App",
  description:
    "A simple social app built with Next.js featuring user registration, profile image upload, and clean UI.",
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
      userScalable: 'no',
    },
  openGraph: {
    title: "Rithish | Social App",
    description:
      "A simple social app built with Next.js featuring user registration, profile image upload, and clean UI.",
    url: "https://rithish-social.vercel.app",
    siteName: "Rithish Social",
    images: [
      {
        url: "https://rithish-social.vercel.app/assets/og.webp", 
        width: 1200,
        height: 630,
        alt: "Rithish Social OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
