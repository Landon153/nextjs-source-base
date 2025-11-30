'use client';

import { useMutation } from '@tanstack/react-query';
import { type Row } from '@tanstack/react-table';
import { type JSX } from 'react';

import { toast } from '@/components/ui/sonner';
import { Switch } from '@/components/ui/switch';
import { QueryKeys } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { useRouter } from '@/lib/i18n/routing';
import { toggleShowNotice } from '@/lib/services/default/features/notices';
import { type Notice } from '@/lib/services/default/types/notice';

export function SwitchShowAction({ row }: { row: Row<Notice> }): JSX.Element {
  const queryClient = getQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: toggleShowNotice,
    onSuccess: async (response) => {
      if (!response.status) {
        toast.error(response.error.messages.at(0) ?? '처리 실패했습니다.');
      }

      toast.success('처리 완료되었습니다.');

      await queryClient.invalidateQueries({ queryKey: [QueryKeys.Notices] });
      router.refresh();
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message || '처리 실패했습니다.');
      }
    },
  });

  return (
    <Switch
      checked={row.getValue<boolean>('isShow')}
      disabled={isPending}
      onCheckedChange={() => {
        mutate({
          noticeId: row.original.id,
          payload: { isShow: !row.original.isShow },
        });
      }}
    />
  );
}
