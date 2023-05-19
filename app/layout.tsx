import { useState } from "react";
import { Nunito } from "next/font/google";
import { Navbar } from "./components/Navbar/Navbar";
import "./globals.css";

interface RootLayoutProps {
    children: React.ReactNode;
}

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={font.className}>
                <Navbar />

                <div className="antialiased min-h-[200%]">{children}</div>
            </body>
        </html>
    );
}
