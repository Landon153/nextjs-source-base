import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { EventForm } from '@/app/[locale]/(dashboard)/contents/events/_components/event-form';
import { getEventDetails } from '@/lib/services/default/features/events';

interface EventDetailsPageProps {
  params: { id: string };
}

export const metadata: Metadata = {
  title: '수정',
};

export default async function EventEditPage({ params }: EventDetailsPageProps): Promise<JSX.Element> {
  const response = await getEventDetails(params.id);

  if (!response.status) {
    notFound();
  }

  const { title, isShow, content, isPushNoti, fromDate, toDate, file } = response.data;

  return (
    <Main
      breadcrumbs={[
        { href: '/contents/events', label: '콘텐츠 관리' },
        { href: '/contents/events', label: '이벤트 관리' },
        { href: `/contents/events/${params.id}/edit`, label: '수정' },
      ]}
    >
      <EventForm
        defaultValues={{
          title,
          content,
          isShow,
          isPushNoti,
          eventDates: {
            fromDate: new Date(fromDate),
            toDate: new Date(toDate),
          },
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
