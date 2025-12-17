import { type ColumnDef } from '@tanstack/react-table';

import { SortableButtonColumnHeader } from '@/components/ui/data-table';
import { formatDateTime } from '@/lib/helpers/date';
import type { User } from '@/lib/services/default/types/user';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'rowIndex',
    header: 'NO',
    size: 65,
  },
  {
    accessorKey: 'nickname',
    header: '차단당한 사람',
    size: 220,
  },
  {
    accessorKey: 'statistic.totalBlocked',
    id: 'statistic.totalBlocked',
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="누적 차단 수" />,
    cell: ({ row }) => row.getValue<number>('statistic.totalBlocked').toLocaleString(),
  },
  {
    accessorKey: 'statistic.totalUnblocked',
    id: 'statistic.totalUnblocked',
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="누적 차단 해제 수" />,
    cell: ({ row }) => row.getValue<number>('statistic.totalUnblocked').toLocaleString(),
  },
  {
    accessorKey: 'statistic.recentBlockedOrUnblockedAt',
    id: 'statistic.recentBlockedOrUnblockedAt',
    size: 160,
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="최근 처리일시" />,
    cell: ({ row }) => formatDateTime(row.getValue<string | null>('statistic.recentBlockedOrUnblockedAt')),
  },
];
