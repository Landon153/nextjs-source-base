import { type ColumnDef } from '@tanstack/react-table';

import {
  AnswerStatusLabels,
  AnswerStatusValues,
} from '@/app/[locale]/(dashboard)/operations/customer-support/_lib/constants';
import { SortableButtonColumnHeader } from '@/components/ui/data-table';
import { formatDateTime } from '@/lib/helpers/date';
import { type CustomerSupport } from '@/lib/services/default/types/customer-support';

export const columns: ColumnDef<CustomerSupport>[] = [
  {
    accessorKey: 'rowIndex',
    header: 'NO',
    size: 65,
  },
  {
    accessorKey: 'userEmail',
    header: '문의자 이메일',
    size: 240,
  },
  {
    accessorKey: 'createdAt',
    size: 160,
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="문의일시" />,
    cell: ({ row }) => formatDateTime(row.getValue<string | null>('createdAt')),
  },
  {
    accessorKey: 'isAnswer',
    header: '문의 상태',
    cell: ({ row }) =>
      row.getValue<boolean>('isAnswer')
        ? AnswerStatusLabels[AnswerStatusValues.Completed]
        : AnswerStatusLabels[AnswerStatusValues.Pending],
  },
  {
    accessorKey: 'respondent.nickname',
    id: 'respondent.nickname',
    header: '답변자명',
    size: 220,
    accessorFn: (row) => row.respondent?.nickname ?? '-',
  },
  {
    accessorKey: 'answerAt',
    size: 160,
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="답변일시" />,
    cell: ({ row }) => formatDateTime(row.getValue<string | null>('answerAt')),
  },
];
