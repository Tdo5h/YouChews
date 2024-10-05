import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar';
import IconRemover from './components/IconRemover';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouChews",
  description: "Choose your favorite restaurants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen bg-black text-white`}>
        <IconRemover />
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
