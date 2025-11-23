import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const useCurrentPage = (): number => {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const page = Number(searchParams.get('page'));

    if (isNaN(page) || page < 1) {
      return 1;
    }

    return page;
  }, [searchParams]);
};
