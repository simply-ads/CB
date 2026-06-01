import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Away With Words — Travel content marketing",
  description:
    "Freelance content marketing consultant for travel and tourism brands. Website copy, customer magazines, market reports and podcasts that get read, and get acted on.",
  icons: {
    icon: "/images/logos/web/favicon-64.png",
    apple: "/images/logos/web/apple-touch-icon-180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
