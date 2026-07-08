import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

export interface Column {
  key: string;
  header: string;
  render?: (item: Record<string, unknown>) => ReactNode;
  className?: string;
  sortable?: boolean;
}

interface TableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  onRowClick?: (item: Record<string, unknown>) => void;
  emptyState?: ReactNode;
  className?: string;
}

export default function Table({ columns, data, onRowClick, emptyState, className }: TableProps) {
  if (data.length === 0) {
    return emptyState || (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className={cn('overflow-x-auto rounded-lg border border-border', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50/80 border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn('px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider', col.className)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {(data as unknown as Record<string, unknown>[]).map((item, idx) => (
            <tr
              key={String(item.id ?? idx)}
              onClick={() => onRowClick?.(item)}
              onKeyDown={onRowClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onRowClick(item); } } : undefined}
              tabIndex={onRowClick ? 0 : undefined}
              role={onRowClick ? 'button' : undefined}
              className={cn(
                'transition-colors duration-100',
                onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''
              )}
            >
              {columns.map((col) => (
                <td key={col.key} className={cn('px-4 py-3 text-gray-700', col.className)}>
                  {col.render ? col.render(item) : String(item[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
