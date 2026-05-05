import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";

import "./globals.css";

import SessionProviders from "@/components/SessionProviders";
import Providers from "@/providers/QueryClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stock Control",
  description: "Aplicação de gerenciamento de estoque",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <SessionProviders>
          <ToastContainer position="top-right" />
          <Providers>{children}</Providers>
        </SessionProviders>
      </body>
    </html>
  );
}
