import { type ColumnDef } from '@tanstack/react-table';

import { SortableButtonColumnHeader } from '@/components/ui/data-table';
import { formatDateTime } from '@/lib/helpers/date';
import { ReportType } from '@/lib/services/default/constants';
import { type Report } from '@/lib/services/default/types/report';

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: 'rowIndex',
    header: 'NO',
    size: 65,
  },
  {
    accessorKey: 'reporter.nickname',
    id: 'reporter.nickname',
    header: '신고한 사람',
    size: 220,
    cell: ({ row }) => row.getValue<string>('reporter.nickname'),
  },
  {
    accessorKey: 'type',
    header: '신고 유형',
    cell: ({ row }) => {
      switch (row.getValue<ReportType>('type')) {
        case ReportType.CommentReply: {
          return '대댓글';
        }

        case ReportType.Post: {
          return '게시글';
        }

        case ReportType.Comment: {
          return '댓글';
        }

        case ReportType.Profile: {
          return '프로필';
        }
      }
    },
  },
  {
    accessorKey: 'reportedReason',
    header: '신고 사유',
    size: 240,
  },
  {
    accessorKey: 'isShow',
    header: '상태',
    cell: ({ row }) => (row.getValue<boolean>('isShow') ? '공개 처리' : '비공개 처리'),
  },
  {
    accessorKey: 'createdAt',
    size: 160,
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="등록일시" />,
    cell: ({ row }) => formatDateTime(row.getValue<string>('createdAt')),
  },
];
