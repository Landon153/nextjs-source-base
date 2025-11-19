import { type JSX } from 'react';

import { Main } from '@/app/[locale]/(dashboard)/_components/main';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/styles/button-variants';
import { Link } from '@/lib/i18n/routing';

export default function NotFound(): JSX.Element {
  return (
    <Main
      breadcrumbs={[
        { href: '/', label: 'HOME' },
        { href: '/', label: '찾을 수 없음' },
      ]}
      className="items-center justify-center space-y-6 text-center"
    >
      <div className="space-y-4">
        <h2 className="inline-flex flex-wrap items-center justify-center gap-4 sm:text-2xl">
          404
          <Separator className="h-4" orientation="vertical" />
          찾을 수 없음
        </h2>
        <p className="text-muted-foreground sm:text-xl">요청한 자원을 찾을 수 없습니다</p>
      </div>

      <div className="">
        <Link className={buttonVariants({ variant: 'link' })} href="/public">
          집으로 돌아가기
        </Link>
      </div>
    </Main>
  );
}
