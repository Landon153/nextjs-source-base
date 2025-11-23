'use client';

import { type SortingState } from '@tanstack/react-table';
import { type HTMLAttributes, type JSX } from 'react';

import { columns } from '@/app/[locale]/(dashboard)/admins/_components/datatable/columns';
import { ToggleDeleteAction } from '@/app/[locale]/(dashboard)/admins/_components/toggle-delete-action';
import { Pagination } from '@/components/shared/pagination';
import { SelectedRowsCount } from '@/components/shared/selected-rows-count';
import { TableContent } from '@/components/shared/table-content';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/styles/button-variants';
import { QueryParamKey } from '@/lib/constants';
import { useTable } from '@/lib/hooks/use-table';
import { useTableActions } from '@/lib/hooks/use-table-actions';
import { Link, useRouter } from '@/lib/i18n/routing';
import { type PaginatedResponse } from '@/lib/services/default/types/common';
import { type Admin } from '@/lib/services/default/types/user';
import { cn } from '@/lib/utils';

interface DatatableProps extends HTMLAttributes<HTMLDivElement> {
  data: PaginatedResponse<Admin>;
  hasFilter: boolean;
  sorting: SortingState;
}

export function Datatable({ className, data, sorting, hasFilter, ...props }: DatatableProps): JSX.Element {
  const router = useRouter();
  const { isPending, handleSortingChange, handlePaginationChange, handlePaginationPrefetch } = useTableActions();

  const { table } = useTable(
    { columns, data: data.items, rowCount: data.meta.totalItems },
    { sorting, pagination: { pageIndex: data.meta.currentPage - 1, pageSize: data.meta.itemsPerPage } },
    {
      onSortingChange: (value) => {
        handleSortingChange(value, QueryParamKey.SortBy);
      },
      onPaginationChange: (value) => {
        handlePaginationChange(value, QueryParamKey.Page);
      },
    },
  );

  return (
    <Card className={cn('', className)} {...props}>
      <CardHeader className="min-h-15 justify-center py-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex items-center gap-5">
            <CardTitle className="text-sm font-bold">전체 {data.meta.totalItems}</CardTitle>
            <Separator className="h-3.5" orientation="vertical" />
            <SelectedRowsCount table={table} />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <ToggleDeleteAction table={table} />
            <Link
              className={buttonVariants({ size: 'xs', variant: 'outline-2', className: 'w-28 bg-white' })}
              href="/admins/new"
            >
              등록
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="border-t p-0">
        <TableContent
          hasFilter={hasFilter}
          loading={isPending}
          table={table}
          onRowClick={(row) => {
            router.push(`/admins/${row.original.id}/edit`);
          }}
          onRowHover={(row) => {
            router.prefetch(`/admins/${row.original.id}/edit`);
          }}
        />
      </CardContent>

      <CardFooter className="justify-end p-0">
        <Pagination
          className="py-5.5 overflow-auto p-6"
          currentPage={data.meta.currentPage}
          totalPages={data.meta.totalPages}
          totalResults={data.meta.totalItems}
          onPageChange={(page) => {
            table.setPageIndex(page - 1);
          }}
          onPageHover={(page) => {
            handlePaginationPrefetch({ pageIndex: page - 1 }, QueryParamKey.Page);
          }}
        />
      </CardFooter>
    </Card>
  );
}
