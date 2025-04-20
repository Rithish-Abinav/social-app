import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

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
  manifest: "https://rithish-social.vercel.app/manifest.json",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no", // Add this line
  themeColor: "#000000", // Optional: add for PWA
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" // Ensure this is in the Head
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
