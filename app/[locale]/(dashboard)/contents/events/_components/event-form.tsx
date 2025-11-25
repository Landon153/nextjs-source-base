'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import dynamic from 'next/dynamic';
import { type JSX } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import {
  eventFormSchema,
  type EventFormValues,
} from '@/app/[locale]/(dashboard)/contents/events/_lib/schema/event-form-schema';
import { DatePicker } from '@/components/shared/date-picker';
import { TextEditorSkeleton } from '@/components/shared/text-editor-skeleton';
import { TimePicker } from '@/components/shared/time-picker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileInput } from '@/components/ui/file-input';
import { FilePreview } from '@/components/ui/file-preview';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/sonner';
import { Switch } from '@/components/ui/switch';
import { TextInput } from '@/components/ui/text-input';
import { QueryKeys } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { useRouter } from '@/lib/i18n/routing';
import { uploadFile, uploadFilesEditor } from '@/lib/services/amazon-s3/file';
import { addEvent, getPreSignedUrlForEventFiles, updateEvent } from '@/lib/services/default/features/events';

const TextEditor = dynamic(() => import('@/components/shared/text-editor').then((mod) => mod.TextEditor), {
  ssr: false,
  loading: () => <TextEditorSkeleton />,
});

interface EventFormProps {
  defaultValues?: Partial<EventFormValues>;
  id?: string;
}

