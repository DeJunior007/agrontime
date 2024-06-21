import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AgrOnTime",
  description: "Tela de login AgrOnTime",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
