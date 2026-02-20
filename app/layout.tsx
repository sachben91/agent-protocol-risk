import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Agent Protocol Risk | Dangerous Protocols Analysis",
  description:
    "Evaluating AI agent protocols through Nadia Asparouhova's Dangerous Protocols lens. How much control does each protocol exert? How visible is that control? How costly is exit?",
  openGraph: {
    title: "Agent Protocol Risk",
    description: "Dangerous Protocols analysis for AI agent infrastructure.",
    type: "website",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${ibmPlexMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
