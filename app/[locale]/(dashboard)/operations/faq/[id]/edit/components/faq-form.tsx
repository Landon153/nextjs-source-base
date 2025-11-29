'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { type JSX } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import {
  faqFormSchema,
  type FaqFormValues,
} from '@/app/[locale]/(dashboard)/operations/faq/_lib/schema/faq-form-schema';
import { TextEditorSkeleton } from '@/components/shared/text-editor-skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileInput } from '@/components/ui/file-input';
import { FilePreview } from '@/components/ui/file-preview';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/sonner';
import { Switch } from '@/components/ui/switch';
import { TextInput } from '@/components/ui/text-input';
import { QueryKeys } from '@/lib/constants';
import { useRouter } from '@/lib/i18n/routing';
import { uploadFile, uploadFilesEditor } from '@/lib/services/amazon-s3/file';
import { addFAQ, getPreSignedUrlForFAQFiles, updateFAQ } from '@/lib/services/default/features/faq';

const TextEditor = dynamic(() => import('@/components/shared/text-editor').then((mod) => mod.TextEditor), {
  ssr: false,
  loading: () => <TextEditorSkeleton />,
});

interface CustomerSupportsProps {
  defaultValues?: Partial<FaqFormValues>;
  id?: string;
}

export function FAQForm({ defaultValues, id }: CustomerSupportsProps): JSX.Element {
  const queryClient = useQueryClient();
  const router = useRouter();

  const isEdit = id !== undefined && defaultValues !== undefined;

  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: {
      content: '',
      isShow: false,
      media: {
        file: undefined,
        image: undefined,
      },
      title: '',
      ...defaultValues,
    },
    mode: 'onChange',
  });

  const handleEditFAQ = async (noticeId: string | number, values: FaqFormValues): Promise<void> => {
    const image = values.media.image;

    if (!image) {
      toast.error('처리 실패했습니다.');

      return;
    }

    const response = await updateFAQ(noticeId, {
      isShow: values.isShow,
      title: values.title,
      content: values.content,
      file: { id: image.id, key: image.key },
    });

    if (!response.status) {
      toast.error(response.error.messages.at(0) ?? '처리 실패했습니다.');

      return;
    }

    toast.success('처리 완료되었습니다.');

    form.reset(values);
  };

  const handleAddFAQ = async (values: FaqFormValues): Promise<void> => {
    const image = values.media.image;

    if (!image) {
      toast.error('처리 실패했습니다.');

      return;
    }

    const response = await addFAQ({
      isShow: values.isShow,
      title: values.title,
      content: values.content,
      file: { id: image.id, key: image.key },
    });

    if (!response.status) {
      toast.error(response.error.messages.at(0) ?? '처리 실패했습니다.');

      return;
    }

    toast.success('처리 완료되었습니다.');
  };

  const handleSubmit: SubmitHandler<FaqFormValues> = async (values) => {
    const markdown = await uploadFilesEditor({
      markdownValue: values.content,
      fetchPreSignedUrl: getPreSignedUrlForFAQFiles,
    });

    if (!markdown) {
      return;
    }

    form.setValue('content', markdown);

    if (values.media.file) {
      const uploadResult = await uploadFile(values.media.file, getPreSignedUrlForFAQFiles);

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
      await handleEditFAQ(id, form.getValues());
    } else {
      await handleAddFAQ(form.getValues());
    }

    await queryClient.invalidateQueries({ queryKey: [QueryKeys.FAQ] });
    router.push('/operations/faq');

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
                  <FormMessage className="col-start-2" />
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
              render={({ field: { disabled, ref: _, ...field } }) => (
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
