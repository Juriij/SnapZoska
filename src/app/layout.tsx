'use client'
import "./globals.css";
import Navbar from "@/components/NavBar";
import AuthProvider from "../components/AuthProvider";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from "@/components/ThemeProvider";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="sk">
      <body>
        <ThemeProvider>
          <CssBaseline />
          <AuthProvider>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <main style={{ flexGrow: 1 }}>
                {children}
              </main>
            </div>
            <Navbar/>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}