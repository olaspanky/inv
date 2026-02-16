import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "./shared/layout"
import localFont from "next/font/local";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const isidora = localFont({
  src: "/fonts/IsidoraSans-Medium.otf",
  variable: "--font-isi",
  display: "swap",
});

const isidora2 = localFont({
  src: "/fonts/IsidoraSans-Light.otf",
  variable: "--font-isidora",
  display: "swap",
});
const isidora3 = localFont({
  src: "/fonts/IsidoraSans-Black.otf",
  variable: "--font-isidora3",
  display: "swap",
});
const isidora4 = localFont({
  src: "/fonts/IsidoraSans-Bold.otf",
  variable: "--font-isidora3",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Invisio Dashboard",
  description: "PBR",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${isidora.variable} ${isidora2.variable} ${isidora3.variable} ${isidora4.variable} antialiased`}
      >
        <Layout>
        {children}
        </Layout>
      </body>
    </html>
  );
}
