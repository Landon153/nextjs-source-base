'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type JSX, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { DisplayPasswordDialog } from '@/app/[locale]/(dashboard)/admins/_components/display-password-dialog';
import { ResetPasswordAction } from '@/app/[locale]/(dashboard)/admins/_components/reset-password-action';
import { permissionGroup } from '@/app/[locale]/(dashboard)/admins/_lib/constants';
import { adminFormSchema, type AdminFormValues } from '@/app/[locale]/(dashboard)/admins/_lib/schema/admin-form-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckboxGroup, CheckboxGroupItem } from '@/components/ui/checkbox-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/sonner';
import { Switch } from '@/components/ui/switch';
import { TextInput } from '@/components/ui/text-input';
import { QueryKeys } from '@/lib/constants';
import { getQueryClient } from '@/lib/get-query-client';
import { useRouter } from '@/lib/i18n/routing';
import { UserStatus } from '@/lib/services/default/constants';
import { addAdmin, updateAdmin } from '@/lib/services/default/features/admin';

interface AdminFormProps {
  defaultValues?: Partial<AdminFormValues>;
  id?: string;
}

export function AdminForm({ defaultValues, id }: AdminFormProps): JSX.Element {
  const router = useRouter();
  const queryClient = getQueryClient();
  const [password, setPassword] = useState<string>();

  const isEdit = id !== undefined && defaultValues !== undefined;

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      nickname: '',
      email: '',
      phoneNumber: '',
      status: false,
      permissionsIds: [],
      ...defaultValues,
    },
    mode: 'onChange',
  });

  const handleEditAdmin = async (userId: string | number, values: AdminFormValues): Promise<void> => {
    const response = await updateAdmin(userId, {
      ...values,
      status: values.status ? UserStatus.Banned : UserStatus.Active,
    });

    if (!response.status) {
      toast.error(response.error.messages.at(0) ?? '처리 실패했습니다.');

      return;
    }

    toast.success('처리 완료되었습니다.');

    form.reset(values);
  };

  const handleAddAdmin = async (values: AdminFormValues): Promise<void> => {
    const response = await addAdmin(values);

    if (!response.status) {
      toast.error(response.error.messages.at(0) ?? '처리 실패했습니다.');

      return;
    }

    setPassword(response.data.password);
  };

  const handleSubmit: SubmitHandler<AdminFormValues> = async (values): Promise<void> => {
    if (isEdit) {
      await handleEditAdmin(id, values);
    } else {
      await handleAddAdmin(values);
    }

    await queryClient.invalidateQueries({ queryKey: [QueryKeys.Admins] });

    if (isEdit) {
      router.push('/admins');

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
              {isEdit ? <ResetPasswordAction disabled={form.formState.isSubmitting} id={id} /> : null}
            </div>
          </CardHeader>

          <CardContent className="space-y-5 border-t border-slate-100 p-6">
            <FormField
              control={form.control}
              name="nickname"
              render={({ field: { disabled, ...field } }) => (
                <FormItem className="grid grid-cols-[8rem_1fr] items-center gap-y-2 space-y-0">
                  <FormLabel className="whitespace-nowrap text-slate-600">관리자명</FormLabel>
                  <FormControl>
                    <TextInput
                      disabled={disabled ?? form.formState.isSubmitting}
                      maxLength={20}
                      placeholder="관리자명을 입력해주세요 (최대 20자)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field: { disabled, ...field } }) => (
                <FormItem className="grid grid-cols-[8rem_1fr] items-center gap-y-2 space-y-0">
                  <FormLabel className="whitespace-nowrap text-slate-600">이메일(ID)</FormLabel>
                  <FormControl>
                    <TextInput
                      disabled={disabled ?? form.formState.isSubmitting}
                      inputMode="email"
                      maxLength={50}
                      placeholder="이메일을 입력해주세요 (최대 50자)"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field: { disabled, ...field } }) => (
                <FormItem className="grid grid-cols-[8rem_1fr] items-center gap-y-2 space-y-0">
                  <FormLabel className="whitespace-nowrap text-slate-600">연락처</FormLabel>
                  <FormControl>
                    <TextInput
                      disabled={disabled ?? form.formState.isSubmitting}
                      inputMode="tel"
                      maxLength={20}
                      placeholder="연락처를 입력해주세요 (최대 20자)"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field: { disabled, value, onChange, ...field } }) => (
                <FormItem className="grid grid-cols-[8rem_1fr] items-center gap-y-2 space-y-0">
                  <FormLabel className="whitespace-nowrap text-slate-600">이용 중지</FormLabel>
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
              <CardTitle className="text-sm font-medium">권한 관리</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="border-t border-slate-100 p-6">
            <FormField
              control={form.control}
              name="permissionsIds"
              render={({ field: { disabled, value, onChange, ...field } }) => (
                <FormItem>
                  <CheckboxGroup
                    className="space-y-5"
                    disabled={disabled ?? form.formState.isSubmitting}
                    value={value.map((permission) => permission.toString())}
                    onValueChange={(val: string[]) => {
                      onChange(val.map((v) => Number(v)));
                    }}
                    {...field}
                  >
                    {Object.entries(permissionGroup).map(([label, permissions]) => (
                      <div key={label} className="grid grid-cols-[8rem_1fr] items-start gap-y-2 space-y-0 py-3.25">
                        <FormLabel className="whitespace-nowrap text-slate-600">{label}</FormLabel>
                        <div className="flex flex-wrap gap-4">
                          {permissions.map((permission) => (
                            <FormItem key={permission.value} className="flex items-center gap-2 space-y-0">
                              <FormControl>
                                <CheckboxGroupItem value={permission.value.toString()} />
                              </FormControl>
                              <FormLabel>{permission.label}</FormLabel>
                            </FormItem>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CheckboxGroup>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <DisplayPasswordDialog
          open={password !== undefined}
          password={password ?? ''}
          onOpenChange={() => {
            setPassword(undefined);
            router.push('/admins');
          }}
        />
      </form>
    </Form>
  );
}
