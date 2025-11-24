import { type ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { SwitchToggleAction } from '@/app/[locale]/(dashboard)/community/posts/[id]/_components/datatable/switch-toggle-action';
import { Button } from '@/components/ui/button';
import { SortableButtonColumnHeader } from '@/components/ui/data-table';
import { formatDateTime } from '@/lib/helpers/date';
import { type Comment } from '@/lib/services/default/types/post';

export const columns: ColumnDef<Comment>[] = [
  {
    id: 'expand',
    size: 56,
    cell: ({ row }) => (
      <div className="text-center">
        {row.getCanExpand() ? (
          <Button
            icon
            aria-label={row.getIsExpanded() ? '접기' : '펼치기'}
            className="cursor-pointer"
            prefix={
              row.getIsExpanded() ? (
                <ChevronUp className="text-slate-400" />
              ) : (
                <ChevronDown className="text-slate-400" />
              )
            }
            size="sm"
            variant="ghost"
            onClick={row.getToggleExpandedHandler()}
          />
        ) : null}
      </div>
    ),
  },
  {
    accessorKey: 'content',
    header: '내용',
    size: 380,
  },
  {
    accessorKey: 'writer.nickname',
    id: 'writer.nickname',
    header: '작성자',
    size: 220,
    accessorFn: (row) => row.writer?.nickname,
    cell: ({ row }) => row.getValue<string>('writer.nickname') || '-',
  },
  {
    accessorKey: 'createdAt',
    size: 160,
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="등록일시" />,
    cell: ({ row }) => formatDateTime(row.getValue<string>('createdAt')),
  },
  {
    accessorKey: 'isShow',
    header: '공개 상태',
    cell: ({ row }) => <SwitchToggleAction row={row} />,
  },
  {
    accessorKey: 'hideAt',
    header: '비공개 처리일시',
    size: 160,
    cell: ({ row }) => formatDateTime(row.getValue<string | null>('hideAt')),
  },
  {
    accessorKey: 'statistic.totalReply',
    accessorFn: (row) => row.statistic?.totalReply ?? 0,
    id: 'statistic.totalReply',
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="대댓글 수" />,
    cell: ({ row }) => row.getValue<number | null>('statistic.totalReply') || '-',
  },
];
