import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { BannerForm } from '@/app/[locale]/(dashboard)/contents/banners/_components/banner-form';
import { getBannerDetails } from '@/lib/services/default/features/banners';

interface BannerDetailsPageProps {
  params: { id: string };
}

export const metadata: Metadata = {
  title: '수정',
};

export default async function BannersEditPage({ params }: BannerDetailsPageProps): Promise<JSX.Element> {
  const response = await getBannerDetails(params.id);

  if (!response.status) {
    notFound();
  }

  const { title, isShow, link, file } = response.data;

  return (
    <Main
      breadcrumbs={[
        { href: '/contents/banners', label: '콘텐츠 관리' },
        { href: '/contents/banners', label: '배너 관리' },
        { href: `/contents/banners/${params.id}/edit`, label: '수정' },
      ]}
    >
      <BannerForm
        defaultValues={{
          title,
          isShow,
          link,
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
