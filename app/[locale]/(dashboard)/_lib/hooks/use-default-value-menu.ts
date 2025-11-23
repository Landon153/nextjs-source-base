import { useMemo } from 'react';

import { matchPathname } from '@/app/[locale]/(dashboard)/_lib/pathname';
import { type MenuItem } from '@/lib/auth/definitions';
import { usePathname } from '@/lib/i18n/routing';

/**
 * Retrieves the path from the list of menu items based on the current pathname.
 *
 * @param items - The array of menu items to search through.
 * @returns - The path that matches the current pathname, or undefined if no match is found.
 */
export function useDefaultValueMenu(items: MenuItem[]): MenuItem | undefined {
  const pathname = usePathname();

  return useMemo(
    () => items.find((item) => matchPathname(item.regexPath, pathname)),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to update the value when hard reload
    [items],
  );
}
