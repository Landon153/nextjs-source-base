import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { FAQForm } from '@/app/[locale]/(dashboard)/operations/faq/[id]/edit/components/faq-form';
import { getFAQDetails } from '@/lib/services/default/features/faq';

interface UserDetailsPageProps {
  params: { id: string };
}

export const metadata: Metadata = {
  title: '수정',
};

export default async function FaqEditPage({ params }: UserDetailsPageProps): Promise<JSX.Element> {
  const response = await getFAQDetails(params.id);

  if (!response.status) {
    notFound();
  }

  const { isShow, title, content, file } = response.data;

  return (
    <Main
      breadcrumbs={[
        { href: '/operations/faq', label: '운영 관리' },
        { href: '/operations/faq', label: '공지사항 관리' },
        { href: `/operations/faq/${params.id}/edit`, label: '수정' },
      ]}
    >
      <FAQForm
        defaultValues={{
          isShow,
          title,
          content,
          media: {
            file: undefined,
            image: {
              id: file.id,
              key: file.key,
              original: file.urlData.origin,
            },
          },
        }}
        id={params.id}
      />
    </Main>
  );
}
