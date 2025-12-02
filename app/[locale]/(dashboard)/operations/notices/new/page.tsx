import { type Metadata } from 'next';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { NoticeForm } from '@/app/[locale]/(dashboard)/operations/notices/_components/notices-form';

export const metadata: Metadata = {
  title: '등록',
};

export default function NoticeNewPage(): JSX.Element {
  return (
    <Main
      breadcrumbs={[
        { href: '/operations/notices', label: '운영 관리' },
        { href: '/operations/notices', label: '공지사항 관리' },
        { href: '/operations/notices', label: '등록' },
      ]}
      className="space-y-7"
    >
      <NoticeForm />
    </Main>
  );
}
