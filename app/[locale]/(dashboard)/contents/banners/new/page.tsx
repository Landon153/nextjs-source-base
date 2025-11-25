import { type Metadata } from 'next';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { BannerForm } from '@/app/[locale]/(dashboard)/contents/banners/_components/banner-form';

export const metadata: Metadata = {
  title: '배너 관리 - 등록',
};

export default function BannerNewPage(): JSX.Element {
  return (
    <Main
      breadcrumbs={[
        { href: '/contents/banners', label: '콘텐츠 관리' },
        { href: '/contents/banners', label: '배너 관리' },
        { href: '/contents/banners/new', label: '등록' },
      ]}
    >
      <BannerForm />
    </Main>
  );
}
