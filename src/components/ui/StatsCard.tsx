import { cn } from '../../lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: { value: number; isUp: boolean };
  description?: string;
  className?: string;
}

export default function StatsCard({ title, value, icon, trend, description, className }: StatsCardProps) {
  return (
    <div className={cn('bg-white rounded-xl border border-border shadow-card p-5 transition-all duration-150 hover:shadow-card-hover', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
          {trend && (
            <div className="flex items-center gap-1.5">
              {trend.isUp ? (
                <TrendingUp size={14} className="text-emerald-500" />
              ) : (
                <TrendingDown size={14} className="text-red-500" />
              )}
              <span className={cn('text-xs font-medium', trend.isUp ? 'text-emerald-600' : 'text-red-600')}>
                {trend.isUp ? '↑' : '↓'} {trend.value}%
              </span>
              {description && <span className="text-xs text-gray-400">{description}</span>}
            </div>
          )}
          {!trend && description && <p className="text-xs text-gray-400">{description}</p>}
        </div>
        {icon && (
          <div className="p-2.5 rounded-lg bg-primary-50 text-primary-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
