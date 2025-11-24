'use client';

import { type ExpandedState, getExpandedRowModel, type SortingState } from '@tanstack/react-table';
import { type HTMLAttributes, type JSX, useState } from 'react';

import { columns } from '@/app/[locale]/(dashboard)/community/posts/[id]/_components/datatable/columns';
import { TableContent } from '@/components/shared/table-content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { QueryParamKey } from '@/lib/constants';
import { useTable } from '@/lib/hooks/use-table';
import { useTableActions } from '@/lib/hooks/use-table-actions';
import { type PaginatedResponse } from '@/lib/services/default/types/common';
import { type Comment } from '@/lib/services/default/types/post';
import { cn } from '@/lib/utils';

interface DatatableProps extends HTMLAttributes<HTMLDivElement> {
  data: PaginatedResponse<Comment>;
  totalComments: number;
  totalReplies: number;
  sorting?: SortingState;
}

export function Datatable({
  children,
  className,
  data,
  sorting,
  totalReplies,
  totalComments,
  ...props
}: DatatableProps): JSX.Element {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const { isPending, handleSortingChange } = useTableActions();
  const { table } = useTable(
    {
      columns,
      data: data.items,
      getExpandedRowModel: getExpandedRowModel(),
      getSubRows: (row) => row.children || [],
      onExpandedChange: setExpanded,
      rowCount: data.meta.totalItems,
      state: { expanded },
    },
    { sorting },
    {
      onSortingChange: (value) => {
        handleSortingChange(value, QueryParamKey.SortBy);
      },
    },
  );

  return (
    <Card className={cn('min-w-0', className)} {...props}>
      <CardHeader className="min-h-15 justify-center py-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex items-center gap-5">
            <CardTitle className="text-sm font-bold">댓글 {totalComments}</CardTitle>
            <Separator className="h-3.5" orientation="vertical" />
            <p className="text-sm font-medium">대댓글 {totalReplies}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="border-t p-0">
        <TableContent loading={isPending} table={table} />
      </CardContent>

      {children}
    </Card>
  );
}
