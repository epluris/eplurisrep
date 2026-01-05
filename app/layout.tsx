import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./components/AuthProvider";
import MenuBar from "./components/MenuBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ePluris - U.S. Government Data Portal",
  description: "Simplifying access to U.S. government data for every American citizen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <div className="scanlines">
            <MenuBar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}