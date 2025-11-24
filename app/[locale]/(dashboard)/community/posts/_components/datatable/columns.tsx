import { type ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import { Box } from '@/components/ui/box';
import { SortableButtonColumnHeader } from '@/components/ui/data-table';
import { formatDateTime } from '@/lib/helpers/date';
import { type Post } from '@/lib/services/default/types/post';

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: 'rowIndex',
    header: 'NO',
    size: 65,
  },
  {
    accessorKey: 'thumbnail',
    header: '이미지',
    size: 120,
    cell: ({ row }) => {
      const firstImage = row.original.thumbnail ? row.original.thumbnail : { id: 'thumbnail', url: '' };

      return firstImage.url ? (
        <Image
          alt={firstImage.id}
          className="flex aspect-square size-11 rounded bg-slate-100 object-cover object-center"
          height={44}
          src={firstImage.url}
          width={44}
        />
      ) : (
        <Box className="size-11 rounded bg-slate-100" />
      );
    },
  },
  {
    accessorKey: 'writer.nickname',
    id: 'writer.nickname',
    header: '작성자',
    size: 220,
  },
  {
    accessorKey: 'isShow',
    header: '상태',
    cell: ({ row }) => (row.getValue<boolean | null>('isShow') ? '공개' : '비공개'),
  },
  {
    accessorKey: 'statistic.totalView',
    id: 'statistic.totalView',
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="조회 수" />,
    cell: ({ row }) => row.getValue<number>('statistic.totalView').toLocaleString(),
  },
  {
    accessorKey: 'statistic.totalLike',
    id: 'statistic.totalLike',
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="좋아요 수" />,
    cell: ({ row }) => row.getValue<number>('statistic.totalLike').toLocaleString(),
  },
  {
    accessorKey: 'statistic.totalComment',
    id: 'statistic.totalComment',
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="댓글/대댓글 수" />,
    cell: ({ row }) => row.getValue<number>('statistic.totalComment').toLocaleString(),
  },
  {
    accessorKey: 'createdAt',
    size: 160,
    header: ({ column }) => <SortableButtonColumnHeader column={column} title="등록일시" />,
    cell: ({ row }) => formatDateTime(row.getValue<string>('createdAt')),
  },
];
