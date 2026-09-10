import type { ReactNode } from 'react';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { ThemeToggleIconButton } from '@/components/shared/theme-toggle-icon-button';

interface AppShellProps {
  userDisplayName: string;
  userInitial: string;
  children?: ReactNode;
}

/**
 * Каркас интерфейса из ТЗ (раздел 6):
 * — узкая левая колонка (навигация);
 * — центральная колонка (список чатов) — появится в этапе 2;
 * — правая колонка (сам чат) — появится в этапе 2.
 *
 * На мобильных экранах (< 768px) колонки схлопываются в одну —
 * логика переключения между списком и открытым чатом будет добавлена
 * вместе с самими чатами в этапе 2.
 */
export function AppShell({ userDisplayName, userInitial, children }: AppShellProps) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      {/* Левая узкая колонка */}
      <nav
        aria-label="Основная навигация"
        className="flex w-16 shrink-0 flex-col items-center justify-between border-r border-border bg-surface py-4"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
            SC
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <ThemeToggleCompact />
          <div
            title={userDisplayName}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-secondary text-sm font-medium text-text-primary"
          >
            {userInitial}
          </div>
        </div>
      </nav>

      {/* Основная область — центральная и правая колонки появятся в этапе 2 */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 md:hidden">
          <span className="font-semibold text-text-primary">SolenChat</span>
          <ThemeToggle />
        </header>
        <div className="flex flex-1 items-center justify-center overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

function ThemeToggleCompact() {
  // На узкой (64px) колонке полный ThemeToggle не помещается —
  // используем однокнопочный переключатель, который циклически
  // переключает светлая → тёмная → системная.
  return <ThemeToggleIconButton />;
}
