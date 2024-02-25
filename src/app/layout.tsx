import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { ReactNode } from 'react';

import { getServerStatus } from '@/client';
import { Toaster } from '@/components/toaster';
import { Providers } from './Providers';
import { InitialServerStatusSetter } from './ServerStatusProvider';
import './globals.css';
import { Header } from './header';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Palworld Admin',
  description: 'Palworld Admin',
};
export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { data: initialServerStatus } = await getServerStatus();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable}`}>
        <Providers>
          <InitialServerStatusSetter initialServerStatus={initialServerStatus} />
          <div className="relative flex flex-col">
            <Header />
            <main className="px-6 flex gap-4 flex-col pb-16 flex-grow">{children}</main>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
