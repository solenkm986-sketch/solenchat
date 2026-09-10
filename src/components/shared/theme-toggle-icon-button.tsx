'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

const CYCLE = ['light', 'dark', 'system'] as const;
const ICONS = { light: Sun, dark: Moon, system: Monitor } as const;
const LABELS = { light: 'Светлая', dark: 'Тёмная', system: 'Системная' } as const;

/**
 * Однокнопочный переключатель темы для узких пространств (например,
 * боковая навигационная колонка шириной 64px), где полный сегментный
 * переключатель ThemeToggle не помещается. Клик циклически переключает
 * светлая → тёмная → системная → светлая...
 */
export function ThemeToggleIconButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="h-9 w-9 rounded-full skeleton" aria-hidden />;
  }

  const current = (theme as (typeof CYCLE)[number]) ?? 'system';
  const Icon = ICONS[current] ?? Monitor;

  const handleClick = () => {
    const currentIndex = CYCLE.indexOf(current);
    const next = CYCLE[(currentIndex + 1) % CYCLE.length];
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={`Тема: ${LABELS[current]}. Нажмите, чтобы переключить.`}
      aria-label="Переключить тему оформления"
      className={[
        'flex h-9 w-9 items-center justify-center rounded-full',
        'text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
      ].join(' ')}
    >
      <Icon size={18} />
    </button>
  );
}
