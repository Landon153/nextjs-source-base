import { type Metadata } from 'next';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { EventForm } from '@/app/[locale]/(dashboard)/contents/events/_components/event-form';

export const metadata: Metadata = {
  title: '등록',
};

export default function NewEventPage(): JSX.Element {
  return (
    <Main
      breadcrumbs={[
        { href: '/contents/events', label: '콘텐츠 관리' },
        { href: '/contents/events', label: '이벤트 관리' },
        { href: '/contents/events/new', label: '등록' },
      ]}
    >
      <EventForm />
    </Main>
  );
}
