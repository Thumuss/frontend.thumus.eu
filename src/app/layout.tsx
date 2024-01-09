import "./globals.css";
import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";

const inter = Fira_Code({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="page"><div className="item">{children}</div></div>
      </body>
    </html>
  );
}
