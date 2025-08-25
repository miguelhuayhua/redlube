import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Providers } from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "REDLUBE",
  description: "Venta de aceites, líquidos y repuestos para vehículos.",
  openGraph: {
    title: "REDLUBE",
    description: "Venta de aceites, líquidos y repuestos para vehículos.",
    url: "https://redlube.vercel.app",
    siteName: "REDLUBE",
    images: [
      {
        url: "https://redlube.vercel.app/op-normal.png",
        width: 1200,
        height: 630,
        alt: "REDLUBE",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REDLUBE",
    description: "Venta de aceites, líquidos y repuestos para vehículos.",
    images: ["https://redlube.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers >
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <div className="fixed h-screen w-screen -z-1">
          <div className="dashed-grid-pattern h-screen">
          </div>
        </div>
      </body>

    </html>
  );
}
