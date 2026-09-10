import { createClient } from '@/lib/supabase/server';
import { AppShell } from '@/components/shared/app-shell';
import { SignOutButton } from '@/components/shared/sign-out-button';

export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // middleware.ts уже гарантирует, что сюда не попадёт неавторизованный
  // пользователь, но проверяем ещё раз на случай прямого рендера.
  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, username, role')
    .eq('id', user.id)
    .single();

  const displayName = profile?.display_name ?? user.email ?? 'Пользователь';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <AppShell userDisplayName={displayName} userInitial={initial}>
      <div className="flex max-w-md flex-col items-center gap-3 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white">
          {initial}
        </div>
        <h1 className="text-lg font-semibold text-text-primary">
          Добро пожаловать, {displayName}!
        </h1>
        <p className="text-sm text-text-secondary">
          Аккаунт создан{profile?.role === 'owner' ? ' — вы владелец семьи' : ''}.
          Список чатов и сообщения появятся на следующем этапе разработки.
        </p>
        <SignOutButton />
      </div>
    </AppShell>
  );
}
