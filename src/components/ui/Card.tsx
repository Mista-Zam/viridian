import { cn } from '../../lib/utils';
import type { HTMLAttributes } from 'react';

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('bg-white rounded-xl border border-border shadow-card', className)} {...props}>
      {children}
    </div>
  );
}

export { Card as default };

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-4 sm:px-6 py-5 border-b border-border', className)} {...props}>{children}</div>;
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-4 sm:px-6 py-5', className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-4 sm:px-6 py-4 border-t border-border bg-gray-50/50', className)} {...props}>{children}</div>;
}
