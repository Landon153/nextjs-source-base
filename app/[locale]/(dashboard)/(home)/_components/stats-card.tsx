import { type JSX } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number;
  className?: string;
}

export function StatsCard({ className, title, value }: StatsCardProps): JSX.Element {
  return (
    <Card className={cn('', className)}>
      <CardHeader className="p-5 pb-4">
        <CardTitle className="font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <p className="text-3xl font-medium">{value.toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}
