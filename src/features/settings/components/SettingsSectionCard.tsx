import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/shadcn/card';
import { cn } from '@/shared/lib/utils';
import type { ReactNode } from 'react';

interface SettingsSectionCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  desc?:string;
}

export const SettingsSectionCard = ({ title, desc, children, className }: SettingsSectionCardProps) => {
  return (
    <Card className={cn('border-none shadow-none border-b border-gray-200', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
        {desc && 
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{desc}</p>}
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
};