export function EventForm({ defaultValues, id }: EventFormProps): JSX.Element {
  const router = useRouter();
  const queryClient = getQueryClient();
  const isEdit = id !== undefined && defaultValues !== undefined;

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      content: '',
      eventDates: {
        fromDate: undefined,
        toDate: undefined,
      },
      isShow: false,
      isPushNoti: false,
      media: {
        file: undefined,
        image: undefined,
      },
      title: '',
      ...defaultValues,
    },
    mode: 'onChange',
  });

  const handleEditEvent = async (eventId: string | number, values: EventFormValues): Promise<void> => {
    const image = values.media.image;

    if (!image) {
      toast.error('처리 실패했습니다.');

      return;
    }

    const response = await updateEvent(eventId, {
      isShow: values.isShow,
      isPushNoti: values.isPushNoti,
      content: values.content,
      fromDate: values.eventDates.fromDate.toISOString(),
      toDate: values.eventDates.toDate.toISOString(),
      title: values.title,
      file: { id: image.id, key: image.key },
    });

    if (!response.status) {
      toast.error(response.error.messages.at(0) ?? '처리 실패했습니다.');

      return;
    }

    toast.success('처리 완료되었습니다.');

    form.reset(values);
  };

  const handleAddEvent = async (values: EventFormValues): Promise<void> => {
    const image = values.media.image;

    if (!image) {
      toast.error('처리 실패했습니다.');

      return;
    }

    const response = await addEvent({
      isShow: values.isShow,
      isPushNoti: values.isPushNoti,
      content: values.content,
      fromDate: values.eventDates.fromDate.toISOString(),
      toDate: values.eventDates.toDate.toISOString(),
      title: values.title,
      file: { id: image.id, key: image.key },
    });

    if (!response.status) {
      toast.error(response.error.messages.at(0) ?? '처리 실패했습니다.');

      return;
    }

    toast.success('처리 완료되었습니다.');
  };

  const handleSubmit: SubmitHandler<EventFormValues> = async (values): Promise<void> => {
    const markdown = await uploadFilesEditor({
      markdownValue: values.content,
      fetchPreSignedUrl: getPreSignedUrlForEventFiles,
    });

    if (!markdown) {
      return;
    }

    form.setValue('content', markdown);

    if (values.media.file) {
      const uploadResult = await uploadFile(values.media.file, getPreSignedUrlForEventFiles);

      if (!uploadResult) {
        return;
      }

      form.setValue('media', {
        file: undefined,
        image: {
          id: uploadResult.id,
          key: uploadResult.key,
          original: uploadResult.urlData.origin,
        },
      });
    }

    if (isEdit) {
      await handleEditEvent(id, form.getValues());
    } else {
      await handleAddEvent(form.getValues());
    }

    await queryClient.invalidateQueries({ queryKey: [QueryKeys.Events] });
    router.push('/contents/events');

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
          <CardContent className="space-y-5 border-t border-slate-100 p-6">
            <div className="grid min-h-9 grid-cols-[8rem_1fr] items-baseline gap-y-2">
              <div className="whitespace-nowrap text-slate-600">진행기간</div>
              <div className="flex flex-wrap gap-4">
                <FormField
                  control={form.control}
                  name="eventDates.fromDate"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <div className="flex gap-x-4 gap-y-2">
                        <FormItem>
                          <FormControl>
                            <DatePicker
                              classNames={{ trigger: 'min-w-50' }}
                              disabled={{ before: new Date() }}
                              onChange={(date) => {
                                onChange(date);
                                void form.trigger('eventDates.toDate');
                              }}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>

                        <FormItem>
                          <FormControl>
                            <TimePicker
                              classNames={{ trigger: 'min-w-32' }}
                              step={10}
                              onChange={(date) => {
                                onChange(date);
                                void form.trigger('eventDates.toDate');
                              }}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex h-10 items-center text-slate-600">~</div>
                <FormField
                  control={form.control}
                  name="eventDates.toDate"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <div className="flex gap-x-4 gap-y-2">
                        <FormItem>
                          <FormControl>
                            <DatePicker
                              classNames={{ trigger: 'min-w-50' }}
                              disabled={{ before: new Date() }}
                              onChange={(date) => {
                                onChange(date);
                                void form.trigger('eventDates.fromDate');
                              }}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>

                        <FormItem>
                          <FormControl>
                            <TimePicker
                              classNames={{ trigger: 'min-w-32' }}
                              step={10}
                              onChange={(date) => {
                                onChange(date);
                                void form.trigger('eventDates.fromDate');
                              }}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="isShow"
              render={({ field: { disabled, value, onChange, ...field } }) => (
                <FormItem className="grid min-h-9 grid-cols-[8rem_1fr] items-center gap-y-2 space-y-0">
                  <FormLabel className="whitespace-nowrap text-slate-600">공개 상태</FormLabel>
                  <FormControl>
                    <Switch
                      checked={value}
                      disabled={disabled ?? form.formState.isSubmitting}
                      onCheckedChange={onChange}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPushNoti"
              render={({ field: { disabled, value, onChange, ...field } }) => (
                <FormItem className="grid min-h-9 grid-cols-[8rem_1fr] items-center gap-y-2 space-y-0">
                  <FormLabel className="whitespace-nowrap text-slate-600">푸시 알림 (선택)</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={value}
                        disabled={disabled ?? form.formState.isSubmitting}
                        onCheckedChange={onChange}
                        {...field}
                      />
                      <FormLabel className="flex items-center gap-1 font-normal text-gray-300">
                        <Info size={20} />
                        이벤트 시작일에 푸시알림이 발송됩니다.
                      </FormLabel>
                    </div>
                  </FormControl>
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
              name="media"
              render={() => (
                <FormItem>
                  {form.watch('media.image') ? (
                    <FormField
                      control={form.control}
                      name="media.image.original"
                      render={({ field: { onChange: _, disabled, ...field } }) => (
                        <FormItem>
                          <FormControl>
                            <FilePreview
                              disabled={disabled ?? form.formState.isSubmitting}
                              onChange={() => {
                                form.setValue('media.image', undefined);
                              }}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      name="media.file"
                      render={({ field: { disabled, ...field } }) => (
                        <FormItem>
                          <FormControl>
                            <FileInput
                              accept="image/*"
                              disabled={disabled ?? form.formState.isSubmitting}
                              placeholder="+ 대표 이미지를 첨부해주세요"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field: { disabled, ...field } }) => (
                <FormItem>
                  <FormControl>
                    <TextEditor disabled={disabled ?? form.formState.isSubmitting} {...field} />
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
