import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./components/AuthProvider";
import MenuBar from "./components/MenuBar";
import "./globals.css";
import RecaptchaProvider from './components/RecaptchaProvider';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "ePluris - Unified Government Data Search",
  description: "Search across federal, state, and local government data sources from a single interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className={inter.className}>
        <RecaptchaProvider>
          <AuthProvider>
            <div className="scanlines">
              <MenuBar />
              {children}
            </div>
          </AuthProvider>
        </RecaptchaProvider>
      </body>
    </html>
  );
}
