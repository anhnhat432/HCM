import type { Metadata } from "next";
import { Be_Vietnam_Pro, IBM_Plex_Sans, Newsreader } from "next/font/google";
import type { ReactNode } from "react";

import { MotionProvider } from "@/components/motion-provider";

import "./globals.css";

const displayFont = Newsreader({
  variable: "--font-display",
  subsets: ["vietnamese"],
  weight: "variable",
  display: "swap",
});

const bodyFont = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const homepageFont = Be_Vietnam_Pro({
  variable: "--font-homepage",
  subsets: ["vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HCM // TRACE",
  description:
    "Bắt đầu từ những câu hỏi của hiện tại và lần theo quá trình hình thành tư tưởng Hồ Chí Minh.",
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="vi">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${homepageFont.variable}`}
      >
        <a className="skip-link" href="#main-content">
          Đi đến nội dung chính
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
