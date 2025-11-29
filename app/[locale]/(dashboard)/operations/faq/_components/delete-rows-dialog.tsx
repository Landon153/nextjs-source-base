'use client';

import { useMutation } from '@tanstack/react-query';
import type * as ReactTable from '@tanstack/react-table';
import { type JSX } from 'react';

import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { QueryKeys } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { deleteFAQ } from '@/lib/services/default/features/faq';
import type { FAQ } from '@/lib/services/default/types/faq';

interface ToggleDeleteActionProps<TData> {
  table: ReactTable.Table<TData>;
}

export function DeleteRowsDialog<TData extends FAQ>({ table }: ToggleDeleteActionProps<TData>): JSX.Element {
  const queryClient = getQueryClient();
  const rowIds = Object.keys(table.getState().rowSelection);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteFAQ,
    onSuccess: async (response) => {
      if (!response.status) {
        toast.error('처리 실패했습니다.');

        return;
      }

      toast.success('처리 완료되었습니다.');

      await queryClient.invalidateQueries({ queryKey: [QueryKeys.FAQ] });
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
        title: '삭제 안내',
        description: '선택한 FAQ를 삭제하시겠습니까?',
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
