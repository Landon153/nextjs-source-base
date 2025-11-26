import { type ColumnDef } from '@tanstack/react-table';

import { AccessLogType, type FailReason, FailReasonLabel } from '@/app/[locale]/(dashboard)/logs/access/_lib/constants';
import { SortableButtonColumnHeader } from '@/components/ui/data-table';
import { formatDateTime } from '@/lib/helpers/date';
import { type LogAccess } from '@/lib/services/default/types/log';

export const columns: ColumnDef<LogAccess>[] = [
  {
    accessorKey: 'user.email',
    id: 'user.email',
    header: '이메일(ID)',
    size: 240,
  },
  {
    accessorKey: 'ipAddress',
    header: '접속지 IP',
  },
  {
    id: 'result',
    header: '결과',
    cell: ({ row }) => {
      const failedResult = row.getValue<FailReason | null>('failReason');

      return failedResult ? AccessLogType.Fail : AccessLogType.Success;
    },
  },
  {
    accessorKey: 'failReason',
    header: '메세지',
    size: 250,
    cell: ({ row }) => {
      const type = row.getValue<FailReason>('failReason');

      return FailReasonLabel[type] || '-';
    },
  },
  {
    accessorKey: 'createdAt',
    size: 160,
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="일시" />,
    cell: ({ row }) => formatDateTime(row.getValue<string | null>('createdAt')),
  },
];
