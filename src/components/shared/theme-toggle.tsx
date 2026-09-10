'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

const OPTIONS = [
  { value: 'light', label: 'Светлая', icon: Sun },
  { value: 'dark', label: 'Тёмная', icon: Moon },
  { value: 'system', label: 'Системная', icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Избегаем несовпадения сервер/клиент при первом рендере
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="h-9 w-28 rounded-lg skeleton" aria-hidden />;
  }

  return (
    <div
      role="radiogroup"
      aria-label="Выбор темы оформления"
      className="flex items-center gap-1 rounded-lg bg-surface-secondary p-1"
    >
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={[
              'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              isActive
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:bg-surface hover:text-text-primary',
            ].join(' ')}
          >
            <Icon size={16} />
          </button>
        );
      })}
    </div>
  );
}
