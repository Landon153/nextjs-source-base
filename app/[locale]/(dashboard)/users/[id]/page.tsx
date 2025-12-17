import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { UserDetails } from '@/app/[locale]/(dashboard)/users/[id]/_components/user-details';
import { getUserDetails } from '@/lib/services/default/features/user';

interface UserDetailsPageProps {
  params: { id: string };
}

export const metadata: Metadata = {
  title: '회원 상세',
};

export default async function UserDetailsPage({ params }: UserDetailsPageProps): Promise<JSX.Element> {
  const response = await getUserDetails(params.id);

  if (!response.status) {
    notFound();
  }

  return (
    <Main
      breadcrumbs={[
        { href: '/users', label: '회원 관리' },
        { href: '/users', label: '일반 회원' },
        { href: `/users/${params.id}`, label: '회원 상세' },
      ]}
    >
      <UserDetails user={response.data} />
    </Main>
  );
}
