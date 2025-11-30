'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { type SubmitHandler, useForm } from 'react-hook-form';

import {
  noticesFormSchema,
  type NoticesFormValues,
} from '@/app/[locale]/(dashboard)/operations/notices/_lib/schema/notices-form-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/sonner';
import { Switch } from '@/components/ui/switch';
import { TextInput } from '@/components/ui/text-input';
import { Textarea } from '@/components/ui/textarea';
import { QueryKeys } from '@/lib/constants';
import { useRouter } from '@/lib/i18n/routing';
import { addNotice, updateNotice } from '@/lib/services/default/features/notices';

interface CustomerSupportsProps {
  defaultValues?: Partial<NoticesFormValues>;
  id?: string;
}

export function NoticeForm({ defaultValues, id }: CustomerSupportsProps): JSX.Element {
  const queryClient = useQueryClient();
  const router = useRouter();

  const isEdit = id !== undefined && defaultValues !== undefined;

  const form = useForm<NoticesFormValues>({
    resolver: zodResolver(noticesFormSchema),
    defaultValues: {
      isShow: false,
      title: '',
      content: '',
      ...defaultValues,
    },
    mode: 'onChange',
  });

  const handleEditNotice = async (noticeId: string | number, values: NoticesFormValues): Promise<void> => {
    const response = await updateNotice(noticeId, values);

    if (!response.status) {
      toast.error(response.error.messages.at(0) ?? '처리 실패했습니다.');

      return;
    }

    toast.success('처리 완료되었습니다.');

    form.reset(values);
  };

  const handleAddNotice = async (values: NoticesFormValues): Promise<void> => {
    const response = await addNotice(values);

    if (!response.status) {
      toast.error(response.error.messages.at(0) ?? '처리 실패했습니다.');

      return;
    }

    toast.success('처리 완료되었습니다.');
  };

  const handleSubmit: SubmitHandler<NoticesFormValues> = async (values) => {
    if (isEdit) {
      await handleEditNotice(id, values);
    } else {
      await handleAddNotice(values);
    }

    await queryClient.invalidateQueries({ queryKey: [QueryKeys.Notices] });
    router.push('/operations/notices');

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
          {isEdit ? '수정' : '등록'}
        </Button>

        <Card>
          <CardHeader className="min-h-15 justify-center py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">기본 정보</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="border-t border-slate-100 p-6">
            <FormField
              control={form.control}
              name="isShow"
              render={({ field: { disabled, value, onChange, ...field } }) => (
                <FormItem className="grid grid-cols-[8rem_1fr] items-center gap-y-2 space-y-0">
                  <FormLabel className="whitespace-nowrap text-slate-600">공개 상태</FormLabel>
                  <FormControl>
                    <Switch
                      checked={value}
                      disabled={disabled ?? form.formState.isSubmitting}
                      onCheckedChange={onChange}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="min-h-15 justify-center py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">상세 정보</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 border-t border-slate-100 p-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field: { disabled, ...field } }) => (
                <FormItem>
                  <FormControl>
                    <TextInput
                      disabled={disabled ?? form.formState.isSubmitting}
                      maxLength={100}
                      placeholder="타이틀을 입력해주세요 (최대 100자)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field: { disabled, ...field } }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={disabled ?? form.formState.isSubmitting}
                      maxLength={2000}
                      placeholder="내용을 입력해주세요. (최대 2,000자)"
                      rows={8}
                      {...field}
                      className="h-50"
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
