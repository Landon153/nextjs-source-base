'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import {
  customerSupportsFormSchema,
  type CustomerSupportsFormValues,
} from '@/app/[locale]/(dashboard)/operations/customer-support/[id]/edit/_lib/schema/customer-supports-form-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/sonner';
import { Textarea } from '@/components/ui/textarea';
import { QueryKeys } from '@/lib/constants';
import { useRouter } from '@/lib/i18n/routing';
import { updateCustomerSupport } from '@/lib/services/default/features/customer-support';

interface CustomerSupportsProps {
  children?: ReactNode;
  defaultValues?: Partial<CustomerSupportsFormValues>;
  id?: string;
}

export function CustomerSupportForm({ children, defaultValues, id }: CustomerSupportsProps): JSX.Element {
  const queryClient = useQueryClient();
  const router = useRouter();

  const isEdit = id !== undefined && defaultValues !== undefined;

  const form = useForm<CustomerSupportsFormValues>({
    defaultValues: {
      answerContent: '',
      ...defaultValues,
    },
    mode: 'onChange',
    resolver: zodResolver(customerSupportsFormSchema),
  });

  const handleEditCustomerSupport = async (
    customerSupportId: string | number,
    values: CustomerSupportsFormValues,
  ): Promise<void> => {
    const response = await updateCustomerSupport(customerSupportId, values);

    if (!response.status) {
      toast.error(response.error.messages.at(0) ?? '처리 실패했습니다.');

      return;
    }

    toast.success('처리 완료되었습니다.');

    form.reset(values);
  };

  const handleSubmit: SubmitHandler<CustomerSupportsFormValues> = async (values: CustomerSupportsFormValues) => {
    if (isEdit) {
      await handleEditCustomerSupport(id, values);
    }

    await queryClient.invalidateQueries({ queryKey: [QueryKeys.CustomerSupports] });
    router.push('/operations/customer-support');

    if (isEdit) {
      // We have to refresh the router to update when we return to this page from the list page
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-7" onSubmit={form.handleSubmit(handleSubmit)}>
        <Button
          className="h-11.5 min-w-32 grow"
          disabled={!form.formState.isValid || form.formState.disabled || (isEdit && !form.formState.isDirty)}
          loading={form.formState.isSubmitting}
          type="submit"
        >
          {isEdit ? '전송' : '등록'}
        </Button>

        {children}

        <Card>
          <CardHeader className="min-h-15 justify-center py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">답변하기</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="border-t border-slate-100 p-6">
            <FormField
              control={form.control}
              name="answerContent"
              render={({ field: { disabled, value, ...field } }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={disabled ?? form.formState.isSubmitting}
                      maxLength={1000}
                      placeholder="답변 내용을 입력해주세요 (최대 1,000자)"
                      rows={8}
                      value={value ?? ''}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
