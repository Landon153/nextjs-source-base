'use client';

import { endOfDay } from 'date-fns/endOfDay';
import { type HTMLAttributes, type JSX, useMemo } from 'react';

import { FilterDateRangePicker } from '@/app/[locale]/(dashboard)/_components/filter/filter-date-range-picker';
import { FilterSearchCondition } from '@/app/[locale]/(dashboard)/_components/filter/filter-search-condition';
import { FilterSelect } from '@/app/[locale]/(dashboard)/_components/filter/filter-select';
import { ResetFiltersButton } from '@/app/[locale]/(dashboard)/_components/reset-filters-button';
import { getOneYearAgo } from '@/app/[locale]/(dashboard)/_lib/date';
import {
  answerStatusOptions,
  searchConditionOptions,
  SearchConditionValues,
} from '@/app/[locale]/(dashboard)/operations/customer-support/_lib/constants';
import { type GetCustomerSupportsValues } from '@/app/[locale]/(dashboard)/operations/customer-support/_lib/schema/get-customer-supports-schema';
import { QueryParamKey } from '@/lib/constants';
import { useUrlParams } from '@/lib/hooks/use-url-params';
import { cn } from '@/lib/utils';

const resetStateParams: Partial<Record<QueryParamKey, undefined>> = {
  [QueryParamKey.From]: undefined,
  [QueryParamKey.To]: undefined,
  [QueryParamKey.IsAnswer]: undefined,
  [QueryParamKey.SearchBy]: undefined,
  [QueryParamKey.Search]: undefined,
};
const resetStateKeys = Object.keys(resetStateParams);

/* -----------------------------------------------------------------------------
 * Component: Filters
 * -------------------------------------------------------------------------- */

interface FiltersProps extends HTMLAttributes<HTMLDivElement> {
  validatedParams: GetCustomerSupportsValues;
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
          placeholder="문의 기간을 선택해주세요"
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
          options={answerStatusOptions}
          placeholder="문의 상태"
          value={validatedParams[QueryParamKey.IsAnswer]}
          onValueChange={(value) => {
            handleFilter({ [QueryParamKey.IsAnswer]: value });
          }}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <FilterSearchCondition
          classNames={{ select: { trigger: 'w-auto min-w-36' } }}
          defaultValues={{ select: SearchConditionValues.Email }}
          options={searchConditionOptions}
          placeholders={{ select: '검색 조건', input: '검색어를 입력해주세요' }}
          values={{
            select: validatedParams[QueryParamKey.SearchBy],
            input: validatedParams[QueryParamKey.Search],
          }}
          onValueChange={{
            select: (value) => {
              urlParams.push({ [QueryParamKey.SearchBy]: value });
            },
            input: (value) => {
              handleFilter({ [QueryParamKey.Search]: value });
            },
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
