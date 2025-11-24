import { type Metadata } from 'next';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { AdminForm } from '@/app/[locale]/(dashboard)/admins/_components/admin-form';

export const metadata: Metadata = {
  title: '등록',
};

export default function AdminNewPage(): JSX.Element {
  return (
    <Main
      breadcrumbs={[
        { href: '/admins', label: '관리자 관리' },
        { href: '/admins/new', label: '등록' },
      ]}
    >
      <AdminForm />
    </Main>
  );
}
