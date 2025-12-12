import { type ColumnDef } from '@tanstack/react-table';

import { SortableButtonColumnHeader } from '@/components/ui/data-table';
import { formatDateTime } from '@/lib/helpers/date';
import { type User } from '@/lib/services/default/types/user';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'rowIndex',
    header: 'NO',
    size: 65,
  },
  {
    accessorKey: 'nickname',
    header: '신고당한 사람',
    size: 220,
  },
  {
    accessorKey: 'statistic.totalReported',
    id: 'statistic.totalReported',
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="누적 신고 수" />,
    cell: ({ row }) => row.getValue<number>('statistic.totalReported').toLocaleString(),
  },
  {
    accessorKey: 'statistic.recentReportedAt',
    id: 'statistic.recentReportedAt',
    size: 160,
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="최근 신고일시" />,
    cell: ({ row }) => formatDateTime(row.getValue<string>('statistic.recentReportedAt')),
  },
];
