import { type ColumnDef } from '@tanstack/react-table';

import { SortableButtonColumnHeader } from '@/components/ui/data-table';
import { formatDateTime } from '@/lib/helpers/date';
import { type Block, BlockStatus } from '@/lib/services/default/types/block';

export const columns: ColumnDef<Block>[] = [
  {
    accessorKey: 'rowIndex',
    header: 'NO',
    size: 65,
  },
  {
    accessorKey: 'blocker.nickname',
    id: 'blocker.nickname',
    header: '차단한 사람',
    size: 220,
    cell: ({ row }) => row.getValue<string>('blocker.nickname'),
  },
  {
    accessorKey: 'status',
    header: '차단 상태',
    cell: ({ row }) => (row.getValue<BlockStatus>('status') === BlockStatus.Blocked ? '차단' : '차단 해제'),
  },
  {
    accessorKey: 'updatedAt',
    size: 160,
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="처리일시" />,
    cell: ({ row }) => formatDateTime(row.getValue<string | null>('updatedAt')),
  },
];
