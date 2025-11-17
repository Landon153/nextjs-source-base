import type { Metadata } from 'next';
import { type JSX } from 'react';

import { notoSansKR } from '@/app/fonts';
import { Providers } from '@/components/providers';
import { type Locale } from '@/lib/i18n/routing';

import 'app/globals.css';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
};

export default function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { locale: Locale } }>): JSX.Element {
  return (
    <html suppressHydrationWarning className={notoSansKR.variable} lang={params.locale}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
