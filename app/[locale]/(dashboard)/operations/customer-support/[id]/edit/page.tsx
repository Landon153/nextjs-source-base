import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { CustomerSupportDetails } from '@/app/[locale]/(dashboard)/operations/customer-support/[id]/edit/_components/customer-support-details';
import { CustomerSupportForm } from '@/app/[locale]/(dashboard)/operations/customer-support/[id]/edit/_components/customer-support-form';
import { getCustomerSupportDetails } from '@/lib/services/default/features/customer-support';

interface UserDetailsPageProps {
  params: { id: string };
}

export const metadata: Metadata = {
  title: '상세',
};

export default async function CustomerSupportEditPage({ params }: UserDetailsPageProps): Promise<JSX.Element> {
  const response = await getCustomerSupportDetails(params.id);

  if (!response.status) {
    notFound();
  }

  const { answerContent } = response.data;

  return (
    <Main
      breadcrumbs={[
        { href: '/operations/customer-support', label: '운영 관리' },
        { href: '/operations/customer-support', label: 'CS 관리' },
        { href: `/operations/customer-support/${params.id}/edit`, label: '상세' },
      ]}
    >
      <CustomerSupportForm defaultValues={{ answerContent }} id={params.id}>
        <CustomerSupportDetails data={response.data} />
      </CustomerSupportForm>
    </Main>
  );
}
