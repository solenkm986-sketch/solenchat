'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { signInAction, type AuthActionResult } from '@/lib/actions/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const initialState: AuthActionResult = {};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(signInAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-text-primary">Вход</h2>

      <Input
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="you@example.com"
      />
      <Input
        label="Пароль"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        placeholder="••••••••"
      />

      {state.error && (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}

      <Button type="submit" isLoading={isPending} className="mt-2 w-full">
        Войти
      </Button>

      <p className="text-center text-sm text-text-secondary">
        Нет аккаунта?{' '}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Зарегистрироваться
        </Link>
      </p>
    </form>
  );
}
