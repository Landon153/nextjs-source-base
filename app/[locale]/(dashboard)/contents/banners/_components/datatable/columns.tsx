import { type ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import { RowDragHandleCell } from '@/components/shared/table-content-draggable';
import { Checkbox } from '@/components/ui/checkbox';
import { SortableButtonColumnHeader } from '@/components/ui/data-table';
import { formatDateTime } from '@/lib/helpers/date';
import { type Banner } from '@/lib/services/default/types/banner';

export const columns: ColumnDef<Banner>[] = [
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
    accessorKey: 'file',
    header: '배너 이미지',
    size: 160,
    cell: ({ row }) => {
      return (
        <Image
          priority
          alt={row.original.file.fileName || ''}
          className="flex aspect-square size-11 w-32 rounded bg-slate-100 object-cover object-center"
          height={45}
          src={row.original.file.urlData.origin || ''}
          width={135}
        />
      );
    },
  },
  {
    accessorKey: 'title',
    header: '배너명',
    size: 240,
  },
  {
    accessorKey: 'isShow',
    header: '노출 상태',
    cell: ({ row }) => (row.getValue<boolean>('isShow') ? 'Y' : 'N'),
  },
  {
    accessorKey: 'createdAt',
    size: 160,
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="등록일시" />,
    cell: ({ row }) => formatDateTime(row.getValue<string>('createdAt')),
  },
  {
    id: 'sortOrder',
    header: '순서',
    cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
  },
];
