'use client';

import { type JSX, useState, useTransition } from 'react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useResetFilters } from '@/lib/hooks/use-reset-filters';
import { cn } from '@/lib/utils';

interface FilterSelectProps {
  options: { label: string; value: string }[];
  classNames?: { item?: string; trigger?: string };
  defaultValue?: string;
  disabled?: boolean;
  onValueChange?: (value: string | undefined) => void;
  placeholder?: string;
  value?: string;
}

export function FilterSelect({
  options,
  classNames,
  disabled,
  defaultValue,
  value,
  placeholder,
  onValueChange,
}: FilterSelectProps): JSX.Element {
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<string | undefined>(value ?? defaultValue ?? '');

  useResetFilters(() => {
    setSelected(defaultValue || '');
  });

  return (
    <Select
      disabled={disabled ?? isPending}
      value={selected}
      onValueChange={(newValue) => {
        setSelected(newValue);
        startTransition(() => {
          onValueChange?.(newValue);
        });
      }}
    >
      <SelectTrigger
        className={cn(
          'w-auto min-w-36 rounded bg-white',
          selected ? 'text-foreground' : 'text-muted-foreground',
          classNames?.trigger,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="min-w-min">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={String(option.value)}
              className={cn('[&_svg]:opacity-0', classNames?.item)}
              value={String(option.value)}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
