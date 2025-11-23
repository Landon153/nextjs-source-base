import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { AdminForm } from '@/app/[locale]/(dashboard)/admins/_components/admin-form';
import { UserStatus } from '@/lib/services/default/constants';
import { getAdminDetails } from '@/lib/services/default/features/admin';

interface AdminDetailsPageProps {
  params: { id: string };
}

export const metadata: Metadata = {
  title: '수정',
};

export default async function AdminEditPage({ params }: AdminDetailsPageProps): Promise<JSX.Element> {
  const response = await getAdminDetails(params.id);

  if (!response.status) {
    notFound();
  }

  const { nickname, email, phoneNumber, permissions, status } = response.data;

  return (
    <Main
      breadcrumbs={[
        { href: '/admins', label: '관리자 관리' },
        { href: `/admins/${params.id}`, label: '수정' },
      ]}
    >
      <AdminForm
        defaultValues={{
          nickname,
          email,
          phoneNumber: phoneNumber || '',
          status: status === UserStatus.Banned,
          permissionsIds: permissions.map((permission) => permission.type),
        }}
        id={params.id}
      />
    </Main>
  );
}
