import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "DevCanvas | Turn Your GitHub Into a Portfolio",
  description:
    "One-click portfolio generator that transforms your GitHub profile into a clean, professional developer portfolio.",
  keywords: ["portfolio", "github", "developer", "resume", "projects"],
  openGraph: {
    title: "DevCanvas | Turn Your GitHub Into a Portfolio",
    description:
      "One-click portfolio generator that transforms your GitHub profile into a clean, professional developer portfolio.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
