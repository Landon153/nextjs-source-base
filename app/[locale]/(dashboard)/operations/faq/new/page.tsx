import { type Metadata } from 'next';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { FAQForm } from '@/app/[locale]/(dashboard)/operations/faq/[id]/edit/components/faq-form';

export const metadata: Metadata = {
  title: '등록',
};

export default function FaqNewPage(): JSX.Element {
  return (
    <Main
      breadcrumbs={[
        { href: '/operations/faq', label: '운영 관리' },
        { href: '/operations/faq', label: 'FAQ 관리' },
        { href: '/operations/faq', label: '등록' },
      ]}
      className="space-y-7"
    >
      <FAQForm />
    </Main>
  );
}
