import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "언제만날래?",
  description: "when we meet. copyright by Jun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>  <script src="https://developers.kakao.com/sdk/js/kakao.js"></script></head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
