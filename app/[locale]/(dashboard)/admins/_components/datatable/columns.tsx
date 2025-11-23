import { type ColumnDef } from '@tanstack/react-table';

import { SwitchBanAction } from '@/app/[locale]/(dashboard)/admins/_components/datatable/switch-ban-action';
import { Checkbox } from '@/components/ui/checkbox';
import { SortableButtonColumnHeader } from '@/components/ui/data-table';
import { formatDateTime } from '@/lib/helpers/date';
import { type Admin } from '@/lib/services/default/types/user';

export const columns: ColumnDef<Admin>[] = [
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
    accessorKey: 'nickname',
    header: '관리자명',
    size: 220,
  },
  {
    accessorKey: 'email',
    header: '이메일(ID)',
    size: 240,
  },
  {
    accessorKey: 'createdAt',
    size: 160,
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="생성일시" />,
    cell: ({ row }) => formatDateTime(row.getValue<string>('createdAt')),
  },
  {
    accessorKey: 'status',
    header: '이용 중지',
    cell: ({ row }) => <SwitchBanAction row={row} />,
  },
  {
    accessorKey: 'bannedAt',
    size: 160,
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="이용 중지 처리일시" />,
    cell: ({ row }) => formatDateTime(row.getValue<string | null>('bannedAt')),
  },
];
