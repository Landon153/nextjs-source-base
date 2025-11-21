'use client';

import { composeEventHandlers } from '@radix-ui/primitive';
import { useSearchParams } from 'next/navigation';
import { type ComponentProps, type JSX } from 'react';

import RotateCcwIcon from '@/assets/svg/icon/rotate-ccw.svg';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ResetFiltersButtonProps extends Omit<ComponentProps<typeof Button>, 'variant'> {
  resetKeys: string[];
}

export function ResetFiltersButton({ className, resetKeys, onClick, ...props }: ResetFiltersButtonProps): JSX.Element {
  const searchParams = useSearchParams();

  // Check if all reset keys are present in the search params
  const disabled = !resetKeys.some((key) => searchParams.has(key));

  return (
    <Button
      className={cn('rounded bg-white', className)}
      disabled={disabled}
      prefix={<RotateCcwIcon />}
      variant="outline-2"
      onClick={composeEventHandlers(onClick, () => {
        const event = new CustomEvent('reset-filters', { detail: { resetKeys } });

        window.dispatchEvent(event);
      })}
      {...props}
    >
      초기화
    </Button>
  );
}
