'use client';

import { useMutation } from '@tanstack/react-query';
import { type HTMLAttributes, type JSX } from 'react';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { toggleCommentIsShowing } from '@/lib/services/default/features/posts';
import { type ApiSuccessResponse } from '@/lib/services/default/fetcher';
import type { Comment } from '@/lib/services/default/types/post';
import { cn } from '@/lib/utils';

interface ToggleCommentPrivateActionProps extends HTMLAttributes<HTMLDivElement> {
  comment: Comment;
  onToggleComplete?: (response: ApiSuccessResponse<Comment>) => void;
}

export function ToggleCommentPrivateAction({
  className,
  comment,
  onToggleComplete,
  ...props
}: ToggleCommentPrivateActionProps): JSX.Element {
  const title = comment.isShow ? '비공개 처리' : '공개 처리';

  const { mutateAsync, isPending } = useMutation({
    mutationFn: toggleCommentIsShowing,
    onSuccess: (response) => {
      if (!response.status) {
        toast.error(response.error.messages.at(0) ?? '처리 실패했습니다.');

        return;
      }

      toast.success('처리 완료되었습니다.');

      if (onToggleComplete) {
        onToggleComplete(response);
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message || '처리 실패했습니다.');
      }
    },
  });

  return (
    <div className={cn('', className)} {...props}>
      <Button
        disabled={isPending}
        loading={isPending}
        size="xs"
        variant="outline-2"
        onClick={() => {
          void mutateAsync({
            commentId: comment.id,
            payload: { isShow: !comment.isShow },
          });
        }}
      >
        {title}
      </Button>
    </div>
  );
}
