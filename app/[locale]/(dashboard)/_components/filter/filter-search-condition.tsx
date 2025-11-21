import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { forwardRef, type HTMLAttributes, type JSX, useCallback, useRef, useTransition } from 'react';

import { FilterSelect } from '@/app/[locale]/(dashboard)/_components/filter/filter-select';
import MagnifyingGlassIcon from '@/assets/svg/icon/magnifying-glass.svg';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/ui/text-input';
import { useResetFilters } from '@/lib/hooks/use-reset-filters';
import { cn } from '@/lib/utils';

type FilterSearchConditionElement = HTMLInputElement;
interface FilterSearchConditionProps extends HTMLAttributes<HTMLDivElement> {
  options: { label: string; value: string }[];
  classNames?: { input?: string; select?: { trigger?: string } };
  defaultValues?: { input?: string; select?: string };
  onValueChange?: { input?: (value: string | undefined) => void; select?: (value: string | undefined) => void };
  placeholders?: { input?: string; select?: string };
  values?: { input?: string; select?: string };
}

export const FilterSearchCondition = forwardRef<FilterSearchConditionElement, FilterSearchConditionProps>(
  (
    {
      className,
      placeholders,
      options,
      defaultValues,
      classNames,
      values,
      onValueChange,
      ...props
    }: FilterSearchConditionProps,
    forwardedRef,
  ): JSX.Element => {
    const inputRef = useRef<FilterSearchConditionElement>(null);
    const composedInputRef = useComposedRefs(forwardedRef, inputRef);
    const [isPending, startTransition] = useTransition();

    const pushSearchParam = useCallback((): void => {
      startTransition(() => {
        const search = inputRef.current?.value;

        onValueChange?.input?.(search);
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
        <FilterSelect
          classNames={{ trigger: cn('w-auto min-w-28', classNames?.select?.trigger) }}
          defaultValue={defaultValues?.select}
          disabled={isPending}
          options={options}
          placeholder={placeholders?.select}
          value={values?.select}
          onValueChange={(value) => {
            onValueChange?.select?.(value);
          }}
        />

        <div className="flex gap-4">
          <TextInput
            ref={composedInputRef}
            className={cn('w-auto rounded bg-white lg:w-105', classNames?.input)}
            defaultValue={values?.input ?? defaultValues?.input}
            disabled={isPending}
            placeholder={placeholders?.input}
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

FilterSearchCondition.displayName = 'FilterSearchCondition';
