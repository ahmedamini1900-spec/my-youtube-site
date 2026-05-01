import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NovaPlay - ویدیوهای بی‌نهایت',
  description: 'یوتیوب دوم با تجربه‌ای متفاوت',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}