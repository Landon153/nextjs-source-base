import { type Metadata } from 'next';
import { type JSX } from 'react';

import { CredentialsForm } from '@/app/[locale]/(auth)/_components/credentials-form';
import { Logo } from '@/components/shared/logo';

export const metadata: Metadata = {
  title: 'BaseCode Admin',
};

export default function LoginPage(): JSX.Element {
  return (
    <main className="mx-auto w-full max-w-md">
      <div className="flex h-108.5 flex-col space-y-13.75 rounded-md bg-white px-7.5 pb-8.25 pt-16 shadow-system">
        <div className="grid place-items-center">
          <Logo />
        </div>

        <CredentialsForm className="grow" />
      </div>
    </main>
  );
}
