'use client';

import { useMutation } from '@tanstack/react-query';
import { type SortingState } from '@tanstack/react-table';
import { type HTMLAttributes, type JSX } from 'react';

import { columns } from '@/app/[locale]/(dashboard)/contents/banners/_components/datatable/columns';
import { DeleteRowsDialog } from '@/app/[locale]/(dashboard)/contents/banners/_components/delete-rows-dialog';
import { Pagination } from '@/components/shared/pagination';
import { SelectedRowsCount } from '@/components/shared/selected-rows-count';
import { TableContentDraggable } from '@/components/shared/table-content-draggable';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';
import { buttonVariants } from '@/components/ui/styles/button-variants';
import { QueryParamKey } from '@/lib/constants';
import { useSortable } from '@/lib/hooks/use-sortable';
import { useTable } from '@/lib/hooks/use-table';
import { useTableActions } from '@/lib/hooks/use-table-actions';
import { Link, useRouter } from '@/lib/i18n/routing';
import { sortBanners } from '@/lib/services/default/features/banners';
import { type Banner } from '@/lib/services/default/types/banner';
import { type PaginatedResponse } from '@/lib/services/default/types/common';
import { cn } from '@/lib/utils';

interface DatatableProps extends HTMLAttributes<HTMLDivElement> {
  data: PaginatedResponse<Banner>;
  hasFilter: boolean;
  sorting: SortingState;
}

export function Datatable({ className, data, sorting, hasFilter, ...props }: DatatableProps): JSX.Element {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: sortBanners,
    onSuccess: (response) => {
      if (!response.status) {
        toast.error(response.message || '순서 변경에 실패했습니다.');
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message || '순서 변경에 실패했습니다.');
      }
    },
  });

  const { data: dataSorted, handleDragEnd } = useSortable(data.items, async (values) => {
    const sortedBanners = values.map((item, index) => ({
      id: item.id,
      sortOrder: data.meta.itemsPerPage * (data.meta.currentPage - 1) + index + 1,
    }));

    await mutateAsync({ items: sortedBanners });
  });

  const { isPending, handleSortingChange, handlePaginationChange, handlePaginationPrefetch } = useTableActions();

  const { table } = useTable(
    { columns, data: dataSorted, rowCount: data.meta.totalItems },
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
            <DeleteRowsDialog table={table} />
            <Link
              className={buttonVariants({ size: 'xs', variant: 'outline-2', className: 'w-28 bg-white' })}
              href="/contents/banners/new"
            >
              등록
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="border-t p-0">
        <TableContentDraggable
          hasFilter={hasFilter}
          loading={isPending}
          table={table}
          onDragEnd={handleDragEnd}
          onRowClick={(row) => {
            router.push(`/contents/banners/${row.original.id}/edit`);
          }}
          onRowHover={(row) => {
            router.prefetch(`/contents/banners/${row.original.id}/edit`);
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
