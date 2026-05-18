import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bangladeshi Resume Builder - Professional CV Maker',
  description: 'Create professional Bangladeshi-style resumes/CVs with real-time preview, customization, and PDF/DOCX export.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {/* Popunder Ad - loads before hydration for proper event listener attachment */}
        <Script
          id="adsterra-popunder"
          strategy="beforeInteractive"
          src="https://pl29485623.effectivecpmnetwork.com/17/29/4d/17294d9a11b1cd0b71fc75561dfe45ff.js"
          data-cfasync="false"
        />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
