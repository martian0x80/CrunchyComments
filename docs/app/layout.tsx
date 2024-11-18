import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "CrunchyComments",
  description: "Bring back the comment section to Crunchyroll.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" href="/favicon.ico" sizes="48x48 32x32 16x16" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@crunchycomments" />
      <meta name="twitter:creator" content="@crunchycomments" />
      <meta
      name="twitter:title"
      content="CrunchyComments: Are you missing the comment section on Crunchyroll?"
      />
      <meta
      name="twitter:description"
      content="Bring Back the comment section to Crunchyroll with CrunchyComments."
      />
      <meta name="twitter:image" content="/logo.png" />

      <meta name="og:image" content="https://www.crunchycomments.com/hime.png" />
      <meta name="og:type" content="website" />
      <meta name="og:site_name" content="Crunchy Comments" />
      <meta name="og:locale" content="en_US" />
      <meta name="og:image:type" content="image/png" />
      <meta name="og:image:alt" content="Hime" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="og:image" content="https://www.crunchycomments.com/hime.png" />
    </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
