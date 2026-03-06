import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { ThemeProvider } from "@/provider/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "StudyFy - Learn, Grow, Succeed",
  description:
    "Discover top-quality courses from expert instructors. StudyFy empowers your learning journey with curated content, interactive lessons, and a vibrant community.",
};

const RootLayout = ({ children }) => {
  return (
    <NextAuthProvider>
      <html lang="en" className={inter.className} suppressHydrationWarning>
        <body>
          <ThemeProvider>
            <Navbar />
            <main className="pt-[72px] min-h-screen">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </NextAuthProvider>
  );
};

export default RootLayout;
