import { type ColumnDef } from '@tanstack/react-table';

import { SwitchShowAction } from '@/app/[locale]/(dashboard)/operations/faq/_components/datatable/switch-show-action';
import { Checkbox } from '@/components/ui/checkbox';
import { SortableButtonColumnHeader } from '@/components/ui/data-table';
import { formatDateTime } from '@/lib/helpers/date';
import { type FAQ } from '@/lib/services/default/types/faq';

export const columns: ColumnDef<FAQ>[] = [
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
    accessorKey: 'creator.nickname',
    id: 'creator.nickname',
    header: '등록자명',
    size: 220,
  },
  {
    accessorKey: 'createdAt',
    size: 160,
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="등록일시" />,
    cell: ({ row }) => formatDateTime(row.getValue<string | null>('createdAt')),
  },
  {
    accessorKey: 'isShow',
    header: '공개 상태',
    cell: ({ row }) => <SwitchShowAction row={row} />,
  },
];
