import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { forwardRef, type HTMLAttributes, type JSX, useCallback, useRef, useTransition } from 'react';

import MagnifyingGlassIcon from '@/assets/svg/icon/magnifying-glass.svg';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/ui/text-input';
import { useResetFilters } from '@/lib/hooks/use-reset-filters';
import { cn } from '@/lib/utils';

type FilterSearchElement = HTMLInputElement;

interface FilterSearchProps extends HTMLAttributes<HTMLDivElement> {
  classNames?: { input?: string };
  onValueChange?: (value: string | undefined) => void;
  placeholder?: string;
  value?: string;
}

export const FilterSearch = forwardRef<FilterSearchElement, FilterSearchProps>(
  (
    { classNames, className, value, placeholder, onValueChange, ...props }: FilterSearchProps,
    forwardedRef,
  ): JSX.Element => {
    const inputRef = useRef<FilterSearchElement>(null);
    const composedInputRef = useComposedRefs(forwardedRef, inputRef);
    const [isPending, startTransition] = useTransition();

    const pushSearchParam = useCallback((): void => {
      startTransition(() => {
        const search = inputRef.current?.value;

        onValueChange?.(search);
      });
    }, [onValueChange]);

    useResetFilters(() => {
      if (!inputRef.current) {
        return;
      }

      inputRef.current.value = '';
    });

    return (
      <div className={cn('flex flex-wrap gap-4', className)} {...props}>
        <div className="flex gap-4">
          <TextInput
            ref={composedInputRef}
            className={cn('w-auto rounded bg-white lg:w-105', classNames?.input)}
            defaultValue={value}
            disabled={isPending}
            placeholder={placeholder}
            onKeyDown={(event) => {
              event.key === 'Enter' && pushSearchParam();
            }}
          />

          <Button
            icon
            aria-label="검색"
            className="shrink-0 rounded"
            disabled={isPending}
            prefix={<MagnifyingGlassIcon />}
            onClick={pushSearchParam}
          />
        </div>
      </div>
    );
  },
);

FilterSearch.displayName = 'FilterSearch';
