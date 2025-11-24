'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type JSX } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import {
  bannerFormSchema,
  type BannerFormValues,
} from '@/app/[locale]/(dashboard)/contents/banners/_lib/schema/banner-form-schema';
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
import { uploadFile } from '@/lib/services/amazon-s3/file';
import { addBanner, getPreSignedUrlForBannerFiles, updateBanner } from '@/lib/services/default/features/banners';

interface BannerFormProps {
  defaultValues?: Partial<BannerFormValues>;
  id?: string;
}

export function BannerForm({ defaultValues, id }: BannerFormProps): JSX.Element {
  const router = useRouter();
  const queryClient = getQueryClient();
  const isEdit = id !== undefined && defaultValues !== undefined;

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      link: '',
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

  const handleEditBanner = async (bannerId: string | number, values: BannerFormValues): Promise<void> => {
    const image = values.media.image;

    if (!image) {
      toast.error('처리 실패했습니다.');

      return;
    }

    const response = await updateBanner(bannerId, {
      isShow: values.isShow,
      link: values.link,
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

  const handleAddBanner = async (values: BannerFormValues): Promise<void> => {
    const image = values.media.image;

    if (!image) {
      toast.error('처리 실패했습니다.');

      return;
    }

    const response = await addBanner({
      isShow: values.isShow,
      link: values.link,
      title: values.title,
      file: { id: image.id, key: image.key },
    });

    if (!response.status) {
      toast.error(response.error.messages.at(0) ?? '처리 실패했습니다.');

      return;
    }

    toast.success('처리 완료되었습니다.');
  };

  const handleSubmit: SubmitHandler<BannerFormValues> = async (values): Promise<void> => {
    if (values.media.file) {
      const uploadResult = await uploadFile(values.media.file, getPreSignedUrlForBannerFiles);

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
      await handleEditBanner(id, form.getValues());
    } else {
      await handleAddBanner(form.getValues());
    }

    await queryClient.invalidateQueries({ queryKey: [QueryKeys.Banners] });
    router.push('/contents/banners');

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
            <FormField
              control={form.control}
              name="isShow"
              render={({ field: { disabled, value, onChange, ...field } }) => (
                <FormItem className="grid min-h-9 grid-cols-[8rem_1fr] items-center gap-y-2 space-y-0">
                  <FormLabel className="whitespace-nowrap text-slate-600">노출 상태</FormLabel>
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
              name="link"
              render={({ field: { disabled, value, ...field } }) => (
                <FormItem>
                  <FormControl>
                    <TextInput
                      disabled={disabled ?? form.formState.isSubmitting}
                      placeholder="URL을 입력해주세요"
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
