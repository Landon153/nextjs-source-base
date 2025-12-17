'use client';

import { endOfDay } from 'date-fns/endOfDay';
import { type HTMLAttributes, type JSX, useMemo } from 'react';

import { FilterDateRangePicker } from '@/app/[locale]/(dashboard)/_components/filter/filter-date-range-picker';
import { FilterSearchCondition } from '@/app/[locale]/(dashboard)/_components/filter/filter-search-condition';
import { FilterSelect } from '@/app/[locale]/(dashboard)/_components/filter/filter-select';
import { ResetFiltersButton } from '@/app/[locale]/(dashboard)/_components/reset-filters-button';
import { getOneYearAgo } from '@/app/[locale]/(dashboard)/_lib/date';
import {
  SearchConditionValues,
  statusOptions,
  userSearchConditionOptions,
} from '@/app/[locale]/(dashboard)/users/_lib/constants';
import { type GetUsersValues } from '@/app/[locale]/(dashboard)/users/_lib/schema/get-users-schema';
import { QueryParamKey } from '@/lib/constants';
import { useUrlParams } from '@/lib/hooks/use-url-params';
import { cn } from '@/lib/utils';

const resetStateParams: Partial<Record<QueryParamKey, undefined>> = {
  [QueryParamKey.From]: undefined,
  [QueryParamKey.To]: undefined,
  [QueryParamKey.MarketingNotifyStatus]: undefined,
  [QueryParamKey.SuspensionStatus]: undefined,
  [QueryParamKey.SearchBy]: undefined,
  [QueryParamKey.Search]: undefined,
};
const resetStateKeys = Object.keys(resetStateParams);

/* -----------------------------------------------------------------------------
 * Component: Filters
 * -------------------------------------------------------------------------- */

interface FiltersProps extends HTMLAttributes<HTMLDivElement> {
  validatedParams: GetUsersValues;
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
          placeholder="가입 기간을 선택해주세요"
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
          placeholder="수신동의 상태"
          value={validatedParams[QueryParamKey.MarketingNotifyStatus]}
          onValueChange={(value) => {
            handleFilter({ [QueryParamKey.MarketingNotifyStatus]: value });
          }}
        />

        <FilterSelect
          options={statusOptions}
          placeholder="이용중지 상태"
          value={validatedParams[QueryParamKey.SuspensionStatus]}
          onValueChange={(value) => {
            handleFilter({ [QueryParamKey.SuspensionStatus]: value });
          }}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <FilterSearchCondition
          defaultValues={{ select: SearchConditionValues.Nickname }}
          options={userSearchConditionOptions}
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
