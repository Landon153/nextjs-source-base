import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

export interface BreadcrumbAtom {
  href: string;
  label: string;
}

const breadcrumbAtom = atom<BreadcrumbAtom[]>([]);

/**
 * Retrieves the current value of the breadcrumb segments from the breadcrumb state using Jotai.
 *
 * @returns An array of BreadcrumbAtom objects representing the current breadcrumb segments.
 */
export function useBreadcrumbValue(): BreadcrumbAtom[] {
  return useAtomValue(breadcrumbAtom);
}

/**
 * Sets the state of the breadcrumb using Jotai's useSetAtom hook.
 *
 * @param defaultValue - An optional parameter specifying the default value for the breadcrumb state. It defaults to an
 *   empty array.
 *
 * @returns The setter function for the breadcrumb state.
 */
export function useSetBreadcrumbState(defaultValue: BreadcrumbAtom[] = []): (update: BreadcrumbAtom[]) => void {
  const setBreadcrumbState = useSetAtom(breadcrumbAtom);

  useEffect(() => {
    setBreadcrumbState(defaultValue);

    return () => {
      setBreadcrumbState([]);
    };
  }, [defaultValue, setBreadcrumbState]);

  return setBreadcrumbState;
}
