import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'accent';
  hover?: boolean;
  glow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, variant = 'default', hover = true, glow = false, className, ...props },
  ref
) {
  const variants = {
    default: 'bg-secondary/40 border border-white/5',
    glass: 'bg-secondary/60 backdrop-blur-xl border border-white/10',
    accent: 'bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        variants[variant],
        hover && 'card-hover',
        glow && 'neon-glow',
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
});

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex items-center justify-between mb-4', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn('text-lg font-semibold text-white', className)}>{children}</h3>;
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('space-y-2', className)}>{children}</div>;
}
