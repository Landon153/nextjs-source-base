'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type JSX, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { AccountSuspendedDialog } from '@/app/[locale]/(auth)/_components/account-suspended-dialog';
import { authenticate } from '@/app/[locale]/(auth)/_lib/actions/credentials';
import { getErrorMessage } from '@/app/[locale]/(auth)/_lib/get-error-message';
import {
  credentialsFormSchema,
  type CredentialsFormValues,
} from '@/app/[locale]/(auth)/_lib/schema/credentials-form-schema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { TextInput } from '@/components/ui/text-input';
import { AuthErrorCode } from '@/lib/auth/error';
import { useRouter } from '@/lib/i18n/routing';
import { logger } from '@/lib/logger';
import { cn } from '@/lib/utils';

interface CredentialsFormProps {
  className?: string;
}

export function CredentialsForm({ className }: CredentialsFormProps): JSX.Element {
  const router = useRouter();
  const form = useForm<CredentialsFormValues>({
    resolver: zodResolver(credentialsFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [open, setOpen] = useState(false);

  const handleSubmit: SubmitHandler<CredentialsFormValues> = async (values) => {
    try {
      const response = await authenticate(values);

      if (response.status) {
        router.replace(response.data.redirectTo);
      } else {
        switch (response.error.code) {
          case AuthErrorCode.AccountSuspended: {
            setOpen(true);
            break;
          }

          default: {
            form.setError('password', getErrorMessage(response.error.type));
          }
        }
      }
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className={cn('flex flex-col justify-between gap-4', className)}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field: { disabled, ...field } }) => (
                <FormItem>
                  <FormControl>
                    <TextInput
                      className="rounded"
                      disabled={disabled ?? form.formState.isSubmitting}
                      inputMode="email"
                      placeholder="이메일 입력"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field: { disabled, ...field } }) => (
                <FormItem>
                  <FormControl>
                    <TextInput
                      className="rounded"
                      disabled={disabled ?? form.formState.isSubmitting}
                      placeholder="비밀번호 입력"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className="mt-auto w-full"
            disabled={form.formState.disabled}
            loading={form.formState.isSubmitting}
            size="lg"
            type="submit"
          >
            로그인
          </Button>
        </form>
      </Form>

      <AccountSuspendedDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
