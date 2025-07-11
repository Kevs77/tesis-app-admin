import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import '@/styles/globals.css';
import { ThemeProvider } from '@/providers/theme-provider';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TesisApp',
  description: 'React Native - Tesis by jhonathan Mamani',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
