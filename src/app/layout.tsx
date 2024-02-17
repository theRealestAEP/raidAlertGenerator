import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitch Raid Generator",
  description: "Create custom iFrames for the Tangia Raid alert. Upload a video to get a unique URL that you can paste into your Tangia alert. The URL will spawn an animated version of the video you uploaded for every viewer in a raid.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
