import { cn, getProgressColor } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  color?: string;
  className?: string;
}

export function ProgressBar({ value, max = 100, size = 'md', showLabel = false, label, color, className }: ProgressBarProps) {
  const percentage = (value / max) * 100;
  const barColor = color || getProgressColor(percentage);

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-white/70">{label || 'Progress'}</span>
          <span className="text-sm font-semibold text-white">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-white/5 rounded-full overflow-hidden', sizes[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={cn('rounded-full transition-all duration-500', barColor, sizes[size])}
        />
      </div>
    </div>
  );
}
