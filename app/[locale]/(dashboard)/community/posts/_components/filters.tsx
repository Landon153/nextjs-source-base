'use client';

import { endOfDay } from 'date-fns/endOfDay';
import { type HTMLAttributes, type JSX, useMemo } from 'react';

import { FilterDateRangePicker } from '@/app/[locale]/(dashboard)/_components/filter/filter-date-range-picker';
import { FilterSearch } from '@/app/[locale]/(dashboard)/_components/filter/filter-search';
import { FilterSelect } from '@/app/[locale]/(dashboard)/_components/filter/filter-select';
import { ResetFiltersButton } from '@/app/[locale]/(dashboard)/_components/reset-filters-button';
import { getOneYearAgo } from '@/app/[locale]/(dashboard)/_lib/date';
import { statusOptions } from '@/app/[locale]/(dashboard)/community/posts/_lib/constants';
import type { GetPostsValues } from '@/app/[locale]/(dashboard)/community/posts/_lib/schema/get-posts-schema';
import { QueryParamKey } from '@/lib/constants';
import { useUrlParams } from '@/lib/hooks/use-url-params';
import { cn } from '@/lib/utils';

const resetStateParams: Partial<Record<QueryParamKey, undefined>> = {
  [QueryParamKey.From]: undefined,
  [QueryParamKey.To]: undefined,
  [QueryParamKey.Status]: undefined,
  [QueryParamKey.Search]: undefined,
};
const resetStateKeys = Object.keys(resetStateParams);

/* -----------------------------------------------------------------------------
 * Component: Filters
 * -------------------------------------------------------------------------- */

interface FiltersProps extends HTMLAttributes<HTMLDivElement> {
  validatedParams: GetPostsValues;
}

export function Filters({ className, validatedParams, ...props }: FiltersProps): JSX.Element {
  const oneYearAgo = useMemo(() => getOneYearAgo(), []);
  const urlParams = useUrlParams();

  const handleFilter = (filter: Record<string, string | undefined>): void => {
    urlParams.push({ ...filter, [QueryParamKey.Page]: undefined });
  };

  return (
    <div className={cn('space-y-4', className)} {...props}>
      <div className="flex flex-wrap gap-4">
        <FilterDateRangePicker
          disabled={(date) => date < oneYearAgo || date > new Date()}
          endMonth={new Date()}
          placeholder="등록 기간을 선택해주세요"
          startMonth={oneYearAgo}
          value={{ from: validatedParams[QueryParamKey.From], to: validatedParams[QueryParamKey.To] }}
          onValueChange={(value) => {
            handleFilter({
              [QueryParamKey.From]: value?.from?.toISOString(),
              [QueryParamKey.To]: value?.to && endOfDay(value.to).toISOString(),
            });
          }}
        />

        <FilterSelect
          options={statusOptions}
          placeholder="공개 상태"
          value={validatedParams[QueryParamKey.Status]}
          onValueChange={(value) => {
            handleFilter({ [QueryParamKey.Status]: value });
          }}
        />

        <FilterSearch
          placeholder="작성자를 입력해주세요"
          value={validatedParams[QueryParamKey.Search]}
          onValueChange={(value) => {
            handleFilter({ [QueryParamKey.Search]: value });
          }}
        />

        <ResetFiltersButton
          resetKeys={resetStateKeys}
          onClick={() => {
            urlParams.push({ ...resetStateParams, [QueryParamKey.Page]: undefined });
          }}
        />
      </div>
    </div>
  );
}
