import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./components/AuthProvider";
import MenuBar from "./components/MenuBar";
import "./globals.css";
import RecaptchaProvider from './components/RecaptchaProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
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