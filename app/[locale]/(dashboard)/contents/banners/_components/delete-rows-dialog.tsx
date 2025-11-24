'use client';

import { useMutation } from '@tanstack/react-query';
import type * as ReactTable from '@tanstack/react-table';
import { type JSX } from 'react';

import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { QueryKeys } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { deleteBanners } from '@/lib/services/default/features/banners';

interface DeleteRowsDialogProps<TData> {
  table: ReactTable.Table<TData>;
}

export function DeleteRowsDialog<TData>({ table }: DeleteRowsDialogProps<TData>): JSX.Element {
  const queryClient = getQueryClient();
  const rowIds = Object.keys(table.getState().rowSelection);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteBanners,
    onSuccess: async (response) => {
      if (!response.status) {
        toast.error('처리 실패했습니다.');

        return;
      }

      toast.success('처리 완료되었습니다.');

      await queryClient.invalidateQueries({ queryKey: [QueryKeys.Banners] });
      table.resetRowSelection();
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message || '처리 실패했습니다.');
      }
    },
  });

  return (
    <ConfirmDialog
      loading={isPending}
      message={{
        description: '선택한 배너를 삭제하시겠습니까?',
        title: '삭제 안내',
      }}
      trigger={
        <Button className="min-w-28 bg-white" disabled={!rowIds.length} size="xs" variant="outline-2">
          삭제
        </Button>
      }
      onConfirm={() => mutateAsync({ ids: rowIds })}
    />
  );
}
