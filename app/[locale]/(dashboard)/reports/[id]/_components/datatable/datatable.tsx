'use client';

import type { SortingState } from '@tanstack/react-table';
import { type HTMLAttributes, type JSX, useEffect } from 'react';

import { columns } from '@/app/[locale]/(dashboard)/reports/[id]/_components/datatable/columns';
import { useSetReportState } from '@/app/[locale]/(dashboard)/reports/[id]/_lib/hooks/use-report';
import { Pagination } from '@/components/shared/pagination';
import { TableContent } from '@/components/shared/table-content';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QueryParamKey } from '@/lib/constants';
import { useTable } from '@/lib/hooks/use-table';
import { useTableActions } from '@/lib/hooks/use-table-actions';
import type { PaginatedResponse } from '@/lib/services/default/types/common';
import { type Report } from '@/lib/services/default/types/report';
import { cn } from '@/lib/utils';

interface DatatableProps extends HTMLAttributes<HTMLDivElement> {
  data: PaginatedResponse<Report>;
  hasFilter: boolean;
  sorting: SortingState;
}

export function Datatable({ className, data, sorting, hasFilter, ...props }: DatatableProps): JSX.Element {
  const setReport = useSetReportState();
  const { isPending, handleSortingChange, handlePaginationChange, handlePaginationPrefetch } = useTableActions();
  const { table } = useTable(
    { columns, data: data.items, rowCount: data.meta.totalItems },
    {
      sorting,
      pagination: {
        pageIndex: data.meta.currentPage - 1,
        pageSize: data.meta.itemsPerPage,
      },
    },
    {
      onSortingChange: (value) => {
        handleSortingChange(value, QueryParamKey.SortBy);
      },
      onPaginationChange: (value) => {
        handlePaginationChange(value, QueryParamKey.Page);
      },
    },
  );

  useEffect(() => {
    const row = table.getRow(String(data.items[0].id));

    row.toggleSelected(true);
    setReport(row.original);
  }, [data, setReport, table]);

  return (
    <Card className={cn('min-w-0', className)} {...props}>
      <CardHeader className="min-h-15 justify-center py-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex items-center gap-5">
            <CardTitle className="text-sm font-bold">전체 {data.meta.totalItems}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="border-t p-0">
        <TableContent
          hasFilter={hasFilter}
          loading={isPending}
          table={table}
          onRowClick={(row) => {
            table.resetRowSelection();
            row.toggleSelected(true);
            setReport(row.original);
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
