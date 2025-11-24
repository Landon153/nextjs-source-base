'use client';

import { useMutation } from '@tanstack/react-query';
import { type Row } from '@tanstack/react-table';
import { type JSX } from 'react';

import { toast } from '@/components/ui/sonner';
import { Switch } from '@/components/ui/switch';
import { QueryKeys } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { useRouter } from '@/lib/i18n/routing';
import { toggleCommentIsShowing } from '@/lib/services/default/features/posts';
import { type Comment } from '@/lib/services/default/types/post';

export function SwitchToggleAction({ row }: { row: Row<Comment> }): JSX.Element {
  const queryClient = getQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: toggleCommentIsShowing,
    onSuccess: async (response) => {
      if (!response.status) {
        toast.error(response.error.messages.at(0) ?? '처리 실패했습니다.');

        return;
      }

      toast.success('처리 완료되었습니다.');

      await queryClient.invalidateQueries({ queryKey: [QueryKeys.PostComments] });
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
          commentId: row.original.id,
          payload: { isShow: !row.original.isShow },
        });
      }}
    />
  );
}
