'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { signUpAction, type AuthActionResult } from '@/lib/actions/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const initialState: AuthActionResult = {};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(signUpAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-text-primary">Регистрация</h2>

      <Input
        label="Имя"
        name="displayName"
        autoComplete="name"
        required
        placeholder="Как вас видят в чате"
        error={state.fieldErrors?.displayName}
      />
      <Input
        label="Имя пользователя"
        name="username"
        autoComplete="username"
        required
        placeholder="alex_01"
        error={state.fieldErrors?.username}
      />
      <Input
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="you@example.com"
        error={state.fieldErrors?.email}
      />
      <Input
        label="Пароль"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        placeholder="Минимум 8 символов"
        error={state.fieldErrors?.password}
      />
      <Input
        label="Повторите пароль"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        required
        error={state.fieldErrors?.confirmPassword}
      />

      {state.error && (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}

      <Button type="submit" isLoading={isPending} className="mt-2 w-full">
        Создать аккаунт
      </Button>

      <p className="text-center text-sm text-text-secondary">
        Уже есть аккаунт?{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Войти
        </Link>
      </p>
    </form>
  );
}
