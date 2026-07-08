import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, id, disabled, ...props }, ref) => {
    const toggleId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <label
        htmlFor={toggleId}
        className={cn(
          'inline-flex items-center gap-3 cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <div className="relative">
          <input
            ref={ref}
            id={toggleId}
            type="checkbox"
            className="peer sr-only"
            disabled={disabled}
            {...props}
          />
          <div className={cn(
            'w-9 h-5 rounded-full transition-colors duration-200',
            'bg-gray-200 peer-checked:bg-primary-500',
            'peer-focus-visible:outline-2 peer-focus-visible:outline-primary-500'
          )}>
            <div className={cn(
              'w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-transform duration-200',
              'translate-x-1 peer-checked:translate-x-[18px]',
              'mt-[3px]'
            )} />
          </div>
        </div>
        {label && <span className="text-sm text-gray-700 select-none">{label}</span>}
      </label>
    );
  }
);
Toggle.displayName = 'Toggle';
export default Toggle;
