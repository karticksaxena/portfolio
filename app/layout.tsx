import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";

// Self-hosted at build time: visitors' browsers never contact Google.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kartiksaxena.com"),
  title: { default: "Kartik Saxena", template: "%s · Kartik Saxena" },
  description: "Kartik Saxena. Things I build.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
