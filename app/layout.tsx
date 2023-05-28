import { Nunito } from "next/font/google";
import { Navbar } from "./components/Navbar/Navbar";
import { AuthContext } from "./components/AuthContext/AuthContext";
import "./globals.css";
import { ApolloProvider } from "./components/ApolloProvider/ApolloProvider";

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
                <AuthContext>
                    <ApolloProvider>
                        <Navbar />
                        <div className="pt-[100px] antialiased min-h-[200%]">
                            {children}
                        </div>
                    </ApolloProvider>
                </AuthContext>
            </body>
        </html>
    );
}
