import { type ComponentProps, type JSX } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type AccountSuspendedDialogProps = ComponentProps<typeof AlertDialog>;

export function AccountSuspendedDialog({ ...props }: AccountSuspendedDialogProps): JSX.Element {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent className="flex min-h-80 max-w-150 flex-col justify-between">
        <AlertDialogHeader className="sm:gap-2.5 sm:px-10 sm:pb-8 sm:pt-11.25">
          <AlertDialogTitle className="text-center sm:text-xl">서비스 이용 제한</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogBody className="sm:pb-6.5 space-y-2.5 sm:px-10">
          <AlertDialogDescription className="text-balance text-center sm:text-xl">
            이용 중지 처리되었습니다.
            <br />
            마스터 관리자에게 문의해주시기 바랍니다.
          </AlertDialogDescription>
        </AlertDialogBody>

        <AlertDialogFooter className="mt-auto sm:px-10 sm:pb-8">
          <AlertDialogAction className="grow" size="lg">
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
