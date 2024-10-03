import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from './AuthProvider'
import LoginButtonWrapper from '../components/LoginButtonWrapper'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "YouChews",
  description: "Choose your favorite restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        <AuthProvider>
          <LoginButtonWrapper />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
