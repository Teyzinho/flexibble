// npm install @headlessui/react cloudinary jsonwebtoken @types/jsonwebtoken graphql-request next-auth
// npm install @grafbase/sdk --save-dev

import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Flexibble",
  description: "Mostre e Descubra Projetos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
