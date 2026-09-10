import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database.types';

/**
 * Supabase-клиент для использования в клиентских компонентах ("use client").
 * Использует публичные (анонимные) ключи — их безопасно видеть в браузере,
 * так как реальная защита данных обеспечивается через RLS-политики в базе.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Не заданы NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
        'Проверьте файл .env.local — см. инструкцию в README.md.'
    );
  }

  return createBrowserClient<Database>(url, anonKey);
}
