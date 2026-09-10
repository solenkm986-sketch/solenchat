import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database.types';

/**
 * Supabase-клиент для серверных компонентов, route handlers и server actions.
 * Работает с сессией пользователя через cookies (безопаснее, чем localStorage).
 *
 * ВАЖНО: этот клиент использует анонимный ключ + сессию пользователя.
 * Он НЕ обходит RLS. Для админских операций используйте
 * lib/supabase/admin.ts (service role key), который появится в этапе
 * с административной панелью — и никогда не импортируйте его в клиентский код.
 */
export function createClient() {
  const cookieStore = cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Не заданы NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Вызов из Server Component без возможности установить cookie —
          // это нормально, если рядом работает middleware.ts, который обновит сессию.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch {
          // См. комментарий выше.
        }
      },
    },
  });
}
