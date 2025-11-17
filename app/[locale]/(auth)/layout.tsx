import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { type JSX, type ReactNode } from 'react';

export default async function AuthLayout({ children }: { children: ReactNode }): Promise<JSX.Element> {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <section className="grid min-h-dvh w-full">
        <div className="flex items-center justify-center px-4 py-12">{children}</div>
      </section>
    </NextIntlClientProvider>
  );
}
