import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "언제만날래?",
  description: "when we meet? 언제 만날까요?",
  icons: {
		icon: "/icons/favicon.ico",
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://developers.kakao.com/sdk/js/kakao.js"/>
        <meta name="google-site-verification" content="F9eNoTyDPbNkPVKo3UrWYhkB9alGPahuiOxFBnNcYiU" />       
        <meta name="naver-site-verification" content="add288b1904bb016ca588ddac3806a18fc424c8e" />
        <title>언제 만날래?</title>
        <meta property="og:title" content="언제만날래?" />
        <meta property="og:description" content="when we meet? 언제 만날까요?" />
        <meta property="og:url" content="https://unje.site/main" />
        <meta property="og:image" content="https://ifh.cc/g/SXTSd7.jpg" />
        <link rel="icon" href="unje/public/icons/favicon.ico" />
      </head>
      
      <body className={inter.className}>
        <nav>
        <Header />

        </nav>
        {children}
      </body>
    </html>
  );
}
