import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "modern-normalize";
import "./globals.css";
import { HOME_PAGE_URL, OG_IMAGE, SITE_NAME } from "@/constants";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "NoteHub helps you create, organize, and manage personal notes easily and efficiently.",
  openGraph: {
    title: "NoteHub — Your Personal Space for Notes",
    description:
      "A simple and efficient app to create, organize, and manage your notes. Capture ideas, stay organized, and boost productivity with NoteHub.",
    url: HOME_PAGE_URL,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>
              {children}
              {modal}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                }}
              />
            </main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}