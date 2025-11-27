import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { CustomerSupportDetails } from '@/app/[locale]/(dashboard)/operations/customer-support/[id]/_components/customer-support-details';
import { getCustomerSupportDetails } from '@/lib/services/default/features/customer-support';

interface UserDetailsPageProps {
  params: { id: string };
}

export const metadata: Metadata = {
  title: '상세',
};

export default async function CustomerSupportDetailsPage({ params }: UserDetailsPageProps): Promise<JSX.Element> {
  const response = await getCustomerSupportDetails(params.id);

  if (!response.status) {
    notFound();
  }

  const { id } = response.data;

  return (
    <Main
      breadcrumbs={[
        { href: '/operations/customer-support', label: '운영 관리' },
        { href: '/operations/customer-support', label: 'CS 관리' },
        { href: `/operations/customer-support/${id}`, label: '상세' },
      ]}
      className="space-y-7"
    >
      <CustomerSupportDetails data={response.data} />
    </Main>
  );
}
