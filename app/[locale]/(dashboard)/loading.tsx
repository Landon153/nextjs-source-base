import { type JSX } from 'react';

import { Spinner } from '@/components/ui/spinner';

export default function Loading(): JSX.Element {
  return (
    <main className="grid grow place-items-center">
      <Spinner />
    </main>
  );
}
