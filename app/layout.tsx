import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Font files can be colocated inside of `app`
const baselBook = localFont({
  src: "./Basel-Book.woff",
  variable: "--font-basel-book",
  display: "auto",
});

export const metadata: Metadata = {
  title: "J-Rank",
  description: "bjj ranking system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={baselBook.className}>{children}</body>
    </html>
  );
}
