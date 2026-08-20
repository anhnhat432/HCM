import type { Metadata } from "next";
import { Be_Vietnam_Pro, IBM_Plex_Sans, Newsreader } from "next/font/google";
import type { ReactNode } from "react";

import { MotionProvider } from "@/components/motion-provider";
import { siteUrl } from "@/lib/site";

import "./globals.css";

const displayFont = Newsreader({
  variable: "--font-display",
  subsets: ["vietnamese"],
  weight: "variable",
  display: "swap",
  preload: false,
});

const bodyFont = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

const homepageFont = Be_Vietnam_Pro({
  variable: "--font-homepage",
  subsets: ["vietnamese"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Đuốc Hồng",
    template: "%s | Đuốc Hồng",
  },
  description:
    "Bắt đầu từ những câu hỏi của hiện tại và lần theo quá trình hình thành tư tưởng Hồ Chí Minh.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Đuốc Hồng",
    description:
      "Bắt đầu từ những câu hỏi của hiện tại và lần theo quá trình hình thành tư tưởng Hồ Chí Minh.",
    siteName: "Đuốc Hồng",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/homepage-independence-declaration.jpg",
        alt: "Trang đầu bản Tuyên ngôn Độc lập với bút tích và dấu lưu trữ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đuốc Hồng",
    description:
      "Bắt đầu từ những câu hỏi của hiện tại và lần theo quá trình hình thành tư tưởng Hồ Chí Minh.",
    images: ["/images/homepage-independence-declaration.jpg"],
  },
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${homepageFont.variable}`}
        suppressHydrationWarning
      >
        <a className="skip-link" href="#main-content">
          Đi đến nội dung chính
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
