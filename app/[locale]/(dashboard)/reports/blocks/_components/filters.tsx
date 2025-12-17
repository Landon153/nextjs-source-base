'use client';

import { type HTMLAttributes, type JSX } from 'react';

import { FilterSearch } from '@/app/[locale]/(dashboard)/_components/filter/filter-search';
import { ResetFiltersButton } from '@/app/[locale]/(dashboard)/_components/reset-filters-button';
import { type GetBlockedUsersValues } from '@/app/[locale]/(dashboard)/reports/blocks/_lib/schema/get-blocked-users-schema';
import { QueryParamKey } from '@/lib/constants';
import { useUrlParams } from '@/lib/hooks/use-url-params';
import { cn } from '@/lib/utils';

const resetStateParams: Partial<Record<QueryParamKey, undefined>> = {
  [QueryParamKey.Search]: undefined,
};
const resetStateKeys = Object.keys(resetStateParams);

/* -----------------------------------------------------------------------------
 * Component: Filters
 * -------------------------------------------------------------------------- */

interface FiltersProps extends HTMLAttributes<HTMLDivElement> {
  validatedParams: GetBlockedUsersValues;
}

export function Filters({ className, validatedParams, ...props }: FiltersProps): JSX.Element {
  const urlParams = useUrlParams();

  const handleFilter = (filter: Record<string, string | undefined>): void => {
    urlParams.push({ ...filter, [QueryParamKey.Page]: undefined });
  };

  return (
    <div className={cn('space-y-4', className)} {...props}>
      <div className="flex flex-wrap gap-4">
        <FilterSearch
          placeholder="닉네임을 입력해주세요"
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
