import { cn } from '../../lib/utils';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-lg' };

export default function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
  return (
    <div className={cn('relative rounded-full overflow-hidden flex-shrink-0 bg-primary-50 text-primary-600 flex items-center justify-center font-semibold', sizes[size], className)}>
      {src ? (
        <img src={src} alt={name || 'Avatar'} className="w-full h-full object-cover" />
      ) : name ? (
        <span>{initials}</span>
      ) : (
        <User size={size === 'sm' ? 14 : size === 'md' ? 18 : 24} className="text-gray-400" />
      )}
    </div>
  );
}
