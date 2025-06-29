import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinGist - Günlük Finansal AI Bülteni",
  description: "Binlerce finansal kaynağı takip eden, sizin için önemli olanları seçip günlük bültene dönüştüren, 12.000+ akıllı yatırımcıya katılan, her sabah finansal özetinizi alan, finansal haberlerinizi özetleyen, yapay zeka ile finansal analiz yapan, yatırım danışmanlığı yapan, ekonomik analiz yapan, finansal piyasaları takip eden, finansal piyasaları analiz eden, finansal piyasaların trendlerini tespit eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasaların geleceğini tahmin eden, finansal piyasalar icin bulten",
  keywords: "finans, yatırım, borsa, ekonomi, piyasa, analiz, günlük bülten, finansal haberler, AI, yapay zeka, yatırım danışmanlığı, ekonomik analiz",
  authors: [{ name: "FinGist" }],
  creator: "FinGist",
  publisher: "FinGist",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fingist.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FinGist - Günlük Finansal AI Bülteni',
    description: 'Binlerce finansal kaynağı takip ediyoruz, sizin için önemli olanları seçip günlük bültene dönüştürüyoruz. Gürültü yok, sadece önemli bilgiler.',
    url: 'https://fingist.com',
    siteName: 'FinGist',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinGist - Günlük Finansal AI Bülteni',
    description: 'Binlerce finansal kaynağı takip ediyoruz, sizin için önemli olanları seçip günlük bültene dönüştürüyoruz.',
    creator: '@fingist',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
