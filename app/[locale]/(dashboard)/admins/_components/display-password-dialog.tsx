'use client';

import { CopyIcon } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { TextInput } from '@/components/ui/text-input';

interface DisplayPasswordDialogProps extends ComponentProps<typeof AlertDialog> {
  password: string;
}

export function DisplayPasswordDialog({ password, ...props }: DisplayPasswordDialogProps): JSX.Element {
  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(password);
      toast.success('텍스트 복사 성공');
    } catch (error) {
      toast.error('텍스트 복사 성공');
    }
  };

  return (
    <AlertDialog {...props}>
      <AlertDialogContent className="max-w-150">
        <AlertDialogHeader className="px-10 pb-10 pt-10">
          <AlertDialogTitle className="mb-1 text-center text-xl font-bold">비밀번호 초기화 완료</AlertDialogTitle>
          <AlertDialogDescription className="text-balance text-center sm:text-xl">
            비밀번호는 보안상의 이유로 1회만 확인 가능합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogBody className="px-10">
          <TextInput
            readOnly
            className="rounded"
            suffix={
              <Button
                aria-label="복사"
                prefix={<CopyIcon />}
                size="sm"
                type="button"
                variant="ghost"
                onClick={handleCopy}
              />
            }
            value={password}
          />
        </AlertDialogBody>
        <AlertDialogFooter className="px-10 pb-8 pt-8">
          <AlertDialogAction className="grow" size="lg">
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
