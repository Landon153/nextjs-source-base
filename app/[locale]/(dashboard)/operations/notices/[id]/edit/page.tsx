import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { NoticeForm } from '@/app/[locale]/(dashboard)/operations/notices/_components/notices-form';
import { getNoticeDetails } from '@/lib/services/default/features/notices';

interface UserDetailsPageProps {
  params: { id: string };
}

export const metadata: Metadata = {
  title: '수정',
};

export default async function NoticeEditPage({ params }: UserDetailsPageProps): Promise<JSX.Element> {
  const response = await getNoticeDetails(params.id);

  if (!response.status) {
    notFound();
  }

  const { isShow, title, content } = response.data;

  return (
    <Main
      breadcrumbs={[
        { href: '/operations/notices', label: '운영 관리' },
        { href: '/operations/notices', label: '공지사항 관리' },
        { href: `/operations/notices/${params.id}/edit`, label: '수정' },
      ]}
    >
      <NoticeForm defaultValues={{ isShow, title, content }} id={params.id} />
    </Main>
  );
}
