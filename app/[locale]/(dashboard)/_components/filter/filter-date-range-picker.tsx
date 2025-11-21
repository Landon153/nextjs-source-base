import { type ComponentProps, type JSX, useState, useTransition } from 'react';
import { type DateRange } from 'react-day-picker';

import { DateRangePicker } from '@/components/shared/date-range-picker';
import { useResetFilters } from '@/lib/hooks/use-reset-filters';
import { cn } from '@/lib/utils';

interface FilterDateRangePickerProps extends ComponentProps<typeof DateRangePicker> {
  classNames?: { trigger?: string };
  onValueChange?: (value: DateRange | undefined) => void;
  placeholder?: string;
  value?: DateRange;
}

export function FilterDateRangePicker({
  classNames,
  placeholder,
  value,
  onValueChange,
  ...props
}: FilterDateRangePickerProps): JSX.Element {
  const [isPending, startTransition] = useTransition();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: value?.from,
    to: value?.to,
  });

  useResetFilters(() => {
    setDateRange({ from: undefined, to: undefined });
  });

  return (
    <DateRangePicker
      placeholder={placeholder}
      trigger={{
        disabled: isPending,
        className: cn('w-auto min-w-64 text-muted-foreground', classNames?.trigger),
      }}
      value={dateRange}
      onChange={(newValue) => {
        setDateRange(newValue);
        startTransition(() => {
          onValueChange?.(newValue);
        });
      }}
      {...props}
    />
  );
}
