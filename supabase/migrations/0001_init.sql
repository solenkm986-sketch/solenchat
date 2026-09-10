-- ==========================================================
-- SolenChat: миграция 0001 — профили пользователей
-- Применяется через: supabase db push  (см. README.md, раздел "Миграции")
-- ==========================================================

-- Роль внутри семьи
create type family_role as enum ('owner', 'admin', 'member');

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  display_name text not null,
  avatar_url text,
  status_text text,
  is_online boolean not null default false,
  last_seen_at timestamptz not null default now(),
  hide_online_status boolean not null default false,
  role family_role not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint username_format check (username ~ '^[a-z0-9_]{3,20}$')
);

comment on table public.profiles is 'Профили пользователей SolenChat (1 профиль = 1 аккаунт auth.users)';

-- Автоматическое обновление updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

-- Автоматическое создание профиля при регистрации пользователя.
-- Первый зарегистрированный пользователь семьи становится владельцем (owner).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  is_first_user boolean;
  chosen_username text;
begin
  select not exists(select 1 from public.profiles) into is_first_user;

  chosen_username := coalesce(
    new.raw_user_meta_data ->> 'username',
    'user_' || substr(new.id::text, 1, 8)
  );

  insert into public.profiles (id, username, display_name, role)
  values (
    new.id,
    chosen_username,
    coalesce(new.raw_user_meta_data ->> 'display_name', chosen_username),
    case when is_first_user then 'owner' else 'member' end
  );

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ==========================================================
-- Row Level Security
-- ==========================================================
alter table public.profiles enable row level security;

-- Любой авторизованный член семьи может видеть все профили
-- (это семейный чат на 4 человек — приватность отдельных карточек
-- профиля не нужна внутри самой семьи).
create policy "Авторизованные пользователи видят все профили"
  on public.profiles
  for select
  to authenticated
  using (true);

-- Пользователь может обновлять только свой собственный профиль.
create policy "Пользователь редактирует только свой профиль"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Запрещаем прямую вставку профилей с клиента — профиль создаётся
-- только триггером handle_new_user (security definer).
-- (Отдельной insert-политики не создаём — по умолчанию insert запрещён.)

-- Индекс для поиска пользователей по имени (раздел "поиск другого пользователя")
create index if not exists profiles_username_idx on public.profiles (username);
