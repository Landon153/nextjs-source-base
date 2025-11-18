import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { type JSX, type ReactNode } from 'react';

import { Header } from '@/app/[locale]/(dashboard)/_components/header';
import { Sidebar } from '@/app/[locale]/(dashboard)/_components/sidebar';
import { DashboardGlobalDialog } from '@/components/global/dashboard-global-dialog';
import { SessionChecker } from '@/components/global/session-checker';
import { auth } from '@/lib/auth';

export default async function DashboardLayout({ children }: Readonly<{ children: ReactNode }>): Promise<JSX.Element> {
  const [session, messages] = await Promise.all([auth(), getMessages()]);

  return (
    <NextIntlClientProvider messages={messages}>
      <SessionProvider session={session}>
        <div className="flex min-h-dvh w-full flex-col">
          <Sidebar />

          <div className="flex grow flex-col sm:pl-60">
            <Header />

            {children}
          </div>
        </div>

        <DashboardGlobalDialog />
        <SessionChecker />
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
