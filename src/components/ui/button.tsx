import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5',
          'text-sm font-medium transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variant === 'primary' &&
            'bg-primary text-white hover:bg-primary-hover active:bg-primary-hover',
          variant === 'secondary' &&
            'bg-surface-secondary text-text-primary hover:bg-border active:bg-border',
          variant === 'ghost' &&
            'bg-transparent text-text-primary hover:bg-surface-secondary active:bg-border',
          variant === 'danger' &&
            'bg-danger text-white hover:opacity-90 active:opacity-80',
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
