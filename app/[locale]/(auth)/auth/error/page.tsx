import { type Metadata } from 'next';
import { type JSX } from 'react';

import { type ErrorPageParam } from '@/app/[locale]/(auth)/_lib/types';
import { Link } from '@/lib/i18n/routing';

const errors: Record<ErrorPageParam | 'default', { heading: string; message: JSX.Element }> = {
  AccessDenied: {
    heading: '접근이 거부되었습니다',
    message: (
      <>
        <p className="text-muted-foreground">로그인할 권한이 없습니다.</p>
        <Link className="text-primary" href="/login">
          로그인하기
        </Link>
      </>
    ),
  },
  Configuration: {
    heading: '서버 오류',
    message: (
      <p className="text-muted-foreground">서버 구성에 문제가 있습니다. 자세한 정보는 서버 로그를 확인하세요.</p>
    ),
  },
  Verification: {
    heading: '로그인할 수 없음',
    message: (
      <>
        <p className="text-muted-foreground">로그인 링크는 더 이상 유효하지 않습니다.</p>
        <p className="text-muted-foreground">이미 사용된 것일 수도 있습니다.</p>
        <Link className="text-primary" href="/login">
          로그인하기
        </Link>
      </>
    ),
  },
  default: {
    heading: '오류',
    message: (
      <p className="text-muted-foreground">
        <Link className="text-primary" href="/public">
          홈
        </Link>
      </p>
    ),
  },
};

export const metadata: Metadata = {
  title: '오류',
};

export default function ErrorPage({
  searchParams,
}: {
  searchParams: { error?: ErrorPageParam | ErrorPageParam[] };
}): JSX.Element {
  const error = Array.isArray(searchParams.error) ? searchParams.error[0] : searchParams.error;

  const { heading, message } = (error && errors[error]) ?? errors.default;

  return (
    <main className="mx-auto grid w-full max-w-md gap-6">
      <div className="grid gap-2">
        <h1 className="text-2xl font-bold">{heading}</h1>
        {message}
        <Link className="text-primary" href="/public">
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
