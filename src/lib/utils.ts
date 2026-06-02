import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function getLevelColor(level: number): string {
  if (level >= 80) return 'text-success';
  if (level >= 60) return 'text-accent';
  if (level >= 40) return 'text-warning';
  return 'text-danger';
}

export function getProgressColor(value: number): string {
  if (value >= 80) return 'bg-success';
  if (value >= 60) return 'bg-accent';
  if (value >= 40) return 'bg-warning';
  return 'bg-danger';
}

export function getScoreColor(value: number): string {
  if (value >= 80) return 'text-success';
  if (value >= 60) return 'text-accent';
  if (value >= 40) return 'text-warning';
  return 'text-danger';
}

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 1000) + 1;
}
