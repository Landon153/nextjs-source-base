import { useMutation } from '@tanstack/react-query';
import { type JSX, useState } from 'react';

import { DisplayPasswordDialog } from '@/app/[locale]/(dashboard)/admins/_components/display-password-dialog';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { resetAdminPassword } from '@/lib/services/default/features/admin';

interface ResetPasswordActionProps {
  id: string | number;
  disabled?: boolean;
}

export function ResetPasswordAction({ disabled, id }: ResetPasswordActionProps): JSX.Element {
  const [password, setPassword] = useState<string>();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: resetAdminPassword,
    onSuccess: (response) => {
      if (!response.status) {
        toast.error(response.error.messages.at(0) ?? '처리 실패했습니다.');

        return;
      }

      setPassword(response.data.password);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message || '처리 실패했습니다.');
      }
    },
  });

  return (
    <>
      <ConfirmDialog
        loading={isPending}
        message={{
          description: '비밀번호를 초기화 하시겠습니까?',
          title: '비밀번호 초기화 안내',
        }}
        trigger={
          <Button className="min-w-28 bg-white" disabled={disabled} size="xs" variant="outline-2">
            비밀번호 초기화
          </Button>
        }
        onConfirm={() => mutateAsync(id)}
      />
      <DisplayPasswordDialog
        open={password !== undefined}
        password={password ?? ''}
        onOpenChange={() => {
          setPassword(undefined);
        }}
      />
    </>
  );
}
