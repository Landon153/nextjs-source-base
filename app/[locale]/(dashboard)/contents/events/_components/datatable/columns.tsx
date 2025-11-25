import { type ColumnDef } from '@tanstack/react-table';

import { SwitchShowAction } from '@/app/[locale]/(dashboard)/contents/events/_components/datatable/switch-show-action';
import { StatusLabels, type StatusValues } from '@/app/[locale]/(dashboard)/contents/events/_lib/constants';
import { Checkbox } from '@/components/ui/checkbox';
import { SortableButtonColumnHeader } from '@/components/ui/data-table';
import { formatDateTime } from '@/lib/helpers/date';
import { type Event } from '@/lib/services/default/types/event';

export const columns: ColumnDef<Event>[] = [
  {
    id: 'select',
    size: 56,
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(Boolean(value));
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(value) => {
          row.toggleSelected(Boolean(value));
        }}
      />
    ),
  },
  {
    accessorKey: 'rowIndex',
    header: 'NO',
    size: 65,
  },
  {
    accessorKey: 'title',
    header: '제목',
    size: 240,
  },
  {
    accessorKey: 'status',
    header: '진행 상태',
    cell: ({ row }) => {
      const statusType = row.getValue<StatusValues>('status');

      return StatusLabels[statusType];
    },
  },
  {
    accessorKey: 'fromDate',
    size: 160,
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="시작일시" />,
    cell: ({ row }) => formatDateTime(row.getValue<string | null>('fromDate')),
  },
  {
    accessorKey: 'toDate',
    size: 160,
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="종료일시" />,
    cell: ({ row }) => formatDateTime(row.getValue<string | null>('toDate')),
  },
  {
    accessorKey: 'isPushNoti',
    header: '푸시알림 발송 여부',
    cell: ({ row }) => (row.getValue<string | null>('isPushNoti') ? 'Y' : 'N'),
  },
  {
    accessorKey: 'isShow',
    header: '공개 상태',
    cell: ({ row }) => <SwitchShowAction row={row} />,
  },
  {
    accessorKey: 'createdAt',
    size: 160,
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="등록일시" />,
    cell: ({ row }) => formatDateTime(row.getValue<string>('createdAt')),
  },
];
